import fs from 'fs';
import crypto from 'crypto';

export function hash(filePath) {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);
  
  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    console.log('File hash:', hash.digest('hex'));
  });

  stream.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}
