import { useState } from "react";
import "./hotelAdd.css";
import { addHotel } from "../../api/hotelApi.js";
import toast from "react-hot-toast";

const HotelAdd = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        toast.error("Please select a cover image");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("coverImage", file);

      formData.append(
        "address",
        JSON.stringify({
          street,
          city,
          country,
          postalCode,
        }),
      );

      const response = await addHotel(formData, () => {
        setFile(null);
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setStreet("");
        setCity("");
        setCountry("");
        setPostalCode("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-hotel-container">
      <form onSubmit={handleSubmit}>
        <div className="add-hotel-content">
          {/* hotel name and email */}
          <div className="hotel_name hotel-input">
            <label htmlFor="">Hotel Name</label>
            <br />
            <input
              type="text"
              placeholder="Hotel Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="hotel-phone hotel-input">
            <label htmlFor="">Hotel phone</label>
            <br />
            <input
              type="text"
              placeholder="Hotel phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* email */}
          <div className="hotel-email hotel-input">
            <label htmlFor="">Hotel Email</label>
            <br />
            <input
              type="email"
              placeholder="Hotel Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* address */}
          <div className="hotel-street hotel-input">
            <label htmlFor="">Hotel Street</label>
            <br />
            <input
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              placeholder="Ex :- 150/F, any road, town"
              required
            />
          </div>
          <div className="hotel-city hotel-input">
            <label htmlFor="">Hotel City</label>
            <br />
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Ex :- katugastota"
              required
            />
          </div>
          <div className="hotel-country hotel-input">
            <label htmlFor="">Country</label>
            <br />
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="hotel-postal-code hotel-input">
            <label htmlFor="">Postal code</label>
            <br />
            <input
              type="text"
              placeholder="Postal code"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="hotel-coverImage hotel-input">
            <label htmlFor="">Cover image</label>
            <br />
            <div className="browse-label">
              <label htmlFor="image-input">Choose file</label>

              <label htmlFor="image-input">Browse</label>
            </div>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <div className="hotel-description hotel-input">
            <label htmlFor="">Description</label>
            <br />
            <textarea
              name=""
              rows={5}
              id=""
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="hotel-add-btn hotel-input">
            <button>Upload</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelAdd;
