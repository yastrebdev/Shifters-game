"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsTable = void 0;
exports.statisticsTable = `
    CREATE TABLE IF NOT EXISTS statistics (
        user_id VARCHAR(255) REFERENCES users(id),
        serial SERIAL,
        mode VARCHAR(255),
        time TIMESTAMP,
        moves INTEGER
    );
`;
