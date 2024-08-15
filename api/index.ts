import express from 'express';
import fileDb from './fileDb';
import guestbookRouter from './routers/guestbook';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/guestbook', guestbookRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch((err) => console.error(err));
