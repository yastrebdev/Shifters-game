import { Pool } from 'pg';
import { statisticsTable } from './tables';

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'shifters_game',
    password: 'Avokado94',
    port: 5432,
});

const query = async (text: any, params?: any)  => {
    const result = await pool.query(text, params);
    return result;
};

const createStatisticsTable = async () => {
    try {
        const result = await query(statisticsTable);
        console.log('Table created successfully:', result);
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

createStatisticsTable()

export default query;