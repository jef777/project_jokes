import { ElementType, FC, createElement, useEffect, useState } from 'react';
import {
  Navbar as NavbarComponent,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  icon: ElementType;
  link: string;
}

const appName = `${import.meta.env.VITE_APP_BASE_NAME ?? 'JOKER'}`;

// Menu Nav component
const navListItems: NavItem[] = [
  {
    label: 'Home',
    icon: SwatchIcon,
    link: '/',
  },
];

// profile menu component
const profileMenuItems: NavItem[] = [
  {
    label: 'Sign Out',
    icon: PowerIcon,
    link: '',
  },
];

const ProfileMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <UserCircleIcon className=" w-8 h-8 rounded-full" />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
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
            variant="small"
            color="blue-gray"
            className="font-normal"
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
    <NavbarComponent className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link to={'/'}>
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 text-lg text-indigo-500 font-bold">
            {appName}
          </Typography>
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </NavbarComponent>
  );
};

export default Navbar;
