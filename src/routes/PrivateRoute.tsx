import { Navigate, Outlet } from 'react-router-dom';
import { Props } from './types';
import PrivateLayout from '../layout/PrivateLayout';
export const PrivateRoute = ({ isAuth }: Props) => {
  return isAuth ? <PrivateLayout><Outlet /></PrivateLayout> : <Navigate to="/login" />;;
};
