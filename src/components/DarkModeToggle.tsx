import useDarkModeToggle from '@/hooks/useDarkModeToggle';
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkModeToggle();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? false : true
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className=" py-1 -mt-1 bg-indigo-600 dark:bg-indigo-50 px-2 group  rounded-full border  flex justify-center gap-2 items-center">
        <DarkModeSwitch
          data-testid="dark-mode-switch"
          className="mb-1 animate-pulse mt-1 ml-0.5 hover:scale-110 w-4 h-4"
          checked={darkSide}
          onChange={toggleDarkMode}
          moonColor={'white'}
          sunColor={'#1a237e'}
          //   size={18}
        />
      </div>
    </>
  );
}
