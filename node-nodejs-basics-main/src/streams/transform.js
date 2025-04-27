import { Transform } from 'stream';

const transform = async () => {
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      const transChunk = chunk
        .toString()
        .split('')
        .map((char) =>
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        )
        .join('');
      callback(null, transChunk);
    },  });  
  process.stdin.pipe(transform).pipe(process.stdout);
};

await transform();