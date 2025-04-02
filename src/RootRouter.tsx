import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";

import { AppLayout } from "./components/AppLayout";

import { LandingPage } from "./features/Landing/pages/LandingPage";
import { GuestLayout } from "./components/GuestLayout";

import { HomeRedirectPage } from "./features/Landing/pages/HomeRedirectPage";
import { ErrorPage } from "./features/Error/pages";
import { AuthRouter } from "./features/Auth/AuthRouter.tsx";
import HomePage from "./features/Admin/pages/HomePage/HomePage.tsx";
import UsersPage from "./features/Admin/pages/UsersPage/UsersPage.tsx";
import CoursesPage from "./features/Admin/pages/CoursesPage/CoursesPage.tsx";
// import BlocksPage from "./features/Admin/pages/BlocksPage/BlocksPage.tsx";
import CoursePage from "./features/Admin/pages/CoursePage/CoursePage.tsx";
import BlockPage from "./features/Admin/pages/BlockPage/BlockPage.tsx";
import LessonPage from "./features/Admin/pages/LessonPage/LessonPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "auth/*", element: <AuthRouter /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "", element: <HomeRedirectPage /> },
      { path: "home", element: <HomePage /> },
      { path: "users", element: <UsersPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:id", element: <CoursePage /> },
      { path: "blocks/:id", element: <BlockPage /> },
      { path: "lessons/:id", element: <LessonPage /> },
      // { path: "blocks", element: <BlocksPage /> },
      // { path: "admin/*", element: <AdminRouter /> },
    ],
  },
  {
    path: "/:status/error",
    element: <ErrorPage />,
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/404/error" replace />,
  // },
]);

export const RootRouter = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
