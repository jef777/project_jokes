import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '@/routes';
import fun_background from '@/assets/backgrounds/mountains.webp';
import Switcher from '@/components/DarkModeToggle';

export const AuthenticationLayout: FC = () => {
  const layout_name = 'authentication';
  {
    /* Note: on duplication of this layout to create your custom layout don't forget to edit the  ${layout_name} variable above */
  }
  return (
    <>
      <div
        className={`relative  w-full  bg-transparent !bg-cover !bg-no-repeat  !bg-fixed  `}
        style={{
          background: `URL(${fun_background})`,
        }}
      >
        <div className="absolute right-6 top-4 z-30">
          <Switcher />
        </div>
        {/* backdrop-brightness-100 */}
        <div className="min-h-screen flex justify-center items-center  flex-col h-full ">
          <Routes>
            {/* The routes are mapped and filtered by layout_name */}
            {routes.map(
              ({ layout, pages }) =>
                layout === layout_name &&
                pages.map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AuthenticationLayout;
