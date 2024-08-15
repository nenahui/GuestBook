import express from 'express';
import fileDb from '../fileDb';
import type { TGuestMutation } from '../types';

const guestbookRouter = express.Router();

guestbookRouter.get('/', async (req, res) => {
  try {
    const guestbooks = await fileDb.getItems();
    return res.send(guestbooks);
  } catch (e) {
    return [];
  }
});

guestbookRouter.post('/', async (req, res) => {
  let author = req.body.author;

  if (!author) {
    author = 'Anonymous';
  }

  const newGuestBook: TGuestMutation = {
    author,
    message: req.body.message,
    image: req.body.image,
  };

  const savedProduct = await fileDb.addItem(newGuestBook);
  return res.send(savedProduct);
});

export default guestbookRouter;
