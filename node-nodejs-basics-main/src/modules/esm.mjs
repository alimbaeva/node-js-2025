import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import fs from 'fs/promises';
import './files/c.cjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

async function loadJson(filename) {
    try {
        const filePath = path.resolve(__dirname, './files', filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
    }
}

let unknownObject;

if (random > 0.5) {
    unknownObject = await loadJson('a.json');
} else {
    unknownObject = await loadJson('b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer }
