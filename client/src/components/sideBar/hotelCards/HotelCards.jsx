import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faLocation,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteHotel } from "../../../api/hotelApi.js";

export const HotelCards = ({ hotel, hotels, setHotels }) => {
  const DeleteHotel = async (id) => {
    try {
      const response = await deleteHotel(id);
      if (response?.data?.success) {
        const hotelList = [];
        for (let i = 0; i < hotels.length; i++) {
          if (hotels[i]._id !== id) {
            hotelList.push(hotels[i]);
          }
        }
        setHotels(hotelList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hotel-card" key={hotel._id}>
      {/* 1. Image & Floating Badges */}
      <div className="hotel-card-image-wrap">
        <img
          src={hotel.coverImage}
          alt={hotel.name}
          referrerPolicy="no-referrer"
        />
        <div className="badge-group">
          <span className={`status-badge ${hotel.status}`}>{hotel.status}</span>
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
        <button className="btn-delete" onClick={() => DeleteHotel(hotel._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="btn-info">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <div className="action-buttons">
          <button className="btn-icon" title="Edit Hotel">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};
