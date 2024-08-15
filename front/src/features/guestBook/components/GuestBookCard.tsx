import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className={'flex p-3 gap-2.5'}>
      <CardHeader className={'p-0'}>
        <CardTitle className={'flex gap-2'}>
          <p className={'leading-[1.2] font-medium'}>{guestBook.author ? guestBook.author : 'Anonymous'}</p>
          <span className={'text-sm text-muted-foreground font-normal'}>{formatDate(guestBook.createdAt)}</span>
        </CardTitle>
        <CardDescription className={'text-white'} style={{ marginTop: 2 }}>
          {guestBook.message}
        </CardDescription>
        {guestBook.image && (
          <img
            src={`http://localhost:8000/${guestBook.image}`}
            className={'rounded-lg'}
            alt={guestBook.author + ' image'}
          />
        )}
      </CardHeader>
    </Card>
  );
};
