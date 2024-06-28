import React from "react";
import "../Components/Css/ListYourVenue.css";
import bg from "../Assets/listYourVenue.png";
const ListYourVenue = () => {
  return (
    <section className=" container">
      <div className=" list_your_venue_Section">
        <div className="col-lg-10 col-md-11 m-auto">
          <div className="row">
            <div className="col-lg-6">
              <div className="list_your_venue_heading">
                <div>
                  <h2>Are you a venue owner?</h2>
                  <h4>list own venues</h4>
                  <p>
                    List your venue for free! Track bookings, get monthly stats,
                    and simplify your life with our platform. Maximize your
                    venue's potential with our hassle-free listing service.
                  </p>
                  <button>List Your Venue</button>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 m-auto">
              <div className="bg_container_listyourvenue">
                <img src={bg} alt="bg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourVenue;
