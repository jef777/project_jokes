import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/default';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './pages/auth/RequireAuth';
import AuthenticationLayout from './layouts/authentication';

const App: FC = () => {
  return (
    <>
      <Routes>
        {/* RequireAuth component acts as an authentication guard middware */}
        <Route element={<RequireAuth />}>
          {/* specify the route prefix to be use by a layout followed by an asterix (*) eg: path="user/*" */}
          <Route path="/*" element={<DefaultLayout />} />
        </Route>
        <Route path="/auth/*" element={<AuthenticationLayout />} />
      </Routes>

      {/* handles the pop-up notifications positioning*/}
      <ToastContainer />
    </>
  );
};

export default App;
