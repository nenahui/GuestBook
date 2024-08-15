import express from 'express';
import fileDb from '../fileDb';
import { imagesUpload } from '../multer';
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

guestbookRouter.post('/delete/:id', async (req, res) => {
  const id = req.params.id;
  const deletedItem = await fileDb.deleteItem(id);

  if (!deletedItem) {
    return res.status(404).send({ message: 'Item not found' });
  }

  return res.send(deletedItem);
});

guestbookRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const newGuestBook: TGuestMutation = {
    author: req.body.author ? req.body.author : null,
    message: req.body.message,
    image: req.file ? req.file.filename : null,
  };

  const savedProduct = await fileDb.addItem(newGuestBook);
  return res.send(savedProduct);
});

export default guestbookRouter;
