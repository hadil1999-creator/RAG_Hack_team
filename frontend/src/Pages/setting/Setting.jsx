import Sidebar from "../../components/setting/sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Setting() {
  return (
    <div className="flex gap-x-4 w-full ">
      <Sidebar />
      <Outlet />
    </div>
  );
}
