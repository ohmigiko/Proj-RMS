import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import StationHeader from "components/cooking-station/StationHeader";
import TodoOrderList from "components/cooking-station/TodoOrderList";
import { RiHistoryLine } from "react-icons/ri";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import TodoOrderCard from "components/cooking-station/TodoOrderCard";
import FinishTodoModal from "components/modals/FinishTodoModal";
import axiosInstance from "helpers/axios";
import CancelTodoModal from "components/modals/CancelTodoModal";
import FinishedOrderList from "components/cooking-station/FinishedOrderList";

const CookingStation = () => {
  const [takeHomeOrders, setTakeHomeOrders] = useState([]);
  const [dineInOrders, setDineInOrders] = useState([]);
  const [showFinshOrderModal, setShowFinishOrderModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const [currOrderDetails, setCurrOrderDetais] = useState({});
  const router = useRouter();

  const {
    isLoading: cookingStationsDataLoading,
    apiData: cookingStationsData,
    serverError,
  } = useFetch("GET", "/category", {});

  return (
    <div>
      {cookingStationsDataLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : cookingStationsData ? (
        <div className="flex flex-col h-screen">
          <header>
            <StationHeader
              currentStation={{ id: null }}
              stationsData={cookingStationsData}
            />
          </header>
          <main className="bg-gray-300 grid grid-cols-3 h-full overflow-hidden">
            <FinishedOrderList />
            <div className="py-6 overflow-auto w-11/12">
              <TodoOrderList text={"กลับบ้าน"} amount={0} />
            </div>
            <div className="py-6 overflow-auto w-11/12">
              <TodoOrderList text={"ทานในร้าน"} />
            </div>
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default CookingStation;
