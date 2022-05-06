import Dropdown from "components/admin/Dropdown";
import React, { Fragment, useState } from "react";
import { dropdownCreateItems } from "utils/dropdownItems";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import axiosInstance from "helpers/axios";
import { GrLogout, GrPowerReset } from "react-icons/gr";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";

const NavbarAdmin = () => {
  const { name } = useSelector((state) => state.user);
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);

  const resetQueueClick = () => {
    axiosInstance.patch("/queue/reset-queue");
    setShowDropDown(false);
  };

  const logoutClick = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-red-500 text-white h-20 ">
      <div className="h-full flex justify-between items-center px-4">
        <div className="text-2xl">Admin</div>
        <div className="text-xl flex space-x-6 ">
          <div className="flex items-center">
            <div>
              <Dropdown
                dropdownItem={dropdownCreateItems}
                dropdownName={"สร้างใหม่"}
              />
            </div>
          </div>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="items-center inline-flex justify-center w-full rounded-md px-4 py-2 bg-red-500 text-white text-md font-medium hover:border hover:border-white ">
                  {name}
                  <MdOutlineArrowDropDown />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={resetQueueClick}
                          className={
                            (active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700 ") + "block px-4 py-2 text-md"
                          }
                        >
                          <div className="flex space-x-2 items-center">
                            <div>
                              <GrPowerReset size={"18"} />
                            </div>
                            <div>รีเซ็ทคิว</div>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={logoutClick}
                          className={
                            (active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700 ") + " px-4 py-2 text-md"
                          }
                        >
                          <div className="flex space-x-2 items-center">
                            <div>
                              <GrLogout size={"18"} />
                            </div>
                            <div>ออกจากระบบ</div>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
