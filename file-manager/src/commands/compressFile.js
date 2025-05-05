import fs from 'fs';
import zlib from 'zlib';

export function compressFile(inputPath, outputPath) {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  const brotli = zlib.createBrotliCompress();

  input.pipe(brotli).pipe(output);

  output.on('finish', () => {
    console.log('File compressed successfully');
  });

  output.on('error', (err) => {
    console.error('Error during compression:', err);
  });
}
