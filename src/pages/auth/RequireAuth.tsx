import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@/app/store';

// This  is an auth middleware component it guards protected routes
const RequireAuth: FC = () => {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);

  if (user?.token) {
    return <Outlet />;
  } else if (location?.key != 'default') {
    toast.success('Come again soon', {
      position: 'top-right',
      theme: 'colored',
    });
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  } else {
    toast.error('Sign-in to have fun ', {
      position: 'top-right',
      theme: 'colored',
    });
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }
};

export default memo(RequireAuth);
