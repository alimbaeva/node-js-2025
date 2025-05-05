import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function rename(oldPath, newName) {
  const oldFullPath = path.isAbsolute(oldPath)
    ? oldPath
    : path.resolve(cwd(), oldPath);

  const dir = path.dirname(oldFullPath);
  const newFullPath = path.resolve(dir, newName);

  fs.rename(oldFullPath, newFullPath, (err) => {
    if (err) {
      console.log('Operation failed');
    }
  });
}
