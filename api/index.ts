import express from 'express';
import * as http from 'node:http';
import fileDb from './fileDb';
import guestbookRouter from './routers/guestbook';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/guestbook', guestbookRouter);

const run = async () => {
  await fileDb.init();

  http.createServer(app).listen(port, '172.20.10.3', () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch((err) => console.error(err));
