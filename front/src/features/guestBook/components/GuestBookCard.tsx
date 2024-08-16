import { useAppDispatch } from '@/app/hooks';
import { HeartIcon } from '@/assets/icons/heart';
import { TrashIcon } from '@/assets/icons/trash';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteGuestBook, fetchGuestBooks, updateGuestBook } from '@/features/guestBook/guestBookThunks';
import type { IGuestBook } from '@/types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

interface Props {
  guestBook: IGuestBook;
}

export const GuestBookCard: React.FC<Props> = ({ guestBook }) => {
  const dispatch = useAppDispatch();

  const deleteItem = async (id: string) => {
    await dispatch(deleteGuestBook(id));
    dispatch(fetchGuestBooks());
  };

  const updateItem = async (id: string) => {
    await dispatch(updateGuestBook(id));
    dispatch(fetchGuestBooks());
  };

  const formatDate = (date: string): string => {
    const createdAt = dayjs(date);
    const currentDate = dayjs();

    const minutesPassed = currentDate.diff(createdAt, 'minute');
    const hoursPassed = currentDate.diff(createdAt, 'hour');

    if (minutesPassed < 1) {
      return 'now';
    }

    if (minutesPassed < 60) {
      return `${minutesPassed}m`;
    }

    if (hoursPassed < 24) {
      return `${hoursPassed}h`;
    }

    if (createdAt.isSame(currentDate, 'week')) {
      return createdAt.format('D MMM');
    }

    if (createdAt.isSame(currentDate, 'year')) {
      return createdAt.format('D MMM');
    }

    return createdAt.format('D MMM, YYYY');
  };

  return (
    <Card className={'flex p-3 gap-2.5 flex-col pb-1'}>
      <CardHeader className={'p-0'}>
        <CardTitle className={'flex gap-2'}>
          <p className={'leading-[1.2] font-medium'}>{guestBook.author ? guestBook.author : 'Anonymous'}</p>
          <span className={'text-sm text-muted-foreground font-normal'}>{formatDate(guestBook.createdAt)}</span>
        </CardTitle>
        <CardDescription className={'text-white'} style={{ marginTop: 2 }}>
          {guestBook.message}
        </CardDescription>
        {guestBook.image && (
          <div className={'mt-3 pt-2 border-t'}>
            <img
              src={`http://172.20.10.3:8000/${guestBook.image}`}
              className={'rounded-lg'}
              alt={guestBook.author + ' image'}
            />
          </div>
        )}
      </CardHeader>
      <CardFooter className={'p-0'}>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => updateItem(guestBook.id)}
          className={'hover:bg-transparent'}
        >
          <HeartIcon
            active={guestBook.liked}
            size={20}
            color={'rgba(255,255,255, 0.5)'}
            strokeWidth={1}
            hoverColor={'red'}
          />
        </Button>

        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => deleteItem(guestBook.id)}
          className={'hover:bg-transparent'}
        >
          <TrashIcon size={20} color={'rgba(255,255,255, 0.5)'} strokeWidth={1} hoverColor={'red'} />
        </Button>
      </CardFooter>
    </Card>
  );
};
