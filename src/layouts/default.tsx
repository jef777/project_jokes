import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '@/routes';
import { Navbar, Footer } from './widgets';
import fun_background from '@/assets/backgrounds/mountains.webp';

export const DefaultLayout: FC = () => {
  const layout_name = 'default';
  {
    /* Note: on duplication of this layout to create your custom layout don't forget to edit the  ${layout_name} variable above */
  }
  return (
    <>
      <div
        className="relative  w-full  bg-transparent !bg-no-repeat  !bg-fixed "
        style={{
          background: `URL(${fun_background})`,
        }}
      >
        {/* backdrop-brightness-100 */}
        <div className="min-h-screen flex  flex-col h-full  ">
          <div className="!fixed w-full z-40 mx-auto p-4 md:px-16  backdrop-blur-xl bg-opacity-40">
            <Navbar />
          </div>
          <div className="flex flex-grow flex-col pt-[60px] pb-24 ">
            <div className="mt-10 h-fit flex flex-grow md:px-20">
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

            <div className="  absolute bottom-0 z-10 mx-auto  w-full text-white md:px-16">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
