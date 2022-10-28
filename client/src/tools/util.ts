import type { Machine } from '@/tools/pokemon';
import { LogFormat } from '@/tools/pokemon';
import type { GymTechnicalMachine } from '@/tools/static';
import { gymTechnicalMachines } from '@/tools/static';
import { store } from '@/tools/store';
import { lowerCase, padStart, startCase } from 'lodash';

export function cleanUpString(str: string): string;
export function cleanUpString(str?: null): undefined;
export function cleanUpString(str?: string | null): string | undefined;
export function cleanUpString(str?: string | null): string | undefined {
  if (str === undefined || str === null) {
    return undefined;
  }

  str = str.trim();

  if (/^-+$/.test(str)) {
    return '';
  }

  return startCase(lowerCase(str));
}

export async function getFileContents(file?: File): Promise<string> {
  if (!file) {
    return '';
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (evt) => {
      resolve(evt.target!.result?.toString() || '');
    };
    reader.onerror = (evt) => {
      reject(new Error('Error reading file contents'));
    };
  });
}

export function getLogFormat(fileName?: string): LogFormat {
  return !!fileName?.endsWith('json') ? LogFormat.JSON : LogFormat.Log;
}

export function strToMachine(str: string): Machine;
export function strToMachine(str?: null): null;
export function strToMachine(str?: string | null): Machine | null;
export function strToMachine(str?: string | null): Machine | null {
  if (!str) {
    return null;
  }

  const matches = str.match(/(T|H)M ?(\d+)(.*)/)!;
  if (!matches) {
    console.error(`Error looking for machines`, str);
    return null;
  }

  const [, typeLetter, num, name] = matches;

  const machine = {
    number: +num,
    move: cleanUpString(name.trim()),
    isHM: typeLetter === 'H',
  };

  const gymTMs: GymTechnicalMachine[] | undefined = gymTechnicalMachines[store.gameVersion!];

  if (gymTMs) {
    const gymLeader = gymTMs.find(
      (gymTM) => gymTM.number === machine.number && !machine.isHM,
    )?.leader;

    if (gymLeader) {
      return {
        ...machine,
        gymLeader,
      };
    }
  }

  return machine;
}

export function machineToStr(machine: Machine, maxDigitLength = 2): string {
  return `${machine.isHM ? 'H' : 'T'}M${autoPad(machine.number, maxDigitLength)}`;
}

export function autoPad(num: number, maxDigitLength = 2): string {
  return padStart(num + '', maxDigitLength, '0');
}
