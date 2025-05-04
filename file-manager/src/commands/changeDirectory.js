import { chdir, cwd } from 'process';
import fs from 'fs';
import path from 'path';

export function changeDirectory(targetPath) {
  const newPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(cwd(), targetPath);

  try {
    const stat = fs.statSync(newPath);
    if (!stat.isDirectory()) {
      console.log('Operation failed');
      return;
    }
    chdir(newPath);
  } catch {
    console.log('Operation failed');
  }
}
