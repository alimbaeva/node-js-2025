import cluster from 'cluster';
import os from 'os';
import http from 'http';
import { userRouter } from './routes/userRoutes';

const numCPUs = os.availableParallelism ? os.availableParallelism() : os.cpus().length;
const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({ PORT: (Number(PORT) + i + 1).toString() })
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited`);
        cluster.fork();
    })
} else {
    const PORT = Number(process.env.PORT) || 4000;

    const server = http.createServer((req, res) => {
        userRouter(req, res);
    });

    server.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}