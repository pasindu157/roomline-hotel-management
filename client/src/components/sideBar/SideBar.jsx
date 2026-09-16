import { roleMenus } from "../../../data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SideBar = () => {
  const currentRole = role || localStorage.getItem("userRole") || "customer";

  const menuList = roleMenus[currentRole] || [];
  return (
    <div className="sidebar-container">
      <div className="sidebar-header"></div>
    </div>
  );
};

export default SideBar;
