import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];

  for (let i = 0; i < numCPUs; i++) {
      const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
      workers.push(worker);
  }

  const promises = workers.map((worker, index) => {
      return new Promise((resolve) => {
          worker.on('message', (result) => {
              resolve({ status: 'resolved', data: result });
          });
          worker.on('error', () => {
              resolve({ status: 'error', data: null });
          });
          worker.postMessage(10 + index);
      });
  });

  const finalResults = await Promise.all(promises);
  console.log(finalResults);
};

await performCalculations();