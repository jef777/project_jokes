import { object, string } from 'zod';

export const authSchema = object({
  author: string().min(2, 'Author is required'),
});
