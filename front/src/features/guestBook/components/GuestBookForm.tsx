import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { TGuestMutation } from '@/types';
import React, { type PropsWithChildren, useState } from 'react';

const initialState: TGuestMutation = {
  author: '',
  message: '',
  image: null,
};

export const GuestBookForm: React.FC<PropsWithChildren> = ({ children }) => {
  const [guestBookMutation, setGuestBookMutation] = useState(initialState);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGuestBookMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const value = files && files[0] ? files[0] : null;

    setGuestBookMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onCreate}>
      <div className={'flex flex-col gap-3 mt-1'}>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='picture' className={'mr-auto'}>
            Author
          </Label>

          <Input placeholder={'Enter the author`s name'} name={'author'} onChange={onFieldChange} />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='picture' className={'mr-auto'}>
            Message
          </Label>

          <Textarea
            rows={4}
            placeholder={'Enter your message'}
            name={'message'}
            onChange={onFieldChange}
            value={guestBookMutation.message}
          />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='picture' className={'mr-auto'}>
            Picture
          </Label>

          <Input id='picture' type='file' name={'image'} onChange={onFileChange} />
        </div>

        <div className={'mt-3 flex flex-col gap-2'}>
          <Button type={'submit'}>Create</Button>
          <DrawerClose asChild>{children}</DrawerClose>
        </div>
      </div>
    </form>
  );
};
