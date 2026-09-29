import "./roomManage.css";
import { Header } from "../../../components/header/Header";
import AddButton from "../../../components/addButton/AddButton";
import RoomTable from "../../../components/roomDetailsTable/RoomTable";
import { useEffect, useState } from "react";
import { getAllHotels } from "../../../api/hotelApi.js";

const RoomManage = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(hotels[0]?._id);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        if (response?.data?.data?.length > 0) {
          const result = response.data.data;
          const hotelList = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].isActive) {
              hotelList.push(result[i]);
            }
          }
          setHotels(hotelList);
          if (hotelList.length > 0 && !selectedHotel) {
            setSelectedHotel(hotelList[0]._id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, [selectedHotel]);

  return (
    <div className="room-manage-container">
      <Header />
      <div className="room-manage-content">
        <div className="room-manage-header">
          <div className="room-manage-header-text">
            <p>Room List</p>
            <p>You have total of 20 rooms</p>
          </div>
          <div className="room-manage-add-room-btn">
            <AddButton text={"Add Room"} link={"/admin/add-room"} />
          </div>
        </div>

        <div className="room-manage-table-content">
          <div className="room-manage-table-actions-bar">
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="hotel-select-dropdown"
            >
              {hotels.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name} ({h.address?.city})
                </option>
              ))}
            </select>
          </div>
          <div className="room-manage-table">
            <RoomTable hotel={selectedHotel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomManage;
