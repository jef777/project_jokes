import { useDispatch } from 'react-redux';
import { useLazyGetJokesQuery } from '@/api/jokesApi';
import Loader from '@/components/Loader';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { createElement, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import { IJoke, updateOrder, updatePage } from './jokeSlice';
import {
  NewspaperIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  format_author_name,
  hasValue,
  timestampToReadableDate,
} from '@/utils/formatters';
import { Link } from 'react-router-dom';
import Filters from './components/Filters';

type RangeColors = {
  [range: string]: string;
};

const TABLE_HEAD = ['Title', 'Author', 'Created Date', 'Views'];

function Jokes() {
  const dispatch = useDispatch();
  const { jokes, page_meta } = useSelector((state: RootState) => state.jokes);
  const { page, limit, order, order_field, filter, filter_field } = page_meta;
  const [getJokes, { isLoading }] = useLazyGetJokesQuery();

  useEffect(() => {
    getJokes(page_meta);
  }, [page, limit, order, order_field, filter, filter_field]);

  const handlePageChange = (page: number) => {
    updatePage(page);
    getJokes({ ...page_meta, page });
  };

  const colorByRanges = (total: string): JSX.Element => {
    const parseTotal: number = parseInt(total ?? 0);
    const rangeColors: RangeColors = {
      '0-25': 'bg-red-600 text-white',
      '26-50': 'bg-orange-600 text-black',
      '51-75': 'bg-yellow-400 text-black',
      '76-100': 'bg-green-600 text-white',
    };

    for (const range in rangeColors) {
      const [start, end] = range.split('-').map(Number);
      if (parseTotal >= start && parseTotal <= end)
        return (
          <span
            className={`font-bold  py-1 px-4 rounded-xl ${rangeColors[range]}`}
          >
            {parseTotal}
          </span>
        );
    }

    return (
      <span
        className={`font-bold  py-1 px-4 rounded-xl bg-gray-600 text-white`}
      >
        ----
      </span>
    );
  };

  const handleSorting = (order_field: string) => {
    dispatch(
      updateOrder({
        order: order == 'asc' ? 'desc' : 'asc',
        order_field,
      })
    );
  };

  return (
    <section className=" w-full max-w-[1480px] shadow-md mx-auto bg-blue-gray-600 ease-in-out duration-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 dark:backdrop-blur-md dark:bg-opacity-40 rounded-lg px-1 lg:px-6 py-4">
      <Card className="relative h-full w-full shadow-none bg-transparent">
        {isLoading && <Loader />}

        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-transparent"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography
                variant="h2"
                className="text-white dark:text-indigo-700 ease-in-out duration-700"
              >
                Jokes list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                to={'/joke/add'}
                className="flex items-center gap-3 capitalize bg-gray-50 text-indigo-700 dark:text-indigo-50 dark:bg-indigo-800 px-3 py-2  hover:scale-110 ease-in-out duration-700 mr-2 rounded-md font-semibold"
              >
                <NewspaperIcon strokeWidth={2} className="h-5 w-5" /> Add a Joke
              </Link>
            </div>
          </div>
          <div className="flex w-full gap-4 justify-between flex-col lg:flex-row">
            <Filters />
          </div>
        </CardHeader>
        <CardBody className="relative overflow-y-auto overflow-x-hidden px-0 mb-16">
          <div className="px-4 sm:px-6 lg:px-8 ">
            <div className=" flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full relative">
                    <thead>
                      <tr key={'jokes'} className="">
                        {TABLE_HEAD.map((head, i) => (
                          <>
                            {head !== 'Created Date' && head !== 'Views' && (
                              <th
                                key={head + i}
                                scope="col"
                                className="px-4 py-3.5 text-left text-base font-semibold text-gray-900 dark:text-gray-50 ease-in-out duration-700 "
                              >
                                {head}
                              </th>
                            )}
                            {head == 'Created Date' && (
                              <th key={head + i}>
                                <Typography className="flex text-base font-bold items-center gap-2 ml-1 text-gray-900 dark:text-gray-50 ease-in-out duration-700">
                                  {head}

                                  <a onClick={() => handleSorting('CreatedAt')}>
                                    {createElement(
                                      order == 'asc' &&
                                        order_field == 'CreatedAt'
                                        ? ChevronUpIcon
                                        : ChevronDownIcon,
                                      {
                                        strokeWidth: 3,
                                        className:
                                          'h-5 w-5 hover:scale-110 cursor-pointer ease-in-out duration-500  bg-white text-blue-gray-400 dark:bg-indigo-700 dark:text-white rounded-sm',
                                      }
                                    )}
                                  </a>
                                </Typography>
                              </th>
                            )}

                            {head == 'Views' && (
                              <th key={head + i}>
                                <Typography className="flex font-bold text-base items-center text-gray-900 gap-2 ml-1 dark:text-gray-50 ease-in-out duration-700">
                                  {head}
                                  <a onClick={() => handleSorting('Views')}>
                                    {createElement(
                                      order == 'asc' && order_field == 'Views'
                                        ? ChevronUpIcon
                                        : ChevronDownIcon,
                                      {
                                        strokeWidth: 3,
                                        className:
                                          'h-5 w-5 hover:scale-110 cursor-pointer ease-in-out duration-500  bg-white text-blue-gray-400 dark:bg-indigo-700 dark:text-white rounded-sm',
                                      }
                                    )}
                                  </a>
                                </Typography>
                              </th>
                            )}
                          </>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {jokes.map(
                        ({ Id, Title, Author, Views, CreatedAt }: IJoke) => {
                          return (
                            <tr key={Id} className="divide-x divide-gray-200">
                              <td className=" py-4 pl-4 pr-4 text-sm w-1/4 font-base text-gray-900 sm:pl-0">
                                <div className="flex flex-col">
                                  <Link to={`/joke/edit/${Id}`}>
                                    <Typography className="font-semibold hover:scale-110 bg-gray-200 dark:bg-gray-600 ease-in-out duration-500 w-fit px-2 py-1 rounded-lg text-base text-gray-800 dark:text-gray-100">
                                      {hasValue(Title)}
                                    </Typography>
                                  </Link>
                                </div>
                              </td>
                              <td className="whitespace-nowrap font-semibold p-4 text-base ease-in-out duration-700 text-gray-900 dark:text-gray-50">
                                <div className="w-max">
                                  <p>{format_author_name(Author)}</p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap p-4 font-semibold text-base ease-in-out duration-700 text-gray-900 dark:text-gray-50">
                                <div className="w-max">
                                  <p>{timestampToReadableDate(CreatedAt)}</p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap p-4 text-base text-gray-900 ease-in-out duration-700  dark:text-gray-50">
                                <div className="w-max">
                                  <p className="font-bold">
                                    {colorByRanges(Views)}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="absolute bottom-2 w-full flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Pagination onChangePage={handlePageChange} />
        </CardFooter>
      </Card>
    </section>
  );
}

export default Jokes;
