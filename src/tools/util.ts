import { lowerCase, startCase } from 'lodash';

export function fixCase(str: string): string {
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
