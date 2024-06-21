import React, { useState } from "react";
import mainLogo from "../Assets/mainLogo.png";
import regMyVenuw from "../Assets/RegMyVenue.svg";
import gethelp from "../Assets/getHelp.svg";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./Css/Header.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleLoginSubmit = () => {
    // Assume sending OTP is successful
    if (
      (isPhoneLogin && userNumber.length >= 10) ||
      (!isPhoneLogin && userEmail.includes("@"))
    ) {
      setOtpSent(true);
    }
  };
  const handleOtpSubmit = () => {
    // Handle the OTP confirmation logic here
    // For example, verify the OTP
  };
  const isPhoneNumberValid = userNumber.length >= 10;
  const isEmailValid = userEmail.includes("@");

  // user registration modal after logging in after phone otp
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowRegistrationModal = () => setShowRegistrationModal(true);

  const handleRegistrationSubmit = () => {
    // Handle the registration submission logic here
    // For example, validate inputs and send data to the server
    if (!firstName || !lastName || phoneNumber.length < 10) {
      alert("Please fill in all fields correctly");
      return;
    }
    // Proceed with registration
    console.log("Registration data:", { firstName, lastName, phoneNumber });
    handleCloseRegistrationModal();
  };
  const [termsChecked, setTermsChecked] = useState(false);
  const isFormValid = firstName && lastName && phoneNumber.length >= 10;
  const isUserRegestrationFormValid =
    firstName && lastName && phoneNumber.length >= 10 && termsChecked;

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav navbar_list">
                <li class="nav-item left_section_navbar">
                  <Link class="nav-link" href="#">
                    <img src={regMyVenuw} alt="regmevenue" />
                    <p>Register My Venue</p>
                  </Link>
                </li>
                <div className="right_section_navbar">
                  <li class="nav-item ">
                    <Link class="nav-link gethelp_container" href="#">
                      <img src={gethelp} alt="gethelp" />
                      <p> Get Help</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" href="#" onClick={setShowLoginModal}>
                      <p> Login</p>
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
            <div class="navbar-brand center_section_navbar">
              <Link class="nav-link" href="#">
                <img src={mainLogo} width={180} alt="mainLogo" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        className="modal-md"
        centered
        show={showLoginModal}
        onHide={handleCloseLoginModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="phoneLoginModal_body">
          {!otpSent ? (
            isPhoneLogin ? (
              <>
                <h6>Enter your Phone Number</h6>
                <p>You will receive a text message to verify your account.</p>
                <PhoneInput
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="mt-2"
                  defaultCountry="in"
                  value={userNumber}
                  onChange={(phone) => setUserNumber(phone)}
                />
              </>
            ) : (
              <>
                <h6>Enter your Email Address</h6>
                <p>You will receive an email to verify your account.</p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="mt-2 form-control"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </>
            )
          ) : (
            <>
              <h6>Enter the OTP</h6>
              <p>
                Please enter the OTP sent to your{" "}
                {isPhoneLogin ? "phone" : "email"}.
              </p>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="OTP"
                className="mt-2 form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
          {!otpSent ? (
            <Button
              className="PhoneloginButton"
              onClick={handleLoginSubmit}
              style={{
                backgroundColor:
                  (isPhoneLogin && !isPhoneNumberValid) ||
                  (!isPhoneLogin && !isEmailValid)
                    ? "grey"
                    : "",
                borderColor:
                  (isPhoneLogin && !isPhoneNumberValid) ||
                  (!isPhoneLogin && !isEmailValid)
                    ? "grey"
                    : "",
                cursor:
                  (isPhoneLogin && !isPhoneNumberValid) ||
                  (!isPhoneLogin && !isEmailValid)
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                (isPhoneLogin && !isPhoneNumberValid) ||
                (!isPhoneLogin && !isEmailValid)
              }
            >
              Continue
            </Button>
          ) : (
            <Button
              className="PhoneloginButton"
              onClick={() => {
                handleOtpSubmit();
                handleShowRegistrationModal();
              }}
              style={{
                backgroundColor: otp.length < 4 ? "grey" : "",
                borderColor: otp.length < 4 ? "grey" : "",
                cursor: otp.length < 4 ? "not-allowed" : "pointer",
              }}
              disabled={otp.length < 4}
            >
              Confirm OTP
            </Button>
          )}
          {!otpSent && (
            <div className="footer_phoneLoginModal">
              <Button
                variant="link"
                onClick={() => setIsPhoneLogin(!isPhoneLogin)}
              >
                {isPhoneLogin ? "Use Email Instead" : "Use Phone Instead"}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        className="modal-md"
        centered
        show={showRegistrationModal}
        onHide={handleCloseRegistrationModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="useRegistration_body">
          <h6>Welcome to Book My Venue </h6>
          <p>Create your account and quickly make a reservation </p>
          <form className="userRegistration_form">
            <div className="mb-3">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={firstName}
                placeholder=" First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="  Last Name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3 userRegistration_phoneNumber">
              <PhoneInput
                id="phoneNumberUserRegistration"
                name="phoneNumber"
                placeholder="Phone Number"
                className="form-control"
                defaultCountry="in"
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
              />
            </div>
            <div className="mb-3 dfoodoterms_agreement">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={termsChecked}
              />
              <p>
                I agree to Dfoodo Terms of Service Privacy Policy and Content
                Policy
              </p>
            </div>
            <button
              className="userResgistrationContinuebtn"
              style={{
                backgroundColor: isUserRegestrationFormValid ? "red" : "grey",
              }}
              disabled={!isUserRegestrationFormValid}
            >
              Continue
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
