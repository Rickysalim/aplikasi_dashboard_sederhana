import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={'/dashboard/overview'} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
