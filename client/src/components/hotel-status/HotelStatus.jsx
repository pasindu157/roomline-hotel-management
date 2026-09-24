import { STATUS_OPTIONS } from "../../../data.js";
import "./hotelStatus.css";

const HotelStatus = ({ status, setStatus }) => {
  return (
    <div className="status-radio-group">
      {STATUS_OPTIONS.map((item) => (
        <label
          key={item.value}
          htmlFor={item.id}
          className={`status-radio-card ${item.colorClass} ${status === item.value ? "checked" : ""}`}
        >
          <input
            type="radio"
            id={item.id}
            name="hotelStatus"
            value={item.value}
            checked={status === item.value}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className="status-radio-content">
            <div className="status-title-row">
              <span className="status-dot"></span>
              <span className="status-name">{item.label}</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default HotelStatus;
