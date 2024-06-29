import React, { useState, useEffect } from "react";
import mainLogo from "../Assets/mainLogo.png";
import regMyVenuw from "../Assets/RegMyVenue.svg";
import gethelp from "../Assets/getHelp.svg";
import { Link, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./Css/Header.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import SearchBar from "./SearchBar";
import favIcon from "../Assets/favorite.svg";
import enquiry from "../Assets/assignment_turned_in.svg";
import idCard from "../Assets/id_card.svg";
import helpCenter from "../Assets/help_center.svg";
import logout from "../Assets/logout.svg";
function Header() {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);
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
    handleCloseLoginModal();
  };
  const isPhoneNumberValid = userNumber.length >= 10;
  const isEmailValid = userEmail.includes("@");

  // user registration modal after logging in after phone otp
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowRegistrationModal = () => setShowRegistrationModal(true);

  const handleSearchShow = () => {
    if (
      location.pathname.includes("venue") ||
      location.pathname.includes("detailedVenue")
    ) {
      setsearchShow(true);
    } else {
      setsearchShow(false);
    }
  };

  useEffect(() => {
    handleSearchShow();
  }, []);

  //  login and profile dropdown:
  const [isDropdown, setIsDropdown] = useState(true);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-lg">
          {!searchShow && (
            <Link
              class="nav-link navItem hideAfter991"
              aria-current="page"
              to="/registerMyVenue"
            >
              <img src={regMyVenuw} alt="regmyvenue" />
              <p>Register My Venue</p>
            </Link>
          )}
          <Link class="navbar-brand" to="/">
            <img src={mainLogo} alt="mainlogo" width={150} />
          </Link>
          {searchShow && (
            <Link class="navbar-brand w-50">
              <SearchBar />
            </Link>
          )}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item d-lg-none">
                <Link className="nav-link navItem" aria-current="page" to="/">
                  <img src={regMyVenuw} alt="regmyvenue" />
                  <p>Register My Venue</p>
                </Link>
              </li>
              <li className="nav-item get_help_header">
                <Link
                  className="nav-link navItem"
                  aria-current="page"
                  to="/getHelp"
                >
                  <img src={gethelp} alt="gethelp" />
                  <p>Get Help</p>
                </Link>
              </li>
              <li className="nav-item">
                {isDropdown ? (
                  <div className="dropdown">
                    <Link
                      className="nav-link navItem "
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div id="profile_dropDown">
                        <h5>RS</h5>
                      </div>
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link
                          className="dropdown-item loggedIn_profile_drop"
                          to="/favouriteVenues"
                        >
                          <img src={favIcon} alt="favIcon" />
                          Favourite Venue
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item loggedIn_profile_drop"
                          to="/venueEnquiry"
                        >
                          <img src={enquiry} alt="favIcon" />
                          My Enquiry
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item loggedIn_profile_drop"
                          to="/profile"
                        >
                          <img src={idCard} alt="favIcon" />
                          My profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item loggedIn_profile_drop"
                          to="/getHelp"
                        >
                          <img src={helpCenter} alt="favIcon" />
                          Help
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item loggedIn_profile_drop"
                          onClick={() => {
                            /* handle logout */
                          }}
                        >
                          <img src={logout} alt="favIcon" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    className="nav-link navItem"
                    onClick={handleOpenLoginModal}
                  >
                    <p>Login</p>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container header_container">
            {!searchShow && (
              <Link class="nav-link " aria-current="page" href="#">
                <img src={regMyVenuw} alt="regmyvenue" />
                Register My Venue
              </Link>
            )}
            <a class="navbar-brand" href="#">
              <img src={mainLogo} alt="mainlogo" width={150} />
            </a>
            {searchShow && (
              <Link class="navbar-brand">
                <SearchBar />
              </Link>
            )}
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Resgiter my Venue
                  </a>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" href="#">
                    <img src={gethelp} alt="gethelp" />
                    Get Help
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" onClick={handleOpenLoginModal}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
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
                className="form-control"
                placeholder=" First Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="  Last Name"
                className="form-control"
              />
            </div>
            <div className="mb-3 userRegistration_phoneNumber">
              <PhoneInput
                id="phoneNumberUserRegistration"
                placeholder="Phone Number"
                className="form-control"
                defaultCountry="in"
                value={userNumber}
                onChange={(phone) => setUserNumber(phone)}
                //

                name="phone"
              />
            </div>
            <div className="mb-3 dfoodoterms_agreement">
              <input type="checkbox" />
              <p>
                I agree to Dfoodo Terms of Service Privacy Policy and Content
                Policy
              </p>
            </div>
            <button className="userResgistrationContinuebtn">Continue</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
