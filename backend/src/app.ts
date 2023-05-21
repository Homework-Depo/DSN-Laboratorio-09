import express from 'express';
import router from './ProductRouter';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use('/api', router);

export default app;