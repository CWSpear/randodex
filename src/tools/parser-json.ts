import { compact } from 'lodash';
import type { Log, Machine, Pokemon, Type } from './pokemon';
import { cleanUpString } from './util';

export function parsePokemonJson(logContents: string): Pokemon[] {
  const log: Log = JSON.parse(logContents);

  return (log.pokemon || []).map((mon) => ({
    number: mon.number,
    name: cleanUpString(mon.name),
    type1: <Type>cleanUpString(mon.primaryType),
    type2: <Type>cleanUpString(mon.secondaryType) || undefined,
    hp: mon.hp,
    attack: mon.attack,
    defense: mon.defense,
    specialAttack: mon.spatk,
    specialDefense: mon.spdef,
    speed: mon.speed,
    ability1: cleanUpString(log.abilities?.[mon.ability1]) || undefined,
    ability2: cleanUpString(log.abilities?.[mon.ability2]) || undefined,
    ability3: cleanUpString(log.abilities?.[mon.ability3]) || undefined,
    evolutions: (mon.evolutionsFrom || []).map((evo) => {
      const info = log.pokemon![(evo?.to || 0) - 1];
      return {
        number: info?.number || 0,
        name: cleanUpString(info?.name),
        type1: <Type>cleanUpString(info?.primaryType),
        type2: <Type>cleanUpString(info?.secondaryType) || undefined,
      };
    }),
    moves: (log.movesets?.[mon.number - 1] || []).map((move) => ({
      ...move,
      name: cleanUpString(move.move),
    })),
    machines: compact((log.tms?.[mon.number - 1] || []).map((machine) => strToMachine(machine))),
  }));
}

function strToMachine(str: string | null): Machine | null {
  if (!str) {
    return null;
  }

  const matches = str.match(/(T|H)M(\d+) (.*)/)!;
  if (!matches) {
    console.error(`Error looking for machines`, str);
    return null;
  }

  const [, typeLetter, num, name] = matches;

  return {
    number: +num,
    move: cleanUpString(name.trim()),
    isHM: typeLetter === 'H',
  };
}
