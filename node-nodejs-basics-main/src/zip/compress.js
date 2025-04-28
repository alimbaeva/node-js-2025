import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

const compress = async () => {
  const fileToCompressPath = join('src', 'zip', 'files', 'fileToCompress.txt');
  const archivePath = join('src', 'zip', 'files', 'archive.gz');
  const readable = createReadStream(fileToCompressPath);
  const writeable = createWriteStream(archivePath);
  const gzip = createGzip();
  readable.pipe(gzip).pipe(writeable);
};

await compress();