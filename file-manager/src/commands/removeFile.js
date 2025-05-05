import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function removeFile(filePath) {  
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(cwd(), filePath);

  fs.rm(fullPath, { recursive: true }, (err) => {
    if (err) {
      console.error('ERROR:', err.message);
      console.log('Operation failed');
    } else {
      console.log('Removed successfully');
    }
  });
}
