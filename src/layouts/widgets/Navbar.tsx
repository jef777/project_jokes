import {
  ElementType,
  FC,
  createElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Navbar as NavbarComponent,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  SwatchIcon,
  Bars3BottomLeftIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/pages/auth/authSlice';
import { resetStateAction } from '@/app/actions/resetState';

interface NavItem {
  label: string;
  icon: ElementType;
  link: string;
}

const appName = `${import.meta.env.VITE_APP_BASE_NAME ?? 'JOKER'}`;

// Menu Nav component
const navListItems: NavItem[] = [
  {
    label: 'Jokes',
    icon: SwatchIcon,
    link: '/',
  },
];

const ProfileMenu: FC = () => {
  const dispatch = useDispatch();

  // profile menu component
  const { author } = useSelector((state: RootState) => state.auth.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef: any = useRef(null);

  const handleLogOut = () => {
    dispatch(logoutUser);
    dispatch(resetStateAction());
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    console.log('dwcew');
    if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center mr-2 space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <UserCircleIcon className=" w-8 h-8 rounded-full dark:text-indigo-50" />
          <span className="dark:text-white  font-bold">{author}</span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 ease-in-out duration-300 dark:text-indigo-50 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute  right-0 mt-2 py-1 w-32 bg-white border border-gray-300 rounded shadow">
            <a
              onClick={() => handleLogOut()}
              className=" px-4 flex gap-4 py-2 cursor-pointer font-bold text-sm text-gray-700 hover:bg-red-50 "
            >
              {createElement(PowerIcon, {
                className: `h-5 w-5 'text-red-500 `,
                strokeWidth: 2,
              })}
              Sign In
            </a>
            {/* Add more options as needed */}
          </div>
        )}
      </div>
    </Menu>
  );
};

const NavList: FC = () => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Link to={link} key={key}>
          <Typography
            key={label}
            variant="h6"
            color="blue-gray"
            className="font-normal dark:text-indigo-50 hover:bg-indigo-50 duration-700 rounded-lg ease-in-out"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {createElement(icon, { className: 'h-[18px] w-[18px]' })} {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
};

export const Navbar: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <NavbarComponent className="mx-auto py-0 px-3 max-w-[1480px] dark:bg-indigo-900 ease-in-out duration-700 p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link to={'/'}>
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 text-lg dark:text-indigo-50 ease-in-out duration-1000 text-indigo-500 font-bold">
            {appName}
          </Typography>
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <Bars3BottomLeftIcon
          onClick={toggleIsNavOpen}
          strokeWidth={2}
          className=" w-8 h-8 my-0 ml-4 text-indigo-800 hover:scale-110 cursor-pointer lg:hidden dark:text-indigo-50"
        />

        <div className=" flex gap-8 items-center justify-center  ml-auto  ">
          <DarkModeToggle />

          <ProfileMenu />
        </div>
      </div>
      <Collapse
        open={isNavOpen}
        className="overflow-auto  backdrop-blur-2xl bg-opacity-80  rounded-lg"
      >
        <NavList />
      </Collapse>
    </NavbarComponent>
  );
};

export default Navbar;
