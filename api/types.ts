export interface IGuestBook {
  id: string;
  author: string | null;
  message: string;
  image: File | null;
  createdAt: string;
}

export type TGuestMutation = Omit<IGuestBook, 'id' | 'createdAt'>;
