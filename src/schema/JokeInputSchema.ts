import { object, string, any } from 'zod';

export const JokeSchema = object({
  Title: string().min(2, 'Joke title is required'),
  Body: string().min(2, 'Joke description is required'),
});
