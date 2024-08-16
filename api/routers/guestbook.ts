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

guestbookRouter.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await fileDb.deleteItem(id);

    if (!deletedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }

    return res.send(deletedItem);
  } catch (e) {
    return res.status(500).send({ error: 'Internal server error' });
  }
});

guestbookRouter.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateItem = await fileDb.updateItem(id);

    if (!updateItem) {
      return res.status(404).send({ error: 'Item not found' });
    }

    return res.send(updateItem);
  } catch (e) {
    return res.status(500).send({ error: 'Internal server error' });
  }
});

guestbookRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  try {
    const newGuestBook: TGuestMutation = {
      author: req.body.author ? req.body.author : null,
      message: req.body.message,
      image: req.file ? req.file.filename : null,
      liked: false,
    };

    const savedProduct = await fileDb.addItem(newGuestBook);
    return res.send(savedProduct);
  } catch (e) {
    return res.status(500).send({ error: 'Internal server error' });
  }
});

export default guestbookRouter;
