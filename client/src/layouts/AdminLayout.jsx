import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import './adminLayout.css'

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SideBar role="admin" />

      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
};
