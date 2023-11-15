import { useState } from "react";
import { Navigate, useLocation  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

export default function AuthGuard({children}) {
    const { isAuthenticated, isInitialized } = useAuth();

    const { pathname } = useLocation();

    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Navigate to="/"/>
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>
}