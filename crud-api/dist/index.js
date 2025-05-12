"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("./routes/userRoutes");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer((request, response) => {
    if (request.url?.startsWith('/api/users')) {
        (0, userRoutes_1.userRouter)(request, response);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Route not found' }));
    }
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map