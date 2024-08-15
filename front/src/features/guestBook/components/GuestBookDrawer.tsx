import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  openTriggerButton: React.ReactNode;
}

export const GuestBookDrawer: React.FC<Props> = ({ openTriggerButton, children }) => {
  return (
    <Drawer fadeFromIndex={100} snapPoints={[1, 2]}>
      <DrawerTrigger asChild>{openTriggerButton}</DrawerTrigger>
      <DrawerContent className={'mx-auto max-w-[400px]'}>
        <DrawerHeader>
          <DrawerTitle>Create a new guestbook</DrawerTitle>
          <DrawerDescription>Fill in the fields below to create.</DrawerDescription>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
