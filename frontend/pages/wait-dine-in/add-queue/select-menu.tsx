import SquarePlate from "components/cards/SquarePlate";
import Header from "components/templates/headers/Header";
import { useRouter } from "next/dist/client/router";
import React from "react";

const SelectMenu = () => {
  const router = useRouter()

  const waitTableClick = () => {
    router.push("/wait-dine-in/")
  }

  const orderNowClick = () => {
    router.push("/menu")
  }
  
  const goBackClick = () => {
    router.push("/wait-dine-in/add-queue/select-customers-number")
  }
  
  return (
    <div className="mb-16">
      <header className="mt-4">
        <Header text={"เพิ่มคิวใหม่"} goBackClick={goBackClick} />
      </header>
      <main className="px-8 mt-60 flex items-center justify-center text-center ">
        <ul className="grid grid-cols-2 gap-8">
          <li>
            <SquarePlate
              text={"รอโต๊ะ"}
              icon={undefined}
              handleClick={waitTableClick}
              optClassName={undefined}
            />
          </li>
          <li>
            <SquarePlate
              text={"สั่งอาหารเลย"}
              icon={undefined}
              handleClick={orderNowClick}
              optClassName={undefined}
            />
          </li>
        </ul>
      </main>
    </div>
  );
};

export default SelectMenu;
