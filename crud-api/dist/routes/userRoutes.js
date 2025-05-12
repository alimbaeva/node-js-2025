"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const userController_1 = require("../controllers/userController");
const userRouter = (req, res) => {
    const urlParts = req.url?.split('/').filter(Boolean);
    if (!urlParts || urlParts[0] !== 'api' || urlParts[1] !== 'users') {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
        return;
    }
    const userId = urlParts[2];
    if (!urlParts)
        return;
    switch (req.method) {
        case 'GET':
            if (!userId)
                (0, userController_1.getAllUsers)(res);
            if (userId)
                (0, userController_1.getUserById)(urlParts[2], res);
            break;
        case 'POST':
            if (!userId)
                (0, userController_1.createUser)(req, res);
            break;
        case 'PUT':
            if (userId)
                (0, userController_1.updateUser)(req, res, userId);
            break;
        case 'DELETE':
            if (userId)
                (0, userController_1.deleteUser)(res, userId);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Endpoint not found' }));
            break;
    }
};
exports.userRouter = userRouter;
//# sourceMappingURL=userRoutes.js.map