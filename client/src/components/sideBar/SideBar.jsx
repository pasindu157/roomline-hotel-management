import { roleMenus } from "../../../data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./sidebar.css";
import roomline from "../../assets/roomline.png";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../util/axiosConfig.js";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ role }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        if (!response.data.success) {
          toast.error("Failed to load the profile");
        }
        setProfile(response.data.data);
      } catch (error) {
        console.error("failed to load profile", error);
        toast.error("Failed to load the profile");
      }
    };
    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

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
              <Link className="link-item" key={item.id} to={item.url}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ color: "rgb(20, 65, 90)" }}
                  size="sm"
                />
                <span className="link-text">{item.title}</span>
              </Link>
            ))
          ) : (
            <p>No links found for this role.</p>
          )}
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="profile-image">
          {profile?.name[0].toUpperCase() || "U"}
        </div>
        <div className="profile-name">
          <p>{profile?.name || "User"}</p>
          <p>{profile?.email || "user@gmail.com"}</p>
        </div>
        <div className="settings-btn">
          <Link>
            <FontAwesomeIcon icon={faGear} style={{ color: "rgb(20,65,90)" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
