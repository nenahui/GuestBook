import { NotFoundAvatarIcon } from '@/assets/icons/not-found-avatar-icon';
import type { IGuestBook } from '@/types';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  guestBook: IGuestBook;
}

export const GuestBookCard: React.FC<Props> = ({ guestBook }) => {
  return (
    <Card className={'flex p-3 gap-2.5'}>
      <Avatar className={'border-2'}>
        {guestBook.image && <AvatarImage src={guestBook.image} />}
        <AvatarFallback>
          {!guestBook.image && <NotFoundAvatarIcon color={'rgba(255,255,255,0.62)'} size={18} />}
        </AvatarFallback>
      </Avatar>
      <CardHeader className={'p-0'}>
        <CardTitle className={'flex gap-2'}>
          <p className={'leading-[1.2] font-medium'}>{guestBook.author ? guestBook.author : 'Anonymous'}</p>
          <span className={'text-sm text-muted-foreground font-normal'}>{guestBook.createdAt}</span>
        </CardTitle>
        <CardDescription className={'text-white'} style={{ marginTop: 2 }}>
          {guestBook.message}
        </CardDescription>
        {guestBook.image && <img src={guestBook.image} className={'rounded-lg'} alt={'person image'} />}
      </CardHeader>
    </Card>
  );
};
