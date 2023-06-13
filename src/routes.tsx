import { ReactNode } from 'react';
import SignIn from './pages/auth/SignIn';
import Jokes from './pages/jokes';
import AddJoke from './pages/jokes/addJoke';
import EditJoke from './pages/jokes/editJoke';

export interface Page {
  path: string;
  element: ReactNode;
}
export interface Layout_routes {
  layout: string;
  pages: Page[];
}

/* The routes array. Each object in the routes array specifies a layout and routes using the layout */
export const routes: Layout_routes[] = [
  {
    layout: 'default',
    pages: [
      {
        path: '/',
        element: <Jokes />,
      },
      {
        path: '/joke/add',
        element: <AddJoke />,
      },

      {
        path: '/joke/edit/:id',
        element: <EditJoke />,
      },
    ],
  },

  {
    layout: 'authentication',
    pages: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
