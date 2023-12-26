"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const host = '127.0.0.1';
const port = 3000;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    users: []
};
app.get('/', (req, res) => {
    let userId = JSON.stringify(req.cookies.userId);
    if (!userId) {
        userId = (0, uuid_1.v4)();
        res.cookie('userId', userId, { httpOnly: false });
        db.users.push({
            id: userId,
            name: 'Guest'
        });
    }
    res.json(db.users.find(user => user.id === userId));
});
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`);
});
