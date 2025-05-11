"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const usersStorage_1 = require("../utils/usersStorage");
const getAllUsers = (res) => {
    const users = (0, usersStorage_1.readUsers)();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};
exports.getAllUsers = getAllUsers;
const getUserById = (id, res) => {
    const users = (0, usersStorage_1.readUsers)();
    if (!(0, uuid_1.validate)(id)) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: 'User not found' }));
    }
    res.writeHead(200);
    res.end(JSON.stringify(users));
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    const users = (0, usersStorage_1.readUsers)();
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (typeof data.username !== 'string' ||
                typeof data.age !== 'number' ||
                !Array.isArray(data.hobbies)) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    message: 'Missing or invalid required fields'
                }));
                return;
            }
            const newUser = {
                id: (0, uuid_1.v4)(),
                username: data.username,
                age: data.age,
                hobbies: data.hobbies,
            };
            users.push(newUser);
            (0, usersStorage_1.writeUsers)(users);
            res.statusCode = 201;
            res.end(JSON.stringify(newUser));
        }
        catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                message: 'Internal Server Error',
            }));
        }
    });
};
exports.createUser = createUser;
const updateUser = (req, res, userId) => {
    const users = (0, usersStorage_1.readUsers)();
    if (!(0, uuid_1.validate)(userId)) {
        res.statusCode = 400;
        res.end(JSON.stringify({
            message: 'Invalid user id'
        }));
        return;
    }
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    message: 'Missing or invalid required fields'
                }));
                return;
            }
            const updateUser = {
                ...users[index],
                username,
                age,
                hobbies
            };
            users[index] = updateUser;
            (0, usersStorage_1.writeUsers)(users);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(updateUser));
        }
        catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                message: 'Internal Server Error'
            }));
        }
        req.on('error', (err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Server error', error: err.message }));
        });
    });
};
exports.updateUser = updateUser;
const deleteUser = (res, userId) => {
    const users = (0, usersStorage_1.readUsers)();
    if (!(0, uuid_1.validate)(userId)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: 'Invalid userid format'
        }));
        return;
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }
    users.splice(userIndex, 1);
    (0, usersStorage_1.writeUsers)(users);
    res.statusCode = 204;
    res.end();
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map