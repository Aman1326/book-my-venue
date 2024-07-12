import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Modal, Button } from "react-bootstrap";
import Successs from "../Assets/verified.gif";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleIaphabetnumberChange,
  handleNumbersChange,
  handleSuccess,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  save_venueowner,
} from "../ServiceConnection/serviceconnection.js";
import $ from "jquery";
const RegistermyVenue = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const handleSaveChangesdynamic = async (form_data, save_venueowner) => {
    let vaild_data = check_vaild_save(form_data);
    // seterror_show("");
    if (!$("#availability").prop("checked")) {
      vaild_data = false;
      handleError(
        "Please agree to the terms and conditions before proceeding."
      );
    }
    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(save_venueowner, fd_from)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            empty_form(form_data);
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    }
  };

  //success modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 3000); // 3000ms = 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <>
      <Header />

      <div className="register-venue-background" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="register-venue-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 register-venue-content">
                  <h1>Boost your restaurant's success today!</h1>
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
                        onInput={handleAphabetsChange}
                        maxLength={70}
                        className="form-control trio_mandatory"
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
                        onInput={handleAphabetsChange}
                        maxLength={30}
                        className="form-control trio_mandatory"
                        placeholder="Enter City"
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
                        onInput={handleAphabetsChange}
                        className="form-control trio_mandatory"
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
                        onInput={handleNumbersChange}
                        className="form-control trio_mandatory"
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
                        onInput={handleEmailChange}
                        className="form-control trio_mandatory"
                        placeholder="Enter your Email Address"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label>Key Objective</label>
                      <br />
                      <span className="radio_buttons_reg_form2">
                        <input
                          type="radio"
                          id="1"
                          name="objective"
                          className="form-control trio_mandatory appearance_revert"
                          value="1"
                          checked
                        />
                        <label htmlFor="1">Get More Business</label>
                        <br />
                        <input
                          type="radio"
                          id="2"
                          name="objective"
                          className="form-control trio_mandatory appearance_revert"
                          value="2"
                        />
                        <label htmlFor="2">Get More Visibility</label>
                        <br />
                        <input
                          type="radio"
                          id="3"
                          name="objective"
                          className="form-control trio_mandatory appearance_revert"
                          value="3"
                        />
                        <label htmlFor="3">Both</label>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="additionalInfo">Comments*</label>
                      <textarea
                        id="comment"
                        maxLength={300}
                        name="comment"
                        onInput={handleIaphabetnumberChange}
                        className="form-control trio_mandatory"
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
                        onClick={() => {
                          handleOpenModal();
                          handleSaveChangesdynamic(
                            "vanueregistration",
                            save_venueowner
                          );
                        }}
                        type="button"
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="success_modal_reg "
      >
        <Modal.Body>
          <div className="success_modal_register_my_venue ">
            <img src={Successs} alt="success" />
            <h3>Your request have been submitted successfully !</h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegistermyVenue;
