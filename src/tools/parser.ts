import type { Dictionary } from 'lodash';
import { compact, fromPairs } from 'lodash';
import type { BaseStats, Machines, Move, Pokemon, Type } from './pokemon';
import { fixCase } from './util';

const MACHINE_TABLE_START = '--TM Compatibility--';
const POKEMON_TABLE_START = '--Pokemon Base Stats & Types--';
const POKEMON_EVOLUTION_START = '--Randomized Evolutions--';
const POKEMON_EVOLUTION_REGEX = /(.*) -> (.*)/;
const POKEMON_MOVES_START_REGEX = /\d{3} (.+) ->  ?(.+)/;
const MOVE_LINE_REGEX = /Level (\d{1,3}) ? ?: (.*)/;

export function parsePokemon(logContents: string): Pokemon[] {
  const evolutionsMap: Dictionary<string[]> = parseEvolutions(logContents);
  const movesMap: Dictionary<Move[]> = parseMoves(logContents);
  const machineMap: Dictionary<Machines[]> = parseMachines(logContents);

  return parseBaseStats(logContents).map((pokemon) => {
    const evolutions = evolutionsMap[pokemon.name.toUpperCase()] || [];
    const moves = movesMap[pokemon.name.toUpperCase()];
    const machines = machineMap[pokemon.name.toUpperCase()];
    return {
      ...pokemon,
      evolutions: evolutions.map((evolution) => fixCase(evolution)),
      moves,
      machines,
    };
  });
}

export function parseBaseStats(logContents: string): BaseStats[] {
  const lines = logContents.split('\n');

  // add two to skip the "start" line and the table header
  let index = lines.findIndex((line) => line === POKEMON_TABLE_START) + 2;

  const allPokemon: BaseStats[] = [];
  let nextLine = lines[index];
  while (!!nextLine) {
    const [num, name, types, hp, atk, def, satk, sdef, spd, ability1, ability2, item] =
      nextLine.split('|');
    const [type1, type2] = types.trim().split('/');

    const pokemon: BaseStats = {
      number: +num,
      name: fixCase(name.trim()),
      type1: <Type>fixCase(type1),
      ...(type2 ? { type2: <Type | undefined>fixCase(type2) } : {}),
      hp: +hp,
      attack: +atk,
      defense: +def,
      specialAttack: +satk,
      specialDefense: +sdef,
      speed: +spd,
      ability1: fixCase(ability1.trim()),
      ...(ability2.trim() && !ability2.trim().startsWith('-')
        ? { ability2: fixCase(ability2.trim()) }
        : {}),
    };

    allPokemon.push(pokemon);

    index++;
    nextLine = lines[index];
  }

  return allPokemon;
}

export function parseEvolutions(logContents: string): Dictionary<string[]> {
  const [, keep] = logContents.split(POKEMON_EVOLUTION_START);
  const [table] = keep.split('\n\n');
  const [, ...lines] = table.split('\n');

  return fromPairs(
    lines.map((evoLine) => {
      const matches = evoLine.match(POKEMON_EVOLUTION_REGEX)!;

      if (!matches) {
        console.log('did not match', evoLine);
        return [];
      }

      const [, base, evolutionsStr] = matches;

      const evolutions = evolutionsStr.split(/(,| and )/i);

      return [
        base.trim(),
        evolutions
          .map((evo) => fixCase(evo.trim()))
          .filter((evo) => !!evo && evo !== ',' && evo !== 'And'),
      ];
    }),
  );
}

export function parseMoves(logContents: string): Dictionary<Move[]> {
  const lineGroupsRaw = logContents.split(POKEMON_MOVES_START_REGEX);
  let [, ...lineGroups] = lineGroupsRaw;

  const movesMap: Dictionary<Move[]> = {};

  do {
    const [pokemon, , movesRaw] = lineGroups;

    if (!movesRaw) {
      break;
    }

    const moves = movesRaw
      .split('\n')
      .filter((line) => MOVE_LINE_REGEX.test(line))
      .map((line) => {
        const [, level, name] = line.match(MOVE_LINE_REGEX)!;
        return {
          level: +level,
          name: fixCase(name.trim()),
        };
      });

    movesMap[pokemon] = moves;

    lineGroups = lineGroups.slice(3);
  } while (true);

  return movesMap;
}

export function parseMachines(logContents: string): Dictionary<Machines[]> {
  const [, keep] = logContents.split(MACHINE_TABLE_START);
  const [table] = keep.split('\n\n');
  const [, ...lines] = table.split('\n');

  const machineMap: Dictionary<Machines[]> = {};
  lines.forEach((line) => {
    const [pokemonRaw, ...machinesRaw] = line.split('|');
    const pokemon = pokemonRaw.replace(/\d{1,3} /, '').trim();
    machineMap[pokemon] = compact(
      machinesRaw.map((machineRaw) => {
        if (!machineRaw.trim() || machineRaw.trim() === '-') {
          return null;
        }

        const matches = machineRaw.match(/(T|H)M(\d+) (.*)/)!;
        if (!matches) {
          console.error(`Error looking for machines for ${pokemon}:`);
          return null;
        }

        const [, typeLetter, num, name] = matches;

        return {
          number: +num,
          move: fixCase(name.trim()),
          isHM: typeLetter === 'H',
        };
      }),
    );
  });

  return machineMap;
}
