import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./routes";
import Root from "./routes/root";
import Login, { action as loginAction } from "./routes/login";
import Register, { action as registerAction } from "./routes/register";

import ErrorPage from "./error-page";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "iniciar-sesion",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "registrarse",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
