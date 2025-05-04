import { cwd } from 'process';
import fs from 'fs';

export function listDirectory() {
  try {
    const files = fs.readdirSync(cwd(), { withFileTypes: true });
    files.forEach((file, id) => {
      console.log(`${id} -- ${file.isDirectory() ? 'DIR ' : 'FILE'} -- ${file.name}`);
    });
  } catch {
    console.log('Operation failed');
  }
}
