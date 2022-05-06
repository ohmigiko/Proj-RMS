import { AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { GiHamburgerMenu, GiTable } from "react-icons/gi";

const sidebarAdminMenu =  [
  // {
  //   label: "แดชบอร์ด",
  //   url: "/admin/dashboard",
  //   icon: AiOutlinePieChart,
  // },
  {
    label: "พนักงาน",
    url: "/admin/user",
    icon: AiOutlineUser,
  },
  {
    label: "เมนู",
    url: "/admin/menu/category",
    icon: BiFoodMenu,
  },
  {
    label: "โต๊ะ",
    url: "/admin/table",
    icon: GiTable,
  },
];
export default sidebarAdminMenu