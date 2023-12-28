"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../db/db"));
const app = (0, express_1.default)();
const host = '127.0.0.1';
const port = 3000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://127.0.0.1:3001'
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.cookies.userId;
        if (!userId) {
            userId = (0, uuid_1.v4)();
            res.cookie('userId', userId, { path: '/' });
            yield (0, db_1.default)("INSERT INTO users (id, name) VALUES ($1, $2) RETURNING *;", [userId, 'Guest']);
        }
        const user = yield (0, db_1.default)('SELECT * FROM users');
        const findUser = user.rows.find((user) => user.id === userId);
        const userStatistics = yield (0, db_1.default)("SELECT * FROM statistics WHERE user_id = $1", [userId]);
        res.status(201).json({ findUser, statistics: userStatistics.rows });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, mode, time, moves } = req.body;
    const insertQuery = `
        INSERT INTO statistics (user_id, mode, time, moves)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    try {
        const result = yield (0, db_1.default)(insertQuery, [user_id, mode, time, moves]);
        res.status(200).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}));
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`);
});
