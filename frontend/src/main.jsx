import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
import Landing from "./Pages/Landing.jsx";
import Home from "./Pages/Home.jsx";
import Layout from "./layout.jsx";
import Setting from "./Pages/Setting.jsx";
import Riskm from "./Pages/Riskm.jsx";
import Analysis from "./Pages/Analysis.jsx";
import Historychat from "./Pages/Historychat.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path:"analysis",
        element:<Analysis/>
      },
      {
        path:"recentchats",
        element:<Historychat/>
      },
      {
        path:"riskmanagement",
        element:<Riskm/>
      },
      {
        path:"settings",
        element:<Setting/>
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
