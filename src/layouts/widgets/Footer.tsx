import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
const appName = `${import.meta.env.VITE_APP_BASE_NAME ?? 'JOKER'}`;

export const Footer = () => {
  return (
    <footer className="flex  w-full flex-row flex-wrap items-center bg-transparent backdrop-blur-lg bg-opacity-90 justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="white" className="font-normal">
        &copy; 2023 {appName}
      </Typography>
    </footer>
  );
};

export default Footer;
