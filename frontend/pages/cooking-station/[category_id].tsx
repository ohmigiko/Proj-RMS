import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import StationHeader from "components/cooking-station/StationHeader";
import TodoOrderList from "components/cooking-station/TodoOrderList";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import FinishTodoModal from "components/modals/FinishTodoModal";
import axiosInstance from "helpers/axios";
import CancelTodoModal from "components/modals/CancelTodoModal";
import FinishedOrderList from "components/cooking-station/FinishedOrderList";

const CookingStationByCategoryId = () => {
  const [takeHomeOrders, setTakeHomeOrders] = useState([]);
  const [dineInOrders, setDineInOrders] = useState([]);
  const [showFinshOrderModal, setShowFinishOrderModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const [currOrderDetails, setCurrOrderDetais] = useState({});
  const router = useRouter();
  const { category_id } = router.query;

  const {
    isLoading: todoOrdersLoading,
    serverError: todoOrdersError,
    apiData: todoOrders,
  } = useFetch("GET", `/order/category/${category_id}`, {});
  console.log("todoOrders", todoOrders);

  const {
    isLoading: categoryDataLoading,
    apiData: categoryData,
    serverError: categoryDataError,
  } = useFetch("GET", `/category/${category_id}`, {});

  const {
    isLoading: cookingStationsDataLoading,
    apiData: cookingStationsData,
    serverError,
  } = useFetch("GET", "/category", {});

  const {
    isLoading: finishedOrdersLoading,
    serverError: finishedOrdersError,
    apiData: finishedOrders,
  } = useFetch("GET", `order/done/${category_id}`, {});

  useEffect(() => {
    if (todoOrders) {
      setTakeHomeOrders(todoOrders.filter((order) => order.take_home === true));
      setDineInOrders(todoOrders.filter((order) => order.take_home === false));
    }
  }, [todoOrders]);

  const comfirmFisihOrderModalClick = () => {
    axiosInstance
      .patch(`/order/status/${currOrderDetails.order_id}`, { status: "done" })
      .then((res) => {
        console.log("res", res);
        window.location.reload();
      });
    setShowFinishOrderModal(false);
  };

  const cancelFisihOrderModalClick = () => {
    setShowFinishOrderModal(false);
  };

console.log("orders",todoOrders)
  const comfirmCancelOrderModalClick = () => {
    console.log("currOrderDetails", currOrderDetails);
    axiosInstance
      .delete(`/order/delete/${currOrderDetails.order_id}`)
      .then((res) => {
        console.log("res", res);
        window.location.reload();
      });
    setShowCancelOrderModal(false);
  };

  const cancelCancelOrderModalClick = () => {
    setShowCancelOrderModal(false);
  };

  console.log("kitchen", cookingStationsData);

  return (
    <div>
      {todoOrdersLoading ||
      finishedOrdersLoading ||
      categoryDataLoading ||
      cookingStationsDataLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : todoOrders && finishedOrders && categoryData ? (
        <div className="flex flex-col h-screen">
          <header>
            {categoryData && (
              <StationHeader
                currentStation={{
                  id: categoryData.id,
                  name: categoryData.name,
                }}
                stationsData={cookingStationsData}
              />
            )}
          </header>
          <main className="bg-gray-300 grid grid-cols-3 h-full overflow-hidden">
            <FinishedOrderList
              finishedOrders={finishedOrders}
              setShowFinishOrderModal={setShowFinishOrderModal}
              setCurrOrderDetails={setCurrOrderDetais}
              setShowCancelOrderModal={setShowCancelOrderModal}
            />
            <div className="py-6 overflow-auto w-11/12">
              <TodoOrderList
                text={"กลับบ้าน"}
                amount={takeHomeOrders.length}
                orders={takeHomeOrders}
                setShowFinishOrderModal={setShowFinishOrderModal}
                setCurrOrderDetails={setCurrOrderDetais}
                setShowCancelOrderModal={setShowCancelOrderModal}
              />
            </div>
            <div className="py-6 overflow-auto w-11/12">
              <TodoOrderList
                text={"ทานในร้าน"}
                amount={dineInOrders.length}
                orders={dineInOrders}
                setShowFinishOrderModal={setShowFinishOrderModal}
                setCurrOrderDetails={setCurrOrderDetais}
                setShowCancelOrderModal={setShowCancelOrderModal}
              />
            </div>
          </main>
        </div>
      ) : null}
      <FinishTodoModal
        open={showFinshOrderModal}
        details={currOrderDetails}
        confirmClick={comfirmFisihOrderModalClick}
        cancelClick={cancelFisihOrderModalClick}
      />
      <CancelTodoModal
        open={showCancelOrderModal}
        details={currOrderDetails}
        confirmClick={comfirmCancelOrderModalClick}
        cancelClick={cancelCancelOrderModalClick}
      />
    </div>
  );
};

export default CookingStationByCategoryId;
