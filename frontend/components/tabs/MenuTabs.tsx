import React from "react";

const MenuTabs = ({activeTab, setActiveTab, menu}) => {

  return (
    <div>
      <ul className="grid grid-flow-col mb-4 text-center text-2xl">
        {menu.map((tab, index) => (
          <li
            key={index}
            className={"flex py-2 w-full "}
            onClick={() => setActiveTab(index)}
          >
            <div
              className={
                activeTab === index
                  ? "text-red-500 border-red-500 border-b-4 w-max"
                  : ""
              }
            >
              {tab.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuTabs;
