import {
  faGaugeHigh,
  faHotel,
  faChartColumn,
  faBed,
  faBellConcierge,
  faUsers,
  faUserTie,
  faBook,
  faBroom,
  faRankingStar,
  faMoneyCheckDollar,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export const roleMenus = {
  admin: [
    { id: 1, title: "Dashboard", url: "/admin/dashboard", icon: faGaugeHigh },
    {
      id: 2,
      title: "Analytics & Reports",
      url: "/admin/hotel",
      icon: faChartColumn,
    },
    {
      id: 3,
      title: "Hotels management",
      url: "/admin/hotel",
      icon: faHotel,
    },
    {
      id: 4,
      title: "Room management",
      url: "/admin/hotel",
      icon: faBed,
    },
    {
      id: 5,
      title: "Service management",
      url: "/admin/hotel",
      icon: faBellConcierge,
    },
    {
      id: 6,
      title: "staff management",
      url: "/admin/hotel",
      icon: faUserTie,
    },
    {
      id: 7,
      title: "Customer management",
      url: "/admin/hotel",
      icon: faUsers,
    },
    {
      id: 8,
      title: "Bookings management",
      url: "/admin/hotel",
      icon: faBook,
    },
    {
      id: 9,
      title: "HouseKeeping Monitor",
      url: "/admin/hotel",
      icon: faBroom,
    },
    {
      id: 10,
      title: "Reviews & Ratings",
      url: "/admin/hotel",
      icon: faRankingStar,
    },
    {
      id: 11,
      title: "Transactions & Invoices",
      url: "/admin/hotel",
      icon: faMoneyCheckDollar,
    },
    {
      id: 12,
      title: "Notifications",
      url: "/admin/hotel",
      icon: faBell,
    },
    {
      id: 13,
      title: "Platform Settings",
      url: "/admin/hotel",
      icon: faGear,
    },
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
