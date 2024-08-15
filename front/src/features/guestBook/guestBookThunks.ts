import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { IGuestBook, IGuestMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGuestBooks = createAsyncThunk<IGuestBook[], void, { state: RootState }>(
  'guestbook/fetch',
  async () => {
    try {
      const { data: apiGuestBooks } = await axiosApi.get<IGuestBook[]>('/guestbook');

      return apiGuestBooks;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);

export const createGuestBook = createAsyncThunk<void, IGuestMutation>('guestbook/create', async (guestBook) => {
  try {
    const formData = new FormData();
    formData.append('message', guestBook.message);

    if (guestBook.author) {
      formData.append('author', guestBook.author);
    }

    if (guestBook.image) {
      formData.append('image', guestBook.image);
    }

    console.log(guestBook);
    await axiosApi.post('/guestbook', formData);
  } catch (error) {
    console.error(error);
  }
});
