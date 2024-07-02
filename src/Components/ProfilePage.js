import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Css/ProfilePage.css";
import { PhoneInput } from "react-international-phone";
const ProfilePage = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const [userNumber, setUserNumber] = useState("");
  return (
    <>
      <Header />
      <section className="row container-lg">
        <div className="ProfileCont">
          <div className="col-lg-8">
            <div className="profile_section">
              <div className="container mt-3">
                <div className="register-venue-form-heading">
                  <h2>My Profile</h2>
                  <p>Manage my personal Information </p>
                  <desc>
                    Your Contact information will be send to the Venue Owner
                    when you make a Enquiry
                  </desc>
                </div>
                <form className="venue-registration-form profile_pafe_form">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="venueName">First Name</label>
                      <input
                        type="text"
                        id="venueName"
                        name="venueName"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="venueLocation">Last Name</label>
                      <input
                        type="text"
                        id="venueLocation"
                        name="venueLocation"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="contactPerson">Email</label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6 birth_date_profile">
                      <label className="mb-2">Date of Birth</label>
                      <div className="DOBCalander">
                        <select
                          id="day"
                          name="day"
                          className="form-control  custom-select"
                        >
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <select
                          id="month"
                          name="month"
                          className="form-control  custom-select mr-2"
                        >
                          {months.map((month, index) => (
                            <option key={month} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <select
                          id="year"
                          name="year"
                          className="form-control  custom-select"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Phone</label>
                      <PhoneInput
                        id="phoneNumberProfilePage"
                        placeholder="Phone Number"
                        className="form-control mt-2"
                        defaultCountry="in"
                        value={userNumber}
                        onChange={(phone) => setUserNumber(phone)}
                        name="phone"
                      />
                    </div>
                    <div className="col-md-6 ">
                      <br />
                      <span className="radio_buttons_reg_form mt-2 ">
                        <input
                          type="radio"
                          id="type1"
                          name="type"
                          value="type1"
                        />
                        <label>Male</label>
                        <br />
                        <input
                          type="radio"
                          id="type2"
                          name="type"
                          value="type2"
                        />
                        <label>Female</label>
                        <br />
                        <input
                          type="radio"
                          id="type3"
                          name="type"
                          value="type3"
                        />
                        <label>N/A</label>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 checkBox_registerMyVenue">
                      <br />
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="footer_section_regmyvenue">
        <Footer />
      </section> */}
    </>
  );
};

export default ProfilePage;
