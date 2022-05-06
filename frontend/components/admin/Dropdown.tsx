import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { GiTable } from "react-icons/gi";

const Dropdown = ({ dropdownName, dropdownItem }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="items-center inline-flex justify-center w-full rounded-md px-4 py-2 bg-red-500 text-white text-md font-medium hover:border hover:border-white ">
          {dropdownName}
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
            {dropdownItem.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href={item.url}
                    className={
                      (active
                        ? "bg-gray-100 text-gray-900 "
                        : "text-gray-700 ") + "block px-4 py-2 text-md"
                    }
                  >
                    <div className="flex space-x-2 items-center">
                      <div>
                        <item.icon />
                      </div>
                      <p>{item.label}</p>
                    </div>
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
