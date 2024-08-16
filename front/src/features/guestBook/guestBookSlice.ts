import { createGuestBook, fetchGuestBooks } from '@/features/guestBook/guestBookThunks';
import type { IGuestBook } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface GuestBookState {
  guestbooks: IGuestBook[];
  isLoading: boolean;
  isCreating: boolean;
}

const initialState: GuestBookState = {
  guestbooks: [],
  isLoading: false,
  isCreating: false,
};

export const guestBookSlice = createSlice({
  name: 'guestbook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestBooks.pending, (state) => {
        if (state.guestbooks.length === 0) {
          state.isLoading = true;
        }
      })
      .addCase(fetchGuestBooks.fulfilled, (state, { payload: apiMessages }) => {
        state.guestbooks = apiMessages;
        state.isLoading = false;
      })
      .addCase(fetchGuestBooks.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(createGuestBook.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createGuestBook.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createGuestBook.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectGuestBooks: (state) => state.guestbooks,
    selectGuestBooksLoading: (state) => state.isLoading,
    selectGuestCreating: (state) => state.isCreating,
  },
});

export const { selectGuestBooks, selectGuestBooksLoading, selectGuestCreating } = guestBookSlice.selectors;
