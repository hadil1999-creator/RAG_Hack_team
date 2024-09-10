import { Outlet } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar.jsx";
import Header from "./components/shared/Header.jsx";

export default function Layout() {
  return (
    <div className="flex overflow-hidden h-screen bg-gradient-to-r from-[#0D0D0D] to-[#0C1E08]">
      <Sidebar />
      <div className="flex overflow-hidden w-screen flex-col  ">
        <Header />
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
