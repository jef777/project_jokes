import React, { useEffect } from 'react';

import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { JokeSchema } from '../../schema/JokeInputSchema';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input, Textarea, Button } from '@material-tailwind/react';
import { IJoke } from '@/pages/jokes/jokeSlice';
import { useNavigate } from 'react-router-dom';

export type JokeInput = TypeOf<typeof JokeSchema>;

type Variant = 'ADD' | 'EDIT';

interface IJokeForm {
  onSubmitHandler: SubmitHandler<JokeInput>;
  onDeleteJoke?: any;
  type: Variant;
  data?: IJoke;
}

const JokeForm = ({ onSubmitHandler, onDeleteJoke, type, data }: IJokeForm) => {
  const navigate = useNavigate();
  const methods = useForm<JokeInput>({
    resolver: zodResolver(JokeSchema),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  }: any = methods;

  useEffect(() => {
    if (type && type == 'EDIT') {
      reset(data);
    }
  }, [type, data]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col md:flex-row gap-5 justify-between w-full">
          <div className="flex w-full flex-col flex-wrap gap-2">
            <Input
              label="Joke Title *"
              className="text-white placeholder-shown:!border placeholder-shown:!border-white  placeholder-shown:!border-t-white  focus:!border-t-transparent  !border-t-transparent  !border-white focus:!border-white"
              labelProps={{
                className:
                  '!font-bold !text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white',
              }}
              size="lg"
              {...register('Title')}
            />
            <p className="text-sm text-red-400">{errors.Title?.message}</p>
          </div>
        </div>
        <div className="w-full">
          <Textarea
            {...register('Body')}
            className="text-white placeholder-shown:!border placeholder-shown:!border-white  placeholder-shown:!border-t-white  focus:!border-t-transparent  !border-t-transparent  !border-white focus:!border-white"
            labelProps={{
              className:
                '!font-bold !text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white',
            }}
            label="Joke description"
          />
          <p className="text-sm text-red-400">{errors.Body?.message}</p>
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            className="hover:scale-105 bg-transparent text-white hover:border-indigo-800 border border-white hover:bg-indigo-800 hover:text-indigo-50"
          >
            Submit
          </Button>
          <Button
            className="hover:scale-105 hover:bg-transparent bg-gray-600 hover:text-white border-gray-600 border hover:border-white text-gray-50"
            onClick={() => navigate('/')}
          >
            cancel
          </Button>
          {type == 'EDIT' && (
            <Button
              className=" hover:scale-105 bg-red-600 hover:text-white border-gray-600 border hover:border-red text-white"
              onClick={() => onDeleteJoke()}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default JokeForm;
