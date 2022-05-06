import HamburgerButton from "components/buttons/KebabMenu";
import React from "react";
import { useRouter } from "next/dist/client/router";

const StationHeader = ({ currentStation, stationsData }) => {
  const router = useRouter();

  const handleStationChange = (e) => {
    const { value: category_id } = e.target;
    router.push(`/cooking-station/${category_id}`);
  };

  return (
    <div className="text-white grid grid-cols-4 items-center p-3 bg-red-500">
      <div></div>
      <div className="text-2xl text-center col-span-2">
        <label>ห้องครัว</label>
        <select className="bg-red-500 border border-white rounded-lg ml-1.5 px-1" onChange={(e) => handleStationChange(e)}>
          <option value="" disabled hidden={currentStation.id !== null} selected={currentStation.id === null}>กรุณาเลือก</option>
          {stationsData.map((station) => (
            <option
              value={station.id}
              disabled={station.id === currentStation.id}
              selected={station.id === currentStation.id}
            >
              {station.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mr-5">
        <HamburgerButton />
      </div>
    </div>
  );
};

export default StationHeader;
