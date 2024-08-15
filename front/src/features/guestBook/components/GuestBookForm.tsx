import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { LoadingIcon } from '@/assets/icons/loading';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectGuestCreating } from '@/features/guestBook/guestBookSlice';
import { createGuestBook, fetchGuestBooks } from '@/features/guestBook/guestBookThunks';
import type { IGuestMutation } from '@/types';
import React, { type PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'sonner';

const initialState: IGuestMutation = {
  author: '',
  message: '',
  image: null,
};

export const GuestBookForm: React.FC<PropsWithChildren> = ({ children }) => {
  const refDrawerClose = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectGuestCreating);
  const [guestBookMutation, setGuestBookMutation] = useState(initialState);

  const closeDrawer = () => {
    if (refDrawerClose.current) {
      refDrawerClose.current.click();
    }
  };

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

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (guestBookMutation.message === '') {
      return toast.warning('Message field is required!', {
        position: 'top-center',
        className: 'border',
        duration: 1500,
      });
    }

    await dispatch(createGuestBook(guestBookMutation));
    await dispatch(fetchGuestBooks());
    closeDrawer();
  };

  return (
    <form onSubmit={onCreate}>
      <div className={'flex flex-col gap-3 mt-1'}>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='author' className={'mr-auto'}>
            Author
          </Label>

          <Input id={'author'} placeholder={'Enter the author`s name'} name={'author'} onChange={onFieldChange} />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='message' className={'mr-auto'}>
            Message
          </Label>

          <Textarea
            id={'message'}
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
          <Button type={'submit'} disabled={isCreating}>
            {isCreating ? <LoadingIcon size={20} color={'#1f1f1f'} /> : 'Create'}
          </Button>
          <DrawerClose asChild ref={refDrawerClose}>
            {children}
          </DrawerClose>
        </div>
      </div>
    </form>
  );
};
