import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
const appName = `${import.meta.env.VITE_APP_BASE_NAME ?? 'JOKER'}`;
const year = new Date().getFullYear();
export const Footer = () => {
  return (
    <footer className="flex rounded-2xl  w-full mx-auto  max-w-[1480px] justify-center bg-[#f0f8ff] dark:bg-transparent ease-in-out duration-700 items-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center">
      <Typography
        color="white"
        className="font-bold dark:text-gray-50 text-indigo-800 ease-in-out duration-700 "
      >
        &copy; {year} {appName}
      </Typography>
    </footer>
  );
};

export default Footer;
