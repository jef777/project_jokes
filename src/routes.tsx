import { ReactNode } from 'react';
import SignIn from './pages/auth/SignIn';
import Jokes from './pages/jokes';

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
