import {
  parseGameVersionJson,
  parseMachinesJson,
  parseMovesJson,
  parsePokemonJson,
} from '@/tools/parser-json';
import { store } from '@/tools/store';
import type { Dictionary } from 'lodash';
import { compact, fromPairs, keyBy, sortBy, uniqBy } from 'lodash';
import type { BaseStats, GameVersion, Machine, Move, Pokemon, Type } from './pokemon';
import { LogFormat } from './pokemon';
import { cleanUpString, machineToStr, strToMachine } from './util';

const MACHINE_TABLE_START = '--TM Compatibility--';
const POKEMON_TABLE_START = '--Pokemon Base Stats & Types--';
const POKEMON_EVOLUTION_START = '--Randomized Evolutions--';
const POKEMON_EVOLUTION_REGEX = /(.*) -> (.*)/;
const POKEMON_MOVES_START_REGEX = /\d{3} (.+) ->  ?(.+)/;
const MOVE_LINE_REGEX = /Level (\d{1,3}) ? ?: (.*)/;
const GAME_NAME_REGEX = /Randomization of (.*?) (?:\(|v|\d)/;

const NO_MOVES_LINE = 'Pokemon Movesets: Unchanged';
const NO_MACHINES_LINE = 'TM Moves: Unchanged';
const NO_STATS_LINE = 'Pokemon base stats & type: unchanged';

export function parseGameVersion(logContents: string): GameVersion | null {
  if (store.logFormat === LogFormat.JSON) {
    return parseGameVersionJson(logContents);
  }

  const matches = logContents.match(GAME_NAME_REGEX);

  if (!matches) {
    return null;
  }

  return <GameVersion>matches[1].replace(/(version|pokemon)/gi, '').trim();
}

export function parsePokemon(logContents: string): Pokemon[] {
  if (store.logFormat === LogFormat.JSON) {
    return parsePokemonJson(logContents);
  }

  const evolutionsMap: Dictionary<string[]> = parseEvolutionsByPokemon(logContents);
  const movesMap: Dictionary<Move[]> = parseMovesByPokemon(logContents);
  const machineMap: Dictionary<Machine[]> = parseMachinesByPokemon(logContents);

  const baseStats = parseBaseStats(logContents);

  const baseStatsMap = keyBy(baseStats, (stat) => stat.name.toLowerCase());

  return baseStats.map((pokemon) => {
    const evolutions = evolutionsMap[pokemon.name.toUpperCase()] || [];
    const moves = movesMap[pokemon.name.toUpperCase()];
    const machines = machineMap[pokemon.name.toUpperCase()];
    return {
      ...pokemon,
      evolutions: evolutions.map((evolution) => {
        const basicInfo = baseStatsMap[evolution.trim().toLowerCase()];

        return {
          number: basicInfo.number,
          name: basicInfo.name,
          type1: basicInfo.type1,
          ...(basicInfo.type2 ? { type2: basicInfo.type2 } : {}),
        };
      }),
      moves,
      machines,
    };
  });
}

export function parseMoves(logContents: string): Move[] {
  if (store.logFormat === LogFormat.JSON) {
    return parseMovesJson(logContents);
  }

  return [];
}

export function parseMachines(logContents: string): Machine[] {
  if (store.logFormat === LogFormat.JSON) {
    return parseMachinesJson(logContents);
  }

  const parsedMachines = Object.values(parseMachinesByPokemon(logContents)).flat();

  const uniqParsedMachines = uniqBy(compact(parsedMachines), (machine) => machineToStr(machine));

  return sortBy(uniqParsedMachines, (machine) => machine.number + (machine.isHM ? 1000 : 0));
}

function parseBaseStats(logContents: string): BaseStats[] {
  if (store.logFormat === LogFormat.JSON) {
    throw new Error('`parseBaseStats` is not needed/unnecessary for JSON logs');
  }

  if (logContents.includes(NO_STATS_LINE)) {
    return [];
  }

  const lines = logContents.split(/\r?\n/);

  // add two to skip the "start" line and the table header
  let index = lines.findIndex((line) => line === POKEMON_TABLE_START) + 2;

  if (index - 2 < 0) {
    // no stat changes
    return [];
  }

  const allPokemon: BaseStats[] = [];
  let nextLine = lines[index];
  while (!!nextLine) {
    const [num, name, types, hp, atk, def, satk, sdef, spd, ability1, ability2, item] =
      nextLine.split('|');
    const [type1, type2] = types.trim().split('/');

    const pokemon: BaseStats = {
      number: +num,
      name: cleanUpString(name.trim()),
      type1: <Type>cleanUpString(type1),
      ...(type2 ? { type2: <Type | undefined>cleanUpString(type2) } : {}),
      hp: +hp,
      attack: +atk,
      defense: +def,
      specialAttack: +satk,
      specialDefense: +sdef,
      speed: +spd,
      ...(ability1?.trim() && !ability1.trim().startsWith('-')
        ? { ability1: cleanUpString(ability1.trim()) }
        : {}),
      ...(ability2?.trim() && !ability2.trim().startsWith('-')
        ? { ability2: cleanUpString(ability2.trim()) }
        : {}),
    };

    allPokemon.push(pokemon);

    index++;
    nextLine = lines[index];
  }

  return allPokemon;
}

function parseEvolutionsByPokemon(logContents: string): Dictionary<string[]> {
  if (store.logFormat === LogFormat.JSON) {
    throw new Error('`parseEvolutionsByPokemon` is not needed/unnecessary for JSON logs');
  }

  const [, keep] = logContents.split(POKEMON_EVOLUTION_START);

  if (!keep) {
    return {};
  }

  const [table] = keep.split(/\r?\n\r?\n/);

  const [, ...lines] = table.split(/\r?\n/);

  return fromPairs(
    lines.map((evoLine) => {
      const matches = evoLine.match(POKEMON_EVOLUTION_REGEX)!;

      if (!matches) {
        console.error('did not match', evoLine);
        return [];
      }

      const [, base, evolutionsStr] = matches;

      const evolutions = evolutionsStr.split(/(,| and )/i);

      return [
        base.trim(),
        evolutions
          .map((evo) => cleanUpString(evo.trim()))
          .filter((evo) => !!evo && evo !== ',' && evo !== 'And'),
      ];
    }),
  );
}

function parseMovesByPokemon(logContents: string): Dictionary<Move[]> {
  if (store.logFormat === LogFormat.JSON) {
    throw new Error('`parseMovesByPokemon` is not needed/unnecessary for JSON logs');
  }

  if (logContents.includes(NO_MOVES_LINE)) {
    return {};
  }

  const lineGroupsRaw = logContents.split(POKEMON_MOVES_START_REGEX);

  if (!lineGroupsRaw) {
    return {};
  }

  let [, ...lineGroups] = lineGroupsRaw;

  const movesMap: Dictionary<Move[]> = {};

  do {
    const [pokemon, , movesRaw] = lineGroups;

    if (!movesRaw) {
      break;
    }

    const moves = movesRaw
      .split(/\r?\n/)
      .filter((line) => MOVE_LINE_REGEX.test(line))
      .map((line) => {
        const [, level, name] = line.match(MOVE_LINE_REGEX)!;
        return {
          level: +level,
          name: cleanUpString(name.trim()),
        };
      });

    movesMap[pokemon] = moves;

    lineGroups = lineGroups.slice(3);
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return movesMap;
}

function parseMachinesByPokemon(logContents: string): Dictionary<Machine[]> {
  if (store.logFormat === LogFormat.JSON) {
    throw new Error('`parseMachinesByPokemon` is not needed/unnecessary for JSON logs');
  }

  if (logContents.includes(NO_MACHINES_LINE)) {
    return {};
  }

  const [, keep] = logContents.split(MACHINE_TABLE_START);

  if (!keep) {
    return {};
  }

  const [table] = keep.split(/\r?\n\r?\n/);

  const [, ...lines] = table.split(/\r?\n/);

  const machineMap: Dictionary<Machine[]> = {};
  lines.forEach((line) => {
    const [pokemonRaw, ...machinesRaw] = line.split('|');
    const pokemon = pokemonRaw.replace(/\d{1,3} /, '').trim();
    machineMap[pokemon] = compact(
      machinesRaw.map((machineStr) => {
        if (!machineStr.trim() || machineStr.trim() === '-') {
          return null;
        }

        return strToMachine(machineStr.trim());
      }),
    );
  });

  return machineMap;
}
