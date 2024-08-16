import { promises as fs } from 'fs';

import { IGuestBook, type TGuestMutation } from './types';

const filename = './db.json';

let data: IGuestBook[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);

      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: TGuestMutation) {
    try {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const guestbook = { ...item, id, createdAt };
      data.push(guestbook);

      await this.save();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async deleteItem(id: string) {
    try {
      const deleteItem = data.find((item) => item.id === id);

      if (!deleteItem) {
        return null;
      }

      data = data.filter((item) => item.id !== id);
      await this.save();
      return deleteItem;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async updateItem(id: string) {
    try {
      const updateItem = data.findIndex((item) => item.id === id);

      if (updateItem === -1) {
        return null;
      }

      data[updateItem] = { ...data[updateItem], liked: !data[updateItem].liked };
      await this.save();
      return data[updateItem];
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  },
};

export default fileDb;
