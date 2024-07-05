import { useState } from "react";
import "./Css/RegisterMyVenue.css";
import Footer from "./Footer";
import Header from "./Header";
import bg from "../Assets/getHelpBg.png";
import {
  check_vaild_save,
  combiled_form_data,
  handleError,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  save_venueowner,
} from "../ServiceConnection/serviceconnection.js";
const RegistermyVenue = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const handleSaveChangesdynamic = async (form_data, save_venueowner) => {
    let vaild_data = check_vaild_save(form_data);
    // seterror_show("");

    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);

      fd_from.append("main_id", editorDataMainID);
      await server_post_data(save_venueowner, fd_from)
        .then((Response) => {
          console.log(Response);
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            // handleSuccessSession(Response.data.message, "/admin_news");
          }
        })
        .catch((error) => {
          console.log(error);
          setshowLoaderAdmin(false);
        });
    }
  };

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
                <form
                  className="venue-registration-form"
                  id="vanueregistration"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="venueName">Business Name*</label>
                      <input
                        type="text"
                        id="Business_Name"
                        name="Business_Name"
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
                        id="City"
                        name="City"
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
                        id="Owner_Name"
                        name="Owner_Name"
                        maxLength={15}
                        className="form-control"
                        placeholder="Enter your Full Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactEmail">Contact*</label>
                      <input
                        type="number"
                        id="Contact"
                        name="Contact"
                        maxLength={12}
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
                        id="Email"
                        name="Email"
                        maxLength={50}
                        className="form-control"
                        placeholder="Enter your Email Address"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label>Key Objective</label>
                      <br />
                      <span className="radio_buttons_reg_form2">
                        <input type="radio" id="1" name="objective" value="1" />
                        <label htmlFor="1">Get More Business</label>
                        <br />
                        <input type="radio" id="2" name="objective" value="2" />
                        <label htmlFor="2">Get More Visibility</label>
                        <br />
                        <input type="radio" id="3" name="objective" value="3" />
                        <label htmlFor="3">Both</label>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="additionalInfo">Comments*</label>
                      <textarea
                        id="comment"
                        name="comment"
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
                      <button
                        onClick={() =>
                          handleSaveChangesdynamic(
                            "vanueregistration",
                            save_venueowner
                          )
                        }
                        type="submit"
                      >
                        Submit
                      </button>
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
