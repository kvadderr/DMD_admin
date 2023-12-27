import { Navigate, Outlet } from 'react-router-dom';
import { Props } from './types';

  export const PublicRoute = ({ isAuth }: Props) => {
    return !isAuth ? <Outlet /> : <Navigate to="/" />;;
  };