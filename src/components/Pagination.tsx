import { useEffect } from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { updatePage } from '@/pages/jokes/jokeSlice';

interface FnPageChange {
  (page: number): void;
}
interface IPagination {
  onChangePage: FnPageChange;
}

export const Pagination = ({ onChangePage }: IPagination) => {
  const dispatch = useDispatch();
  const { page_meta } = useSelector((state: RootState) => state.jokes);
  const { page } = page_meta;

  useEffect(() => {
    onChangePage(page);
  }, [page]);

  const next = () => {
    if (page === 10) return;
    dispatch(updatePage(page + 1));
  };

  const prev = () => {
    if (page === 1) return;

    dispatch(updatePage(page - 1));
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        className="text-gray-900 font-bold bg-white"
        onClick={prev}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography className=" bg-white blue-gray-900 font-semibold px-2 rounded-md py-1">
        Page <strong className="">{page}</strong>
      </Typography>
      <IconButton
        size="sm"
        className="text-gray-900 font-bold bg-white"
        onClick={next}
        // disabled={active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default Pagination;
