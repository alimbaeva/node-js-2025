"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUsers = exports.readUsers = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbFile = path_1.default.join(__dirname, '../data/users.json');
const readUsers = () => {
    try {
        const data = fs_1.default.readFileSync(dbFile, 'utf-8');
        return JSON.parse(data);
    }
    catch {
        return [];
    }
};
exports.readUsers = readUsers;
const writeUsers = (users) => {
    fs_1.default.writeFileSync(dbFile, JSON.stringify(users, null, 2));
};
exports.writeUsers = writeUsers;
//# sourceMappingURL=usersStorage.js.map