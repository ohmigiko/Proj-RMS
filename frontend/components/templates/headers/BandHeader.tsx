import React from "react";
import { useSelector } from "react-redux";

const BandHeader = ({ text, goBackClick }) => {
  const { queue_num, table_name, queue_group, order_method } = useSelector(
    (state) => state.current_queue
  );
  return (
    <div className="bg-gradient-to-r from-white to-red-500 border-b shadow-md px-6 py-4">
      <div className="flex justify-end" onClick={goBackClick}>
        X
      </div>
      <div className="text-2xl mb-4">{text}</div>
      <div>
        <div className="text-2xl">
          {order_method === "dine-in"
            ? `โต๊ะ ${table_name}`
            : order_method === "wait-dine-in"
            ? "รอโต๊ะ"
            : order_method === "pick-up"
            ? "รับเอง"
            : order_method === "delivery"
            ? "ไรเดอร์"
            : null}
        </div>
        <div className="text-lg">
          คิวลูกค้า #{queue_group}
          {queue_num}
        </div>
      </div>
    </div>
  );
};

export default BandHeader;
