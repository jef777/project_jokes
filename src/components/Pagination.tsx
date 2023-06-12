import React, { useEffect } from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface FnPageChange {
  (page: number): void;
}
interface IPagination {
  page: number;
  onChangePage: FnPageChange;
}

export const Pagination = ({ page, onChangePage }: IPagination) => {
  const [active, setActive] = React.useState(1);

  useEffect(() => {
    onChangePage(active);
  }, [active]);

  const next = () => {
    if (active === 10) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        className="text-gray-900 font-bold bg-white"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography className=" bg-white blue-gray-900 font-semibold px-2 rounded-md py-1">
        Page <strong className="">{active}</strong>
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
