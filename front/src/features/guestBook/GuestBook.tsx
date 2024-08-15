import { PlusIcon } from '@/assets/icons/plus';
import { Button } from '@/components/ui/button';
import { GuestBookCard } from '@/features/guestBook/components/GuestBookCard';
import { GuestBookDrawer } from '@/features/guestBook/components/GuestBookDrawer';
import { GuestBookForm } from '@/features/guestBook/components/GuestBookForm';
import React from 'react';

export const GuestBook: React.FC = () => {
  return (
    <div className={'flex flex-col gap-3'}>
      <GuestBookDrawer
        openTriggerButton={
          <Button variant={'outline'} className={'flex items-center gap-2 w-full'}>
            <PlusIcon color={'rgba(255,255,255,0.62)'} size={16} />
            Create a new guest book
          </Button>
        }
      >
        <GuestBookForm>
          <Button variant={'outline'}>Cancel</Button>
        </GuestBookForm>
      </GuestBookDrawer>

      <GuestBookCard
        guestBook={{
          id: '1',
          author: 'retreatpm',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, cum est ipsum molestias nostrum numquam!',
          createdAt: '17h',
          image: './argen.jpg',
        }}
      />
    </div>
  );
};
