export interface IGuestBook {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
  createdAt: string;
}

export interface IGuestMutation {
  message: string;
  author: string | null;
  image: File | null;
}
