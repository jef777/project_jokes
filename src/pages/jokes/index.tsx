import { useDispatch } from 'react-redux';
import { useLazyGetJokesQuery } from '@/api/jokesApi';
import Loader from '@/components/Loader';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect } from 'react';
import Pagination from '@/components/Pagination';
import { IJoke, updateOrder, updatePage, updatePageLimit } from './jokeSlice';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import {
  format_author_name,
  hasValue,
  timestampToReadableDate,
} from '@/utils/formatters';
import { Link } from 'react-router-dom';

type RangeColors = {
  [range: string]: string;
};

const TABLE_HEAD = ['Title', 'Author', 'Created Date', 'Views'];

function Jokes() {
  const dispatch = useDispatch();
  const { jokes, page_meta } = useSelector((state: RootState) => state.jokes);
  const { page, limit, order, order_field } = page_meta;
  const [getJokes, { isLoading }] = useLazyGetJokesQuery();

  useEffect(() => {
    getJokes(page_meta);
  }, [page, limit, order, order_field]);

  const handlePageChange = (page: number) => {
    updatePage(page);
    getJokes({ ...page_meta, page });
  };

  const colorByRanges = (total: any): JSX.Element => {
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
        className={`font-bold  py-1 px-4 rounded-xl ${rangeColors['0-25']}`}
      >
        {0}
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
    <section className=" w-full max-w-[1480px] shadow-md mx-auto bg-white dark:bg-blue-gray-800 ease-in-out duration-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 dark:backdrop-blur-md dark:bg-opacity-40 rounded-lg px-6 py-4">
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
                className="text-gray-900 dark:text-gray-50 ease-in-out duration-700"
              >
                Jokes list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3 capitalize"
                color="blue"
                size="sm"
              >
                <NewspaperIcon strokeWidth={2} className="h-5 w-5" /> Add a Joke
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-4  md:flex-row lg:w-11/12">
            <div className="w-full md:w-72">
              <Input
                className="text-gray-900 dark:text-white  ease-in-out duration-700"
                label="Filter by number date"
                labelProps={{
                  className:
                    '!text-gray-900 !dark:text-white !font-bold  !border-black',
                }}
                type="date"
              />
            </div>
            <div className="w-full md:w-72">
              <Input
                className="text-gray-900 dark:text-white  ease-in-out duration-700"
                label="Filter by number of views"
                labelProps={{
                  className: '!text-gray-900 !dark:text-white !font-bold ',
                }}
                icon={
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-900 dark:text-gray-50 ease-in-out duration-700" />
                }
              />
            </div>
            <div className="limit-selection   flex w-[32px] ">
              <Select
                style={{ minWidth: '50px !important' }}
                className="dark:text-gray-50 text-black  ease-in-out duration-700 pt-2"
                size="md"
                labelProps={{
                  className:
                    '!text-gray-900 !dark:text-white !font-bold  border-black',
                }}
                value={`${limit}`}
                onChange={(value: any) =>
                  dispatch(updatePageLimit(parseInt(value)))
                }
                label="Page limit"
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
              </Select>
            </div>
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

                                  <ChevronUpDownIcon
                                    strokeWidth={3}
                                    className="h-5 w-5 hover:scale-110 cursor-pointer ease-in-out duration-500  dark:bg-white dark:text-blue-gray-400 bg-blue-gray-400 text-white rounded-sm"
                                    onClick={() => handleSorting('createdAt')}
                                  />
                                </Typography>
                              </th>
                            )}

                            {head == 'Views' && (
                              <th key={head + i}>
                                <Typography className="flex font-bold text-base items-center text-gray-900 gap-2 ml-1 dark:text-gray-50 ease-in-out duration-700">
                                  {head}

                                  <ChevronUpDownIcon
                                    strokeWidth={3}
                                    className="h-5 w-5 hover:scale-110 cursor-pointer ease-in-out duration-700 dark:bg-white dark:text-blue-gray-400 bg-blue-gray-400 text-white rounded-sm"
                                    onClick={() => handleSorting('views')}
                                  />
                                </Typography>
                              </th>
                            )}
                          </>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {jokes.map(
                        ({ id, title, author, views, createdat }: IJoke) => {
                          return (
                            <tr key={id} className="divide-x divide-gray-200">
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-base text-gray-900 sm:pl-0">
                                <div className="flex flex-col">
                                  <Link to="/">
                                    <Typography className="font-semibold hover:scale-110 bg-gray-200 dark:bg-gray-600 ease-in-out duration-500 w-fit px-2 py-1 rounded-lg text-base text-gray-800 dark:text-gray-100">
                                      {hasValue(title)}
                                    </Typography>
                                  </Link>
                                </div>
                              </td>
                              <td className="whitespace-nowrap font-semibold p-4 text-base ease-in-out duration-700 text-gray-900 dark:text-gray-50">
                                <div className="w-max">
                                  <p>{format_author_name(author)}</p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap p-4 font-semibold text-base ease-in-out duration-700 text-gray-900 dark:text-gray-50">
                                <div className="w-max">
                                  <p>{timestampToReadableDate(createdat)}</p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap p-4 text-base text-gray-900 ease-in-out duration-700  dark:text-gray-50">
                                <div className="w-max">
                                  <p className="font-bold">
                                    {colorByRanges(views)}
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
          <Pagination page={page} onChangePage={handlePageChange} />
        </CardFooter>
      </Card>
    </section>
  );
}

export default Jokes;
