import {
  faGaugeHigh,
  faHotel,
  faChartColumn,
  faBed,
  faBellConcierge,
  faUsers,
  faBook,
  faBroom,
  faRankingStar,
  faMoneyCheckDollar,
  faBell,
  faWifi,
  faWaterLadder,
  faSnowflake,
  faSquareParking,
  faUtensils,
  faDumbbell,
  faSpa,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
// import { LayoutDashboard } from "lucide-react";

export const roleMenus = {
  admin: [
    {
      id: 1,
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: faGaugeHigh,
    },
    {
      id: 2,
      title: "Analytics & Reports",
      url: "/admin/hotel",
      icon: faChartColumn,
    },
    {
      id: 3,
      title: "Hotels management",
      url: "/admin/hotel-manage",
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
      title: "User management",
      url: "/admin/hotel",
      icon: faUsers,
    },
    {
      id: 7,
      title: "Bookings management",
      url: "/admin/hotel",
      icon: faBook,
    },
    {
      id: 8,
      title: "HouseKeeping Monitor",
      url: "/admin/hotel",
      icon: faBroom,
    },
    {
      id: 9,
      title: "Reviews & Ratings",
      url: "/admin/hotel",
      icon: faRankingStar,
    },
    {
      id: 10,
      title: "Transactions & Invoices",
      url: "/admin/hotel",
      icon: faMoneyCheckDollar,
    },
    {
      id: 11,
      title: "Notifications",
      url: "/admin/hotel",
      icon: faBell,
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

export const STATUS_OPTIONS = [
  {
    id: "status-active",
    value: "active",
    label: "Active",
    desc: "Open & accepting bookings",
    colorClass: "active",
  },
  {
    id: "status-suspended",
    value: "suspended",
    label: "Suspended",
    desc: "Paused / maintenance",
    colorClass: "suspended",
  },
  {
    id: "status-closed",
    value: "closed",
    label: "Closed",
    desc: "Temporarily or permanently shut",
    colorClass: "closed",
  },
];

export const amenities = [
  { name: "Free Wi-Fi" },
  { name: "Swimming Pool" },
  { name: "Air Conditioning" },
  { name: "Free Parking" },
  { name: "Restaurant" },
  { name: "Gym" },
  { name: "Spa" },
  { name: "Smart TV" },
];
