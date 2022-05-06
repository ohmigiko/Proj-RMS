import { AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { GiTable } from "react-icons/gi";

export const dropdownCreateItems = [
  {
    label: "พนักงาน",
    url: "/admin/user/create",
    icon: AiOutlineUser,
  },
  {
    label: "เมนู",
    url: "/admin/menu/create",
    icon: BiFoodMenu,
  },
  {
    label: "โต๊ะ",
    url: "/admin/table/create",
    icon: GiTable,
  },
];

export const dropdownUserItems = [
  {
    label: "รีเซ็ทคิว",
    url: "",
    icon: AiOutlineUser,
  },
  {
    label: "ออกจากระบบ",
    url: "",
    icon: BiFoodMenu,
  },
]