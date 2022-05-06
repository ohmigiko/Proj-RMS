import { MdOutlineDeliveryDining } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiRestaurantLine } from "react-icons/ri";
const bottomNavMenu = [
  {
    label: "ทานในร้าน",
    url: "/dine-in/tables",
    icon: RiRestaurantLine,
    iconSize: "22",
  },
  {
    label: "รอโต๊ะ",
    url: "/wait-dine-in",
    icon: HiOutlineUserGroup,
  },
  {
    label: "สั่งกลับบ้าน",
    url: "/take-home",
    icon: MdOutlineDeliveryDining,
  },
  {
    label: "ประวัติ",
    url: "/history",
    icon: BiReceipt,
  },
];

export default bottomNavMenu;
