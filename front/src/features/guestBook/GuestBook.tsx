import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { EmptyIcon } from '@/assets/icons/empty';
import { LoadingIcon } from '@/assets/icons/loading';
import { PlusIcon } from '@/assets/icons/plus';
import { Button } from '@/components/ui/button';
import { GuestBookCard } from '@/features/guestBook/components/GuestBookCard';
import { GuestBookDrawer } from '@/features/guestBook/components/GuestBookDrawer';
import { GuestBookForm } from '@/features/guestBook/components/GuestBookForm';
import { selectGuestBooks, selectGuestBooksLoading } from '@/features/guestBook/guestBookSlice';
import { fetchGuestBooks } from '@/features/guestBook/guestBookThunks';
import React, { useEffect } from 'react';

export const GuestBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const guestBooks = useAppSelector(selectGuestBooks);
  const isLoading = useAppSelector(selectGuestBooksLoading);

  useEffect(() => {
    dispatch(fetchGuestBooks());
  }, [dispatch]);

  return (
    <div className={'flex flex-col gap-3'}>
      <GuestBookDrawer
        openTriggerButton={
          <Button variant={'outline'} className={'flex items-center w-full gap-2 '}>
            <PlusIcon color={'rgba(255,255,255,0.62)'} size={16} />
            Create a new guest book
          </Button>
        }
      >
        <GuestBookForm>
          <Button variant={'outline'}>Cancel</Button>
        </GuestBookForm>
      </GuestBookDrawer>

      {isLoading ? (
        <div className={'fixed top-1/2 left-1/2'} style={{ transform: 'translate(-50%, -50%)' }}>
          <LoadingIcon color={'rgba(255, 255, 255, 0.3)'} size={50} />
        </div>
      ) : !isLoading && guestBooks.length === 0 ? (
        <p
          className={
            'text-center text-sm font-light opacity-50 flex gap-1 flex-col items-center fixed top-1/2 left-1/2'
          }
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <EmptyIcon />
          Guestbook list is empty
        </p>
      ) : (
        guestBooks.map((item) => (
          <GuestBookCard
            key={item.id}
            guestBook={{
              id: item.id,
              author: item.author,
              message: item.message,
              createdAt: item.createdAt,
              image: item.image,
            }}
          />
        ))
      )}
    </div>
  );
};
