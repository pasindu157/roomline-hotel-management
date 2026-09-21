import "./hotelManage.css";
import { Header } from "../../../components/header/Header.jsx";
import { useEffect, useState } from "react";
import { deleteHotel, getAllHotels } from "../../../api/hotelApi.js";
import { HotelCards } from "../../../components/sideBar/hotelCards/HotelCards.jsx";

export const HotelManage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        if (response?.data?.data?.length > 0) {
          const result = response.data.data;
          const hotelList = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].isActive && result[i].status === "active") {
              hotelList.push(result[i]);
            }
          }
          setHotels(hotelList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="hotel-manage-container">
      <Header />
      <div className="hotel-content">
        <div className="hotel-content-header">
          <div style={{ gridColumn: "1/2" }}>
            <p>Hotel list</p>
            <p>You have total of {hotels.length} Hotels</p>
          </div>
          <div style={{ gridColumn: "2/3", justifySelf: "end" }}>
            <button className="add-hotel-btn">+</button>
          </div>
        </div>
        <div className="hotel-details">
          <div className="hotel-cards-content">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <HotelCards
                  hotel={hotel}
                  hotels={hotels}
                  setHotels={setHotels}
                />
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
