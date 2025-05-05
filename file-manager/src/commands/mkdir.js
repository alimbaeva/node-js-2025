import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function mkdir(dirName) {
  const fullPath = path.resolve(cwd(), dirName);

  fs.mkdir(fullPath, { recursive: false }, (err) => {
    if (err) {
      console.log('Operation failed');
    }
  });
}
