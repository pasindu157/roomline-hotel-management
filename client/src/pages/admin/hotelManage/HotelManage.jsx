import "./hotelManage.css";
import { Header } from "../../../components/header/Header.jsx";
import { useEffect, useState } from "react";
import { getAllHotels } from "../../../api/hotelApi.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLocation,
  faMarker,
} from "@fortawesome/free-solid-svg-icons";

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
                <div className="hotel-card" key={hotel._id}>
                  {/* 1. Image & Floating Badges */}
                  <div className="hotel-card-image-wrap">
                    <img
                      src={hotel.coverImage}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="badge-group">
                      <span className={`status-badge ${hotel.status}`}>
                        {hotel.status}
                      </span>
                      {!hotel.isEmailVerified && (
                        <span className="unverified-badge">Unverified</span>
                      )}
                    </div>
                  </div>
                  {/* 2. Hotel Details */}
                  <div className="hotel-card-body">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-location">
                      <span>
                        <FontAwesomeIcon icon={faLocation} />
                      </span>{" "}
                      {hotel.address?.city}, {hotel.address?.country}
                    </p>
                    <div className="hotel-meta-grid">
                      <div className="meta-item">
                        <span className="meta-label">Phone:</span>
                        <span className="meta-value">{hotel.phone}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Currency:</span>
                        <span className="meta-value">{hotel.currency}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Check In/Out:</span>
                        <span className="meta-value">
                          {hotel.checkInTime} - {hotel.checkOutTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 3. Action Footer */}
                  <div className="hotel-card-footer">
                    <button className="btn-manage">Manage Hotel</button>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Edit Hotel">
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ color: "var(--dark-blue-font)" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
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
