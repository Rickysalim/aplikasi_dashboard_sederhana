import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import DashboardLayout from "../layouts/DashboardLayout";


export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <GuestGuard>
            <Login />
          </GuestGuard>
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "dashboard",
      element: (
        // Lazy Loading Implementation
        <Suspense fallback={<LoadingScreen />}>
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        </Suspense>
      ),
      children: [
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "table",
          element: <Table />,
        },
        {
          path: "add/clothes",
          element: <AddClothes />,
        },
        {
          path: "transaction",
          element: <Transaction />,
        },
      ],
    },
  ]);
}

const Table = lazy(() => import("../pages/table/Table"));
const AddClothes = lazy(() => import("../pages/add-clothes/AddClothes"));
const Overview = lazy(() => import("../pages/overview/Overview"));
const Transaction = lazy(() => import("../pages/transaction/Transaction"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
