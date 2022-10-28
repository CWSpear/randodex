import type { Log } from '@/tools/randomizer-json-output';
import { compact, sortBy, uniqBy } from 'lodash';
import type { GameVersion, Machine, Move, Pokemon, Type } from './pokemon';
import { cleanUpString, machineToStr, strToMachine } from './util';

export function parsePokemonJson(logContents: string): Pokemon[] {
  const log: Log = jsonParseOnce(logContents);

  return (log.pokemon || []).map((mon) => ({
    number: mon.number,
    name: cleanUpString(mon.name),
    type1: <Type>cleanUpString(mon.primaryType),
    type2: <Type>cleanUpString(mon.secondaryType),
    hp: mon.hp,
    attack: mon.attack,
    defense: mon.defense,
    specialAttack: mon.spatk,
    specialDefense: mon.spdef,
    speed: mon.speed,
    ability1: cleanUpString(log.abilities?.[mon.ability1]),
    ability2: cleanUpString(log.abilities?.[mon.ability2]),
    ability3: cleanUpString(log.abilities?.[mon.ability3]),
    evolutions: (mon.evolutionsFrom || []).map((evo) => {
      const info = log.pokemon![(evo?.to || 0) - 1];
      return {
        number: info?.number || 0,
        name: cleanUpString(info?.name),
        type1: <Type>cleanUpString(info?.primaryType),
        type2: <Type | undefined>cleanUpString(info?.secondaryType),
      };
    }),
    moves: (log.movesets?.[mon.number - 1] || []).map((move) => ({
      ...move,
      name: cleanUpString(move.move),
    })),
    machines: compact((log.tms?.[mon.number - 1] || []).map((machine) => strToMachine(machine))),
  }));
}

export function parseGameVersionJson(logContents: string): GameVersion | null {
  const log: Log = jsonParseOnce(logContents);

  // unfortunately, the JSON version doesn't have game version info (yet!)
  return null;
}

export function parseMovesJson(logContents: string): Move[] {
  const log: Log = jsonParseOnce(logContents);

  return [];
}

export function parseMachinesJson(logContents: string): Machine[] {
  const log: Log = jsonParseOnce(logContents);

  const parsedMachines = (log.tms || []).flatMap((tm) =>
    ((Array.isArray(tm) ? tm : [tm]) || []).map((m) => strToMachine(m)),
  );

  const uniqParsedMachines = uniqBy(compact(parsedMachines), (machine) => machineToStr(machine));

  return sortBy(uniqParsedMachines, (machine) => machine.number + (machine.isHM ? 1000 : 0));
}

const cachedLogs: string[] = [];
const cachedResults: Log[] = [];

function jsonParseOnce(logContents: string): Log {
  const index = cachedLogs.findIndex((log) => logContents === log);
  if (index >= 0) {
    return cachedResults[index];
  }

  const parsedContents = JSON.parse(logContents);
  cachedLogs.push(logContents);
  cachedResults.push(parsedContents);

  return parsedContents;
}
