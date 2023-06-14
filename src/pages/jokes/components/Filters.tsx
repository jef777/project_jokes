import { covertDateToUnix } from '@/utils/formatters';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input, Button, Select, Option } from '@material-tailwind/react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FilterData,
  updateFilter,
  clearFilter,
  updatePageLimit,
} from '../jokeSlice';
import { RootState } from '@/app/store';

const Filters = () => {
  const dispatch = useDispatch();
  const { page_meta } = useSelector((state: RootState) => state.jokes);
  const { filter, limit } = page_meta;
  const [filterData, setFilterData] = useState<FilterData>(filter);
  const viewsr = useRef<HTMLInputElement>(null);
  const refDate = useRef<HTMLInputElement>(null);
  const handleFiltering = (): void => {
    dispatch(updateFilter(filterData));
  };

  const handleFilterSelections = ({
    filter_field,
    filter,
  }: {
    filter_field: string;
    filter: string;
  }) => {
    setFilterData({
      ...filterData,
      [filter_field]: {
        filter_field,
        filter,
      },
    });
  };

  const handleClearFilter = (): void => {
    if (refDate.current) {
      refDate.current.value = '';
    }
    if (viewsr.current) {
      viewsr.current.value = '';
    }
    dispatch(clearFilter());
  };

  return (
    <>
      <div className="flex flex-col items-center justify-end gap-4  md:flex-row">
        <div className="w-full md:w-72">
          <Input
            data-testid="filter-by-date-input"
            ref={refDate}
            className=" text-white placeholder-shown:!border placeholder-shown:!border-white  placeholder-shown:!border-t-white  focus:!border-t-transparent  !border-t-transparent  !border-white focus:!border-white"
            labelProps={{
              className:
                '!font-bold !text-white  peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white',
            }}
            label="Filter by number date"
            type="date"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterSelections({
                filter_field: 'CreatedAt',
                filter: covertDateToUnix(e.target.value),
              })
            }
          />
        </div>
        <div className="w-full md:w-72">
          <Input
            data-testid="filter-by-number-of-views"
            ref={viewsr}
            className=" text-white placeholder-shown:!border placeholder-shown:!border-white  placeholder-shown:!border-t-white  focus:!border-t-transparent  !border-t-transparent  !border-white focus:!border-white"
            labelProps={{
              className:
                '!font-bold !text-white  peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white',
            }}
            label="Filter by number of views"
            icon={
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-50 ease-in-out duration-700" />
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterSelections({
                filter_field: 'Views',
                filter: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <Button
            data-testid="filter-button"
            size="sm"
            variant="outlined"
            color="indigo"
            className="hover:bg-indigo-900 text-indigo-900 hover:text-white"
            onClick={() => handleFiltering()}
          >
            filter
          </Button>
          <Button
            data-testid="clear-button"
            size="sm"
            color="indigo"
            className="hover:!bg-transparent border border-indigo-900 hover:text-indigo-900 shadow-none"
            onClick={() => handleClearFilter()}
          >
            clear
          </Button>
        </div>
      </div>
      <div className="limit-selection table  w-[32px] ">
        <Select
          data-testid="page-limit"
          size="md"
          className="text-white  font-bold ease-in-out duration-700 pt-2 "
          labelProps={{
            className: '!text-white !font-bold  border-white',
          }}
          value={`${limit}`}
          onChange={(value: any) => dispatch(updatePageLimit(parseInt(value)))}
          label="Page limit"
        >
          <Option value="5">5</Option>
          <Option value="10">10</Option>
        </Select>
      </div>
    </>
  );
};

export default Filters;
