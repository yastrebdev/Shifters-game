import express from 'express'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import query from '../db/db'

const app = express()
const host = '127.0.0.1';
const port = 3000

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:3001'
}));

app.get('/', async (req, res) => {
    try {
        let userId = req.cookies.userId;
        if (!userId) {
            userId = uuidv4();
            res.cookie('userId', userId, {path: '/'});
            await query("INSERT INTO users (id, name) VALUES ($1, $2) RETURNING *;", [userId, 'Guest'])
        }
        const user = await query('SELECT * FROM users');
        const findUser = user.rows.find((user: any) => user.id === userId)
        const userStatistics = await query("SELECT * FROM statistics WHERE user_id = $1", [userId])
        res.status(201).json({findUser, statistics: userStatistics.rows});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/stats', async (req, res) => {
    const { user_id, mode, time, moves } = req.body;

    const insertQuery = `
        INSERT INTO statistics (user_id, mode, time, moves)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    try {
        const result = await query(insertQuery, [user_id, mode, time, moves]);
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})