import { useNavigate } from 'react-router-dom';
import { TypeOf } from 'zod';
import { toast } from 'react-toastify';

import { Button, Input } from '@material-tailwind/react';
import { IUser, setAuth } from '../authSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { authSchema } from './schema/authSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type AuthInput = TypeOf<typeof authSchema>;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  }: any = methods;

  const onSubmitHandler = ({ author }: { author: string }) => {
    const user: IUser = {
      user: {
        author,
        token: uuidv4(),
      },
    };

    dispatch(setAuth(user));
    reset();
    navigate('/');
    toast.success(`Welcome ${author}`);
  };

  return (
    <>
      <div className="w-full flex-grow  mx-auto bg-white dark:bg-blue-gray-800 ease-in-out duration-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 dark:backdrop-blur-md dark:bg-opacity-30 px-6 py-4">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
            <div className="flex w-full  flex-col gap-8 rounded-lg ">
              <p className="text-3xl font-bold text-indigo-500 dark:text-indigo-100 ease-in-out duration-700 md:text-4xl ">
                <span>Sign In</span>
              </p>
              <div className="flex gap-4 flex-col">
                <div className="flex w-full flex-col flex-wrap gap-2">
                  <Input
                    label="Author *"
                    className="bg-white dark:bg-indigo-100"
                    size="lg"
                    {...register('author')}
                  />
                  <p className="text-sm text-red-50 underline ">
                    {errors.author?.message}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="dark:bg-indigo-400 bg-indigo-700 ease-in-out duration-700"
                  fullWidth
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
