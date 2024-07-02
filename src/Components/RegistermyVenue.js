import React from "react";
import "./Css/RegisterMyVenue.css";
import Footer from "./Footer";
import Header from "./Header";
import bg from "../Assets/getHelpBg.png";
const RegistermyVenue = () => {
  return (
    <>
      <Header />

      <div className="register-venue-background" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="register-venue-overlay">
            <div className="container">
              <div className="row">
                {/* <div className="image_overlay_getHelp">
                  <img src={bg} alt="bg" />
                </div> */}
                <div className="col-lg-7 register-venue-content">
                  <h1>Hipster ipsum tattooed brunch I'm baby.</h1>
                  <p>
                    Looking to boost your restaurant's revenue and streamline
                    operations?
                  </p>
                  <p
                    className="heroBottmHed"
                    style={{
                      color: "var(--Secondary-Light-Orange-Color)",
                      fontSize: "14px",
                    }}
                  >
                    Begin attracting more reservations from local diners and
                    international visitors alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="register_my_venue_wrapper">
          <div className="col-lg-8">
            <div className="container">
              {" "}
              <div className="register-venue-form-container ">
                <div className="register-venue-form-heading">
                  <h2>Become a Partner!</h2>
                  <p style={{ fontWeight: "300" }}>
                    Fill in the Form Below to Get Started on Book my Venue{" "}
                  </p>
                </div>
                <form className="venue-registration-form">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="venueName">Business Name*</label>
                      <input
                        type="text"
                        id="venueName"
                        name="venueName"
                        className="form-control"
                        placeholder="Enter the name of your Business"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="venueLocation d-flex flex-row">
                        City*
                      </label>
                      <input
                        type="text"
                        id="venueLocation"
                        name="venueLocation"
                        className="form-control"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="contactPerson">Your Name*</label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        className="form-control"
                        placeholder="Enter your Full Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactEmail">Contact*</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        className="form-control"
                        placeholder="Enter your Mobile No."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Email*</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Enter your Email Address"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label>Key Objective</label>
                      <br />
                      <span className="radio_buttons_reg_form2">
                        <input
                          type="radio"
                          id="type1"
                          name="type"
                          value="type1"
                        />
                        <label htmlFor="type1">Get More Business</label>
                        <br />
                        <input
                          type="radio"
                          id="type2"
                          name="type"
                          value="type2"
                        />
                        <label htmlFor="type2">Get More Visibility</label>
                        <br />
                        <input
                          type="radio"
                          id="type3"
                          name="type"
                          value="type3"
                        />
                        <label htmlFor="type3">Both</label>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="additionalInfo">Comments*</label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        className="form-control"
                        placeholder="Notes"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="containerOfcheckBox">
                    <div className="checkBox_registerMyVenue">
                      {" "}
                      <input
                        type="checkbox"
                        id="availability"
                        name="availability"
                      />
                      <span className="check_box_text">
                        <p>
                          By submitting this form, you agree to our
                          <span
                            style={{
                              color: "var(--primary-color)",
                              marginLeft: "0.2rem",
                            }}
                          >
                            {" "}
                            Terms and Conditions
                          </span>{" "}
                        </p>
                      </span>
                    </div>
                    <div className="checkBox_registerMyVenue">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_section_regmyvenue">
        <Footer />
      </section>
    </>
  );
};

export default RegistermyVenue;
