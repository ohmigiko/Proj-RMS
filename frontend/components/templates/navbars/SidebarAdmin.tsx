import React, { useState } from "react";
import { AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { GiHamburgerMenu, GiTable } from "react-icons/gi";
import sidebarAdminMenu from "utils/sidebarAdminMenu";
import { useRouter } from "next/dist/client/router";

const SidebarAdmin = () => {
  const router = useRouter();
  const [isExpand, setIsExpand] = useState(false);

  return (
    <aside
      className={
        "max-w-content h-full bg-red-800 min-h-screen flex flex-col items-center " +
        (isExpand && "w-60")
      }
      aria-label="sidebar"
    >
      <div className="p-1.5 w-full h-20">
        <div
          className={
            "bg-red-600 flex items-center justify-center h-full rounded "
          }
          onClick={() => setIsExpand(!isExpand)}
        >
          <GiHamburgerMenu color="white" size="24" />
        </div>
      </div>
      <div className="mt-1">
        {sidebarAdminMenu.map((opt, index) => (
          <div
            key={index}
            className={
              "flex items-center h-20 " +
              (router.asPath.includes(`${opt.url}`) &&
                "border-l-4 border-red-500 bg-red-900")
            }
            onClick={() => router.push(`${opt.url}`)}
          >
            <div className={"px-6 "+(isExpand && "flex items-center")} >
              <opt.icon color="white" size="28" />
              {isExpand && <div className="ml-2 text-white">{opt.label}</div>}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarAdmin;
