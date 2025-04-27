import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files_copy');
  try {
    await fs.access(sourceDir);
    try {
        await fs.access(destDir);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
    }
    await fs.cp(sourceDir, destDir, { recursive: true });
  } catch(err) {
    throw new Error('FS operation failed');
  }
};

await copy();
