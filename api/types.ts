export interface IGuestBook {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
  createdAt: string;
  liked: boolean;
}

export type TGuestMutation = Omit<IGuestBook, 'id' | 'createdAt'>;
