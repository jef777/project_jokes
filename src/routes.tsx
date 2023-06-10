import { ReactNode } from 'react';
import Home from './pages/home';

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
];

export default routes;
