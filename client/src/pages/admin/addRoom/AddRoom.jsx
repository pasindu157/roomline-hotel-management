import { useEffect, useState } from "react";
import "./addRoom.css";
import { getAllHotels } from "../../../api/hotelApi.js";
import { addRoom } from "../../../api/roomApi.js";

const AddRoom = () => {
  const roomFacilities = [
    "Free WiFi",
    "Smart TV",
    "Sea view",
    "Balcony",
    "AC conditioning",
    "Hot Water Shower",
    "Mini Bar",
  ];

  const [hotel, setHotel] = useState([]);

  const [selectedHotel, setSelectedHotel] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bedType, setBedType] = useState("");
  const [noOfBeds, setNoOfBeds] = useState("");
  const [floor, setFloor] = useState("");
  const [roomNumbers, setRoomNumbers] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [description, setDescription] = useState("");
  const [amenites, setAmenities] = useState(roomFacilities);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getAllHotels();
        if (response.data.success) {
          setHotel(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotel();
  }, []);

  const handleToggleAmenity = (amenityName) => {
    if (selectedAmenities.includes(amenityName)) {
      setSelectedAmenities(
        selectedAmenities.filter((name) => name !== amenityName),
      );
    } else {
      const updatedList = selectedAmenities.slice();
      updatedList.push(amenityName);
      setSelectedAmenities(updatedList);
    }
    console.log(selectedAmenities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("hotelId", selectedHotel);
      formData.append("roomType", roomType);
      formData.append("bedType", bedType);
      formData.append("numberOfBeds", noOfBeds);
      formData.append("floor", floor);
      formData.append("roomNumbers", roomNumbers);
      formData.append("pricePerNight", pricePerNight);
      formData.append("adults", adults);
      formData.append("children", children);
      formData.append("description", description);
      formData.append("amenities", selectedAmenities.join(","));
      images.forEach((file) => {
        formData.append("images", file);
      });

      await addRoom(formData, () => {
        setHotel("");
        setRoomType("");
        setBedType("");
        setNoOfBeds("");
        setFloor("");
        setRoomNumbers([]);
        setPricePerNight("");
        setAdults("");
        setChildren("");
        setDescription("");
        setSelectedAmenities([]);
        setImages("");
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      const existsInAll = amenites.some(
        (a) => a.toLowerCase() === itemName.toLowerCase(),
      );
      if (!existsInAll) {
        newItemsToAdd.push(itemName);
      }
      if (
        !selectedAmenities.some(
          (s) => s.toLowerCase() === itemName.toLowerCase(),
        )
      ) {
        newSelectedToAdd.push(itemName);
      }
    });

    if (newItemsToAdd.length > 0) {
      setAmenities((prev) => [...prev, ...newItemsToAdd]);
    }

    if (newSelectedToAdd.length > 0) {
      setSelectedAmenities((prev) => [...prev, ...newSelectedToAdd]);
    }
    setNewAmenity("");
  };

  return (
    <div className="add-room-container">
      <div className="add-room-content">
        <div className="add-room-header">
          <p>Add Rooms</p>
          <p>Fill in the details below to create a new room listing.</p>
        </div>
        <div className="add-room-form-main">
          <div className="add-room-form">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>General Information</legend>

                {/* room type , number , bed type and no of beds , floor number*/}
                <div className="room-group general_information">
                  <div className="hotel">
                    <label htmlFor="">Hotel</label>
                    <br />
                    <select
                      id="hotel"
                      required
                      value={selectedHotel}
                      onChange={(e) => setSelectedHotel(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Hotel
                      </option>
                      {hotel.length > 0 ? (
                        hotel.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="room-type">
                    <label htmlFor="">Room Type</label>
                    <br />
                    <select
                      id="room-type"
                      required
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select type
                      </option>
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                  <div className="room-bed-type">
                    <label htmlFor="">Bed Type</label>
                    <br />
                    <select
                      id="room-type"
                      required
                      value={bedType}
                      onChange={(e) => setBedType(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select type
                      </option>
                      <option value="single">Single</option>
                      <option value="twin">Twin</option>
                      <option value="queen">Queen</option>
                      <option value="king">King</option>
                    </select>
                  </div>
                  <div className="noOf-beds">
                    <label htmlFor="">No. of beds</label>
                    <br />
                    <input
                      type="text"
                      placeholder="ex :- 2"
                      required
                      value={noOfBeds}
                      onChange={(e) => setNoOfBeds(e.target.value)}
                    />
                  </div>
                  <div className="floor-number">
                    <label htmlFor="">Floor Number</label>
                    <br />
                    <input
                      type="text"
                      placeholder="ex :- 1"
                      required
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </div>
                  <div className="room-numbers">
                    <label htmlFor="">Room number(s)</label>
                    <br />
                    <input
                      type="text"
                      placeholder="ex :- 101,102,103"
                      required
                      value={roomNumbers}
                      onChange={(e) => setRoomNumbers(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Pricing & Capacity</legend>

                {/* price per night and capacity(adults & childrens) */}
                <div className="room-group price-capacity">
                  <div className="price-night">
                    <label htmlFor="">Price per Night (LKR)</label>
                    <br />
                    <input
                      type="text"
                      placeholder="0.00"
                      required
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(e.target.value)}
                    />
                  </div>
                  <div className="capacity">
                    <label htmlFor="">Capacity(max)</label>
                    <input
                      type="text"
                      placeholder="Adults"
                      required
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                    />
                    <br />

                    <input
                      type="text"
                      placeholder="Children"
                      required
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Details & Amenities</legend>

                {/* details & amenities */}
                <div className="room-group details_amenities">
                  <div className="room-description">
                    <label htmlFor="">Description</label>
                    <br />
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="amenitites">
                    <label htmlFor="">Amenities</label>
                    <br />
                    <div className="amenity-box">
                      {amenites.map((item) => {
                        const isSelected = selectedAmenities.includes(item);

                        return (
                          <div>
                            <div
                              key={item}
                              className={`amenity-box-item ${isSelected ? "selectedFacility" : ""}`}
                              onClick={() => handleToggleAmenity(item)}
                            >
                              {isSelected && <span className="check">✔</span>}
                              <span>{item}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="add-more-amenites">
                      <input
                        type="text"
                        placeholder="ex :- Free WiFi, AC, Smart TV"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddAmenity();
                          }
                        }}
                      />
                      <div onClick={handleAddAmenity}>+</div>
                    </div>
                  </div>
                  <div className="room-images">
                    <label htmlFor="">Pictures(max : 5)</label>
                    <br />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                  </div>
                </div>
              </fieldset>
              <div className="room-group submit_cancel">
                <button>Submit</button>
                <div>Cancel</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
