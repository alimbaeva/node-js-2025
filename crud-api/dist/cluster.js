"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const http_1 = __importDefault(require("http"));
const userRoutes_1 = require("./routes/userRoutes");
const numCPUs = os_1.default.availableParallelism ? os_1.default.availableParallelism() : os_1.default.cpus().length;
const PORT = process.env.PORT || 4000;
if (cluster_1.default.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork({ PORT: (Number(PORT) + i + 1).toString() });
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited`);
        cluster_1.default.fork();
    });
}
else {
    const PORT = Number(process.env.PORT) || 4000;
    const server = http_1.default.createServer((req, res) => {
        (0, userRoutes_1.userRouter)(req, res);
    });
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}
//# sourceMappingURL=cluster.js.map