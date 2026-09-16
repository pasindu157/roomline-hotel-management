import { faGaugeHigh, faHotel } from "@fortawesome/free-solid-svg-icons";

export const roleMenus = {
  admin: [
    { id: 1, title: "Dashboard", url: "/admin/hotel", icon: faGaugeHigh },
    { id: 2, title: "Manage Hotels", url: "/admin/hotel", icon: faHotel },
  ],
  manager: [
    { id: 1, title: "Dashboard", url: "/manager/dashboard", icon: faGaugeHigh },
  ],
  houseKeeping: [
    {
      id: 1,
      title: "Dashboard",
      url: "/housekeeping/dashboard",
      icon: faGaugeHigh,
    },
  ],
};
