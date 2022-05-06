import { useRouter } from "next/dist/client/router";
import bottomNavMenu from "../../../utils/bottomNavMenu";

const BottomNavbar = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 bg-white shadow-top text-sm ">
      {bottomNavMenu.map((item, index) => (
        <div
          key={index}
          className={
            "grid justify-items-center py-2 " +
            (router.asPath.includes(item.url)
              ? "text-red-500"
              : "text-gray-500")
          }
          onClick={
            router.asPath.includes(item.url)
              ? undefined
              : () => router.push(item.url)
          }
        >
          <div>
            <item.icon
              color={router.asPath.includes(item.url) ? "red" : "gray"}
              size={"22"}
            />
          </div>
          <label htmlFor="">{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
