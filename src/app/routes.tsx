import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import BatteryDetailsPage from '../pages/BatteryDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <div>About Page Coming Soon</div>,
  },
  {
    path: '/contact',
    element: <div>Contact Page Coming Soon</div>,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/battery-details',
    element: <BatteryDetailsPage />,
  },
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
]);

export default router;