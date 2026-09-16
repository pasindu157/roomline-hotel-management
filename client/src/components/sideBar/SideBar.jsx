import { roleMenus } from "../../../data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./sidebar.css";
import roomline from "../../assets/roomline.png";

const SideBar = ({ role }) => {
  const currentRole = role || localStorage.getItem("userRole") || "customer";

  const menuList = roleMenus[currentRole] || [];
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="logo">
          <img src={roomline} alt="" />
        </div>
        <div className="brand-name">RoomLine</div>
      </div>
      <div className="sidebar-links-container">
        <div className="sidebar-link">
          {menuList.length > 0 ? (
            menuList.map((item) => (
              <div className="link-item" key={item.id}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ color: "rgb(20, 65, 90)" }}
                  size="lg"
                />
                <Link to={item.url}>{item.title}</Link>
              </div>
            ))
          ) : (
            <p>No links found for this role.</p>
          )}
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="profile-image">profile</div>
        <div className="profile-name">pasindu</div>
        <div className="settings-btn">settings button</div>
      </div>
    </div>
  );
};
export default SideBar;
