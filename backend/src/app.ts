import express from 'express';
import router from './ProductRouter';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

export default app;