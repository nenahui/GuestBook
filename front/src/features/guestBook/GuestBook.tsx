import { GuestCard } from '@/features/guestBook/components/GuestCard';
import React from 'react';

export const GuestBook: React.FC = () => {
  return (
    <>
      <GuestCard
        guestBook={{
          id: '1',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at delectus dolor error esse eveniet inventore quae quam vero. Necessitatibus.',
          createdAt: '18h',
        }}
      />
    </>
  );
};
