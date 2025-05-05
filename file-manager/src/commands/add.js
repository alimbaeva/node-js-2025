import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function add(fileName) {
  const fullPath = path.resolve(cwd(), fileName);

  fs.writeFile(fullPath, '', { flag: 'wx' }, (err) => {
    if (err) {
      console.log('Operation failed');
      console.error(err);
    } else {
      console.log('File created successfully');
    }
  });
}
