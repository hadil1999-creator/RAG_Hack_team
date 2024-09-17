import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Pages/Landing.jsx";
import Home from "./Pages/Home.jsx";
import Layout from "./layout.jsx";
import Setting from "./Pages/setting/Setting.jsx";
import Riskm from "./Pages/Riskm.jsx";
import Analysis from "./Pages/Analysis.jsx";
import Historychat from "./Pages/Historychat.jsx";
import Profile from "./Pages/setting/Profile.jsx";
import Account from "./Pages/setting/Account.jsx";
import Sign_up from "./Pages/Auth/Sign_up.jsx";
import Chat from "./Pages/Chat.jsx";
import Sign_in from "./Pages/Auth/Sign_in.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signin",
    element: <Sign_in />,
  },
  { path: "/signup", 
    element: <Sign_up /> },
  {
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
      {
        path: "recentchats",
        element: <Historychat />,
      },
      {
        path: "riskmanagement",
        element: <Riskm />,
      },
      {
        path: "chat/:id",
        element: <Chat />,
      },
      {
        path: "settings",
        element: <Setting />,
        children: [
          { index: true, element: <Profile /> },
          { path: "profile", element: <Profile /> },
          { path: "account", element: <Account /> },
        ],
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
