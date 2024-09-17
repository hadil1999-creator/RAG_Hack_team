import { Outlet } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar.jsx";
import Header from "./components/shared/Header.jsx";

export default function Layout() {
  return (
    <div className="flex overflow-x-hidden h-full bg-gradient-to-r from-[#0D0D0D] to-[#0C1E08]">
      <Sidebar />
      <div className="flex overflow-x-hidden w-screen flex-col  ">
        <Header />
        <main className="overflow-y-auto h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
