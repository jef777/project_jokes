import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/default';

const App: FC = () => {
  return (
    <Routes>
      {/* specify the route prefix to be use by a layout followed by an asterix (*) eg: path="user/*" */}
      <Route path="/*" element={<DefaultLayout />} />
    </Routes>
  );
};

export default App;
