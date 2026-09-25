import "./roomManage.css";
import { Header } from "../../../components/header/Header";
import AddButton from "../../../components/addButton/AddButton";

const RoomManage = () => {
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
      </div>
    </div>
  );
};

export default RoomManage;
