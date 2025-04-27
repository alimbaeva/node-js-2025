import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = fs.createWriteStream(filePath, { encoding: 'utf-8' });
  process.stdin.pipe(writeStream); 
 
  writeStream.on('error', (err) => {
  console.error('Ошибка при записи файла:', err.message);
  });
};

await write();