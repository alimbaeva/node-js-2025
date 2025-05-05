import fs from 'fs';
import zlib from 'zlib';

export function decompressFile(inputPath, outputPath) {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  const brotli = zlib.createBrotliDecompress();

  input.pipe(brotli).pipe(output);

  output.on('finish', () => {
    console.log('File decompressed successfully');
  });

  output.on('error', (err) => {
    console.error('Error during decompression:', err);
  });
}
