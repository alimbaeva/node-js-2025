import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

const decompress = async () => {
  const archivePath = join('src', 'zip', 'files', 'archive.gz');
  const outputPath = join('src', 'zip', 'files', 'fileToCompress.txt');
  const readable = createReadStream(archivePath);
  const writeable = createWriteStream(outputPath);
  const gunzip = createGunzip();
  readable.pipe(gunzip).pipe(writeable);
};

await decompress();