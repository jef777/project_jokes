import { useEffect, useState } from 'react';

import useNotificationDispatcher from '@/hooks/useNotificationDispatcher';
import {
  useDeleteJokeMutation,
  useEditJokeMutation,
  useLazyGetJokeQuery,
} from '@/api/jokesApi';
import Loader from '@/components/Loader';
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { IJoke } from './jokeSlice';
import JokeForm from '@/components/JokeForm';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const EditJoke = () => {
  const { id: jokeId }: Readonly<Params<string>> = useParams();
  const navigate = useNavigate();

  const { jokes } = useSelector((state: RootState) => state.jokes);

  const [joke, setJoke] = useState<IJoke>();

  // Calling the Get Joke Query
  const [getJoke] = useLazyGetJokeQuery();

  useEffect(() => {
    const joke = jokes.find((joke: IJoke) => joke.Id == jokeId);
    if (!joke && jokeId) {
      getJoke(jokeId)
        .unwrap()
        .then((joke: IJoke) => setJoke(joke));
    } else {
      setJoke(joke);
    }
  }, [jokes]);

  // 👇 Calling the Edit Joke Mutation
  const [editJoke, { isLoading, isSuccess, error, isError }] =
    useEditJokeMutation();

  useNotificationDispatcher({
    successMessage: 'Joke updated',
    isLoading,
    error,
    isSuccess,
    isError,
  });

  // 👇 Calling the Edit Joke Mutation
  const [
    deleteJoke,
    {
      isLoading: isLoadingRm,
      isSuccess: isSuccessRm,
      error: errorRm,
      isError: isErrorRm,
    },
  ] = useDeleteJokeMutation();

  useNotificationDispatcher({
    successMessage: 'Joke Deleted',
    isLoading: isLoadingRm,
    error: errorRm,
    isSuccess: isSuccessRm,
    isError: isErrorRm,
  });

  const handleEditJoke = (values: any) => {
    //  Executing the Add joke Mutation
    editJoke({ id: jokeId, data: values })
      .unwrap()
      .then(() => navigate('/'));
  };

  const handleDeleteJoke = () => {
    //  Executing the Add joke Mutation
    deleteJoke(jokeId)
      .unwrap()
      .then(() => navigate('/'));
  };

  return (
    <section className="relative w-full max-w-[1480px] shadow-md mx-auto bg-blue-gray-800 ease-in-out duration-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 dark:backdrop-blur-md dark:bg-opacity-40 rounded-lg px-6 py-4">
      {isLoading && <Loader />}
      <div className="w-fit absolute top-4 left-4 flex gap-2 items-center">
        <ArrowLeftCircleIcon
          onClick={() => navigate('/')}
          className="w-14 hover:scale-110  h-14 dark:text-indigo-600 text-white cursor-pointer"
        />
        <span className=" dark:text-indigo-600 text-white font-bold">Back</span>
      </div>
      <div className="mb-4 flex flex-col justify-center md:flex-row h-full items-center  gap-6">
        <div className="flex items-center w-full lg:w-9/12 justify-between md:justify-around gap-6">
          <div>
            <Typography
              variant="h2"
              className="mb-0 dark:text-indigo-600 text-indigo-50 capitalize"
            >
              Let's Edit & make it fun
            </Typography>
            <Typography
              variant="h6"
              className="font-semibold dark:text-indigo-600 text-indigo-50"
            >
              let's really crack some ribs
            </Typography>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full lg:w-10/12 ">
            <Typography
              variant="h5"
              className="mb-3 dark:text-indigo-600 text-indigo-50"
            >
              Let's have fun editing Jokes
            </Typography>
            <Typography
              variant="small"
              className=" mb-4 flex items-center text-white gap-1 dark:text-indigo-600 font-semibold"
            >
              <InformationCircleIcon className="-mt-px h-4 w-4 " />
              All fields with (*) are required
            </Typography>
            <div className="">
              <JokeForm
                onSubmitHandler={handleEditJoke}
                onDeleteJoke={handleDeleteJoke}
                type={'EDIT'}
                data={joke}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditJoke;
