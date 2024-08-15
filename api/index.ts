import express from 'express';

const app = express();
const port = 8000;

app.get('/guestbook', (req, res) => {
  res.send('List of guest books will be here');
});

app.post('/guestbook', (req, res) => {
  res.send('Will create new guest book here');
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
