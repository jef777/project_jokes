import { ReactNode } from 'react';
import Home from './pages/home';
import SignIn from './pages/auth/SignIn';

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
        element: <Home />,
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
