import { useEffect, useState } from "react";
import { getHotelByHotelId, updateHotel } from "../../api/hotelApi.js";
import "./hotelEditForm.css";
import { useParams, useNavigate } from "react-router-dom";
import HotelStatus from "../hotel-status/HotelStatus.jsx";
import { amenities } from "../../../data.js";

const HotelEditForm = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [status, setStatus] = useState(hotel?.status || "active");
  const [currency, setCurrency] = useState("");
  const [image, setImage] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [allAmenities, setAllAmenities] = useState(amenities);
  const [description, setDescription] = useState("");

  console.log(`Hotel id : ${id}`);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getHotelByHotelId(id);
        if (response.success) {
          const data = response.data;
          setHotel(data);

          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setStreet(data.address?.street || "");
          setCity(data.address?.city || "");
          setCheckInTime(data.checkInTime || "");
          setCheckOutTime(data.checkOutTime || "");
          setStatus(data.status || "active");
          setCurrency(data.currency || "LKR");
          setDescription(data.description || "");
          setSelectedAmenities(data.amenities || []);
        }
      } catch (error) {
        console.error("error occured", error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  // Toggle amenity on/off
  const handleToggleAmenity = (amenityName) => {
    if (selectedAmenities.includes(amenityName)) {
      // If already selected, remove it
      setSelectedAmenities(
        selectedAmenities.filter((name) => name !== amenityName),
      );
    } else {
      // If not selected, add it
      const updatedList = selectedAmenities.slice();

      updatedList.push(amenityName);

      setSelectedAmenities(updatedList);
    }
  };

  //add amenity to list
  const handleAddAmenity = (e) => {
    e?.preventDefault();

    const trimmed = newAmenity.trim();
    if (!trimmed) return;

    const items = newAmenity
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (items.length === 0) return;

    const newItemsToAdd = [];
    const newSelectedToAdd = [];

    items.forEach((itemName) => {
      const existsInAll = allAmenities.some(
        (a) => a.name.toLowerCase() === itemName.toLowerCase(),
      );
      if (!existsInAll) {
        newItemsToAdd.push({
          name: itemName,
        });
      }
      if (
        !selectedAmenities.some(
          (s) => s.toLowerCase() === itemName.toLowerCase(),
        )
      ) {
        newSelectedToAdd.push(itemName);
      }
    });

    // 1. Push objects { name: itemName } into allAmenities:
    if (newItemsToAdd.length > 0) {
      setAllAmenities((prev) => [...prev, ...newItemsToAdd]);
    }
    // 2. Push strings into setSelectedAmenities:
    if (newSelectedToAdd.length > 0) {
      setSelectedAmenities((prev) => [...prev, ...newSelectedToAdd]);
    }
    setNewAmenity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("checkInTime", checkInTime);
      formData.append("checkOutTime", checkOutTime);
      formData.append("status", status);
      formData.append("currency", currency);
      formData.append("coverImage", image);
      formData.append("amenities", selectedAmenities.join(","));
      formData.append(
        "address",
        JSON.stringify({
          street,
          city,
        }),
      );

      await updateHotel(formData, id, () => {
        navigate("/admin/hotel-manage");
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(hotel);

  return (
    <div className="hotel-edit-container">
      <div className="hotel-edit-main">
        <form onSubmit={handleSubmit}>
          <div className="hotel-input-group">
            <label htmlFor="">Hotel Name</label>
            <br />
            <input
              type="text"
              required
              placeholder="Hotel name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Hotel Email</label>
            <br />
            <input
              type="email"
              required
              placeholder="Hotel email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Hotel Phone</label>
            <br />
            <input
              type="text"
              required
              placeholder="Hotel phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Hotel Street</label>
            <br />
            <input
              type="text"
              required
              placeholder="Hotel street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Hotel city</label>
            <br />
            <input
              type="text"
              required
              placeholder="Hotel city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Check in</label>
            <br />
            <input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              step="60"
              aria-label="Select a time"
            />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Check out</label>
            <br />
            <input
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              step="60"
              aria-label="Select a time"
            />
          </div>
          <div className="hotel-input-group hotel-status">
            Hotel status
            <br />
            <br />
            {/* TODO:this will replace by one input */}
            <HotelStatus status={status} setStatus={setStatus} />
          </div>
          <div className="hotel-input-group">
            <label htmlFor="">Currency</label>
            <br />
            <select onChange={(e) => setCurrency(e.target.value)}>
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="hotel-input-group hotel-cover-image">
            <label htmlFor="">Cover image</label>
            <br />

            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* {hotel?.coverImage && (
              <div>
                <img
                  src={hotel.coverImage}
                  alt="Current Cover"
                  style={{
                    width: "80px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )} */}
          </div>
          <div className="hotel-input-group hotel-amenities">
            <label htmlFor="">Hotel Amenities</label>
            <div className="amenities-box">
              {allAmenities.map((item) => {
                const isSelected = selectedAmenities.includes(item.name);

                return (
                  <div
                    key={item.name}
                    className={`amenity-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleToggleAmenity(item.name)}
                  >
                    {isSelected && <span className="checkmark">✔</span>}
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="amenities-input">
              <input
                type="text"
                name=""
                id=""
                placeholder="add more amenities"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
              />
              <div className="amenity-add-btn" onClick={handleAddAmenity}>
                +
              </div>
            </div>
          </div>
          <div className="hotel-input-group hotel-edit-description">
            <label htmlFor="">Description</label>
            <br />
            <textarea
              name=""
              rows={5}
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="hotel-add-btn hotel-input">
            <button>Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelEditForm;
