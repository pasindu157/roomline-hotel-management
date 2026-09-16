
import './notification.css'

const Notification = ({ successMessage }) => {
  return (
    <div className="notification">
      <p>{successMessage}</p>
    </div>
  );
};

export default Notification;
