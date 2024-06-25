import React from "react";
import "../Components/Css/ListYourVenue.css";
import bg from "../Assets/listYourVenue.png";
const ListYourVenue = () => {
  return (
    <section className=" container">
      <div className=" list_your_venue_Section">
        <div className="row">
          <div className="col-lg-6">
            <div className="list_your_venue_heading">
              <h3>Are you a venue owner?</h3>
              <h6>list own venues</h6>
              <p>
                List your venue for free! Track bookings, get monthly stats, and
                simplify your life with our platform. Maximize your venue's
                potential with our hassle-free listing service.
              </p>
              <button>List Your Venue</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bg_container_listyourvenue">
              <img src={bg} alt="bg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourVenue;
