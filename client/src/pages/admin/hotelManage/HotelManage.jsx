import "./hotelManage.css";
import { Header } from "../../../components/header/Header.jsx";
import { useEffect, useState } from "react";
import { deleteHotel, getAllHotels } from "../../../api/hotelApi.js";
import { HotelCards } from "../../../components/sideBar/hotelCards/HotelCards.jsx";
import { useNavigate } from "react-router-dom";

export const HotelManage = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

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
            {/* <button
              className="add-hotel-btn"
              title="Add Hotel"
              onClick={() => {
                navigate("/admin/add-hotel");
              }}
            >
              +
            </button> */}

            <button
              title="Add Hotel"
              onClick={() => {
                navigate("/admin/add-hotel");
              }}
              type="button"
              className="button"
            >
              <span className="button__text">Add Hotel</span>
              <span className="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
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
