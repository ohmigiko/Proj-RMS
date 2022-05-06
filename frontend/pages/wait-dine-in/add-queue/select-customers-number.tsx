import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import SquarePlate from "components/cards/SquarePlate";
import Header from "components/templates/headers/Header";
import { useDispatch, useSelector } from "react-redux";

import { addQueueDetails } from "redux/actions/queueAction";
import axiosInstance from "helpers/axios";
const numberOfPeople = [1, 2, 3, 4];

const SelectCustomerNumber = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const goBackClick = () => router.push("/wait-dine-in");

  const addQueueClick = (num: number) => {
    const body = {
      num_of_customer: num,
      queue_group: "A",
    };
    axiosInstance.post("/queue/wait-dine-in", body).then((res) => {
      dispatch(
        addQueueDetails({
          queue_id: res.data.id,
          queue_num: res.data.queue_num,
          queue_group: res.data.queue_group,
        })
      );
    });
    // router.push(`/dine-in/tables/${table_id}/order-list/${res.data.id}`);
    router.push("/wait-dine-in/add-queue/select-menu");
  };

  return (
    <div className="py-4">
      <header>
        <Header text={"เพิ่มคิวใหม่"} goBackClick={goBackClick} />
      </header>
      <main className="flex flex-col items-center justify-center text-center ">
        <div className="text-3xl font-light my-20">จำนวนลูกค้า</div>
        <ul className="grid grid-cols-2 gap-8">
          {numberOfPeople.map((num, index) => (
            <li key={index}>
              <SquarePlate
                text={num === 4 ? `${num} คน +` : `${num} คน`}
                icon={undefined}
                handleClick={() => addQueueClick(num)}
                optClassName={undefined}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default SelectCustomerNumber;
