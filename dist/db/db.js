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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const tables_1 = require("./tables");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'shifters_game',
    password: 'Avokado94',
    port: 5432,
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(text, params);
    return result;
});
const createStatisticsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield query(tables_1.statisticsTable);
        console.log('Table created successfully:', result);
    }
    catch (error) {
        console.error('Error creating table:', error);
    }
});
createStatisticsTable();
exports.default = query;
