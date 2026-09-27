import { useEffect, useState } from "react";
import "./roomTable.css";
import { getRoomsByHotelId } from "../../api/roomApi.js";

const RoomTable = ({ hotel }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!hotel) return;
    const fetchRooms = async () => {
      try {
        const result = await getRoomsByHotelId(hotel);
        if (result?.success) {
          setRooms(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [hotel]);

  console.log(rooms);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Room No.</th>
          <th>Room Type</th>
          <th>Floor</th>
          <th>Price / Night</th>
          <th>Status</th>
          <th>Cleanliness</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <tr key={room._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="room-no">{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.floor}</td>
              <td className="room-price">
                {room.currency.toUpperCase()} {room.pricePerNight}
              </td>
              <td>
                <span className={`status-badge ${room.status}`}>
                  {room.status}
                </span>
              </td>
              <td>
                <span className={`clean-badge ${room.cleanState}`}>
                  {room.cleanState}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button className="btn-action btn-view">See More</button>
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <span>No Rooms found</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RoomTable;
