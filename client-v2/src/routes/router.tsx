import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout";

const Welcome = lazy(() => import("./pages/Welcome"));
const MemberDetails = lazy(() => import("./pages/MemberDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Welcome />
          </Suspense>
        ),
      },
      {
        path: "member/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MemberDetails />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <div>404 error</div>,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
