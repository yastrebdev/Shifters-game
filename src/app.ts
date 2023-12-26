import express from 'express'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

interface Users {
    id: string;
    name: string;
}

interface DB {
    users: Users[];
}

const app = express()
const host = '127.0.0.1';
const port = 3000

app.use(cors());
app.use(cookieParser());

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db: DB = {
    users: []
}

app.get('/', (req, res) => {
    let userId = JSON.stringify(req.cookies.userId);
    if (!userId) {
        userId = uuidv4();
        res.cookie('userId', userId, {httpOnly: false});
        db.users.push({
            id: userId,
            name: 'Guest'
        });
    }

    res.json(db.users.find(user => user.id === userId));
})

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})