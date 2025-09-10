// ormconfig.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || "5432"), // или 5433, если ты менял порт!
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'tasktracker',
    synchronize: false,
    logging: true,
    entities: [join(__dirname, 'entities', '**', '*.{ts,js}')],
    migrations: [join(__dirname, 'migrations', '**', '*.{ts,js}')],
    subscribers: [],
});