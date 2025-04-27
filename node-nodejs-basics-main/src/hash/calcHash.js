import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');
  const fileStream = fs.createReadStream(filePath)
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  fileStream.on('end', () => {
    const result = hash.digest('hex');
    console.log(`SHA256 hash file: ${result}`);
  })

  fileStream.on('error', (err) => {
    console.error(err);
  })
};

await calculateHash();