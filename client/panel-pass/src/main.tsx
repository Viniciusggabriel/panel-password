import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import ViewClient from "./routes/ViewClient";
import SubmitPass from "./routes/SubmitPass";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewClient />,
  },
  {
    path: "/submit",
    element: <SubmitPass />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
