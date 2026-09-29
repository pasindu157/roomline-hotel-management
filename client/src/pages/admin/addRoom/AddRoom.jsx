import "./addRoom.css";

const AddRoom = () => {
  return (
    <div className="add-room-container">
      <div className="add-room-content">
        <div className="add-room-header">
          <p>Add Rooms</p>
          <p>Fill in the details below to create a new room listing.</p>
        </div>
        <div className="add-room-form-main">
          <div className="add-room-form">
            <form>
              <fieldset>
                <legend>General Information</legend>

                {/* room type , number , bed type and no of beds , floor number*/}
                <div className="room-group general_information">
                  <div className="hotel">
                    <label htmlFor="">Hotel</label>
                    <br />
                    <select id="hotel" required>
                      <option value="" disabled selected>
                        Select Hotel
                      </option>
                      <option value="single">Hotel C</option>
                      <option value="double">Hotel BT</option>
                      <option value="deluxe">Hotel A</option>
                    </select>
                  </div>
                  <div className="room-type">
                    <label htmlFor="">Room Type</label>
                    <br />
                    <select id="room-type" required>
                      <option value="" disabled selected>
                        Select type
                      </option>
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="deluxe">Double</option>
                      <option value="suite">Suite</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                  <div className="room-bed-type">
                    <label htmlFor="">Bed Type</label>
                    <br />
                    <input type="text" placeholder="ex :- Twin" />
                  </div>
                  <div className="noOf-beds">
                    <label htmlFor="">No. of beds</label>
                    <br />
                    <input type="text" placeholder="ex :- 2" />
                  </div>
                  <div className="floor-number">
                    <label htmlFor="">Floor Number</label>
                    <br />
                    <input type="text" placeholder="ex :- 1" />
                  </div>
                  <div className="room-numbers">
                    <label htmlFor="">Room number(s)</label>
                    <br />
                    <input type="text" placeholder="ex :- 101,102,103" />
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
                    <input type="text" placeholder="0.00" />
                  </div>
                  <div className="capacity">
                    <label htmlFor="">Adults</label>
                    <input type="text" />
                    <br />

                    <label htmlFor="">Children</label>
                    <input type="text" />
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
                    <textarea name="" id=""></textarea>
                  </div>
                  <div className="amenitites">
                    <label htmlFor="">Amenities</label>
                    <br />
                    <div className="amenity-box">jfkddk fkdfkd fdkdkf</div>
                    <div className="add-more-amenites">
                      <input
                        type="text"
                        placeholder="ex :- Free WiFi, AC, Smart TV"
                      />
                      <button>+</button>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="room-group submit_cancel">
                <button>Submit</button>
                <button>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
