import useNotificationDispatcher from '@/hooks/useNotificationDispatcher';
import { useAddJokeMutation } from '@/api/jokesApi';
import Loader from '@/components/Loader';
import { v4 as uuidv4 } from 'uuid';
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import JokeForm from '@/components/JokeForm';
import { useNavigate } from 'react-router-dom';

const AddJoke = () => {
  const navigate = useNavigate();

  // 👇 Calling the Add Joke Mutation
  const [addJoke, { isLoading, isSuccess, error, isError }] =
    useAddJokeMutation();
  useNotificationDispatcher({
    successMessage: 'Joke updated',
    isLoading,
    error,
    isSuccess,
    isError,
  });

  const handleSubmitJoke = (values: any) => {
    const today = Date.now(); // the date today in milliseconds
    const joke = {
      Id: uuidv4(),
      Author: 'jss',
      ...values,
      createdAt: today,
    };
    //  Executing the Add joke Mutation
    addJoke(joke)
      .unwrap()
      .then(() => navigate('/'));
  };
  return (
    <section className=" w-full max-w-[1480px] shadow-md mx-auto bg-blue-gray-800 ease-in-out duration-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 dark:backdrop-blur-md dark:bg-opacity-40 rounded-lg px-6 py-4">
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
              className="mb-0 text-white dark:text-indigo-600"
            >
              Add a new Joke
            </Typography>
            <Typography
              variant="h6"
              className="font-semibold text-white dark:text-indigo-600"
            >
              lets crack some ribs
            </Typography>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full lg:w-10/12 ">
            <Typography
              variant="h5"
              className="mb-3 text-white dark:text-indigo-600"
            >
              Let's have fun creating Jokes
            </Typography>
            <Typography
              variant="small"
              className=" mb-4 flex items-center text-white gap-1 dark:text-indigo-600 font-semibold"
            >
              <InformationCircleIcon className="-mt-px h-4 w-4 " />
              All fields with (*) are required
            </Typography>
            <div className="">
              <JokeForm onSubmitHandler={handleSubmitJoke} type={'ADD'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJoke;
