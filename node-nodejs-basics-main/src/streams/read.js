import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const fileStream = fs.createReadStream(filePath, 'utf-8');
  
  fileStream.on('data', (chunk) => {
      process.stdout.write(chunk);
  });

  fileStream.on('end', () => {
      console.log('\nЧтение файла завершено.');
  });

  fileStream.on('error', (err) => {
      console.error('Ошибка при чтении файла:', err);
  });
};

await read();