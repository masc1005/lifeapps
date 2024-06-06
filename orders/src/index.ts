import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json());

app.use(router);

const PORT = process.env.SERVER_PORT || 3001;

app.listen(3001, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
