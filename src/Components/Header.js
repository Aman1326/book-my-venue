import React, { useState, useEffect } from "react";
import mainLogo from "../Assets/mainLogo.png";
import regMyVenuw from "../Assets/RegMyVenue.svg";
import gethelp from "../Assets/getHelp.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import $ from "jquery";
import {
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleNumbersChange,
  make_image_from_letter,
  validateEmail,
  validateMobile,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  customer_login,
} from "../ServiceConnection/serviceconnection.js";
import {
  removeData,
  retrieveData,
  storeData,
} from "../LocalConnection/LocalConnection.js";
let login_flag_res = "0";
let customer_id = "0";
let customer_name = "0";
let customer_mobile_no = "0";
let customer_email = "0";
let complete_status_one = "0";
function Header() {
  customer_id = retrieveData("customer_id");
  customer_name = retrieveData("customer_name");
  const profileShow = customer_id !== "0";
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [otp, setOtp] = useState(""); // State to manage the entered OTP

  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [presentotp, setpresentotp] = useState("");
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(false);
  const [isOTPValid, setisisOTPValid] = useState(false);

  const login_section_res = async () => {
    let vaild = "0";
    let login_otp = $("#opt_user").val();
    let user_email = $("#user_email").val();
    let user_name = $("#user_name").val();
    let user_last = $("#user_last").val();

    if (login_flag_res === "0") {
      if (!validateMobile(userNumber)) {
        vaild = "1";
      }
    }

    if (login_flag_res === "1") {
      if (parseInt(login_otp) === "") {
        vaild = "1";
      } else if (parseInt(login_otp) !== parseInt(presentotp)) {
        vaild = "1";
      } else {
        if (complete_status_one === "0") {
          $(".otp_section").hide();
          $(".last_section").show();
          login_flag_res = "2";
          return;
        } else {
          storeData("customer_id", customer_id);
          storeData("customer_name", customer_name);
          storeData("customer_mobile_no", customer_mobile_no);
          storeData("customer_email", customer_email);
          window.location.reload();
        }
      }
    }
    if (login_flag_res === "2") {
      if ($.trim(user_name) === "" || $.trim(user_last) === "") {
        vaild = "1";
      }
      if (user_email != "") {
        if (!validateEmail(user_email)) {
          vaild = "1";
          handleError("Enter Vaild Email Id");
          return;
        }
      }

      if (!$("#user_checkbox").prop("checked")) {
        vaild = "1";
        handleError(
          "Please agree to the terms and conditions before proceeding."
        );
        return;
      }
    }

    if (vaild === "0") {
      setshowLoaderAdmin(true);
      const fd = new FormData();
      fd.append("owner_moblie_no_without_zip", userNumber);
      if (parseInt(login_flag_res) > 0) {
        fd.append("click_type", "1");
      } else {
        fd.append("click_type", login_flag_res);
      }
      fd.append("email_id", user_email);
      fd.append("owner_name", user_name);
      fd.append("owner_lname", user_last);
      await server_post_data(customer_login, fd)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            if (Response.data.message.data_customer.length > 0) {
              setpresentotp(Response.data.message.owner_otp);
              if (
                Response.data.message.data_customer[0].owner_fname === "" ||
                Response.data.message.data_customer[0].owner_fname === null
              ) {
                complete_status_one = "0";
              } else {
                complete_status_one = "1";
              }
              customer_id = Response.data.message.data_customer[0].primary_id;
              customer_name =
                Response.data.message.data_customer[0].owner_fname +
                " " +
                Response.data.message.data_customer[0].owner_lname;
              customer_mobile_no =
                Response.data.message.data_customer[0].owner_moblie_no;
              customer_email =
                Response.data.message.data_customer[0].owner_email;

              if (login_flag_res === "0") {
                $(".hide_ssection_profile").hide();
                $(".otp_section").show();
                login_flag_res = "1";
              } else {
                storeData("customer_id", customer_id);
                storeData("customer_name", customer_name);
                storeData("customer_mobile_no", customer_mobile_no);
                storeData("customer_email", customer_email);
                window.location.reload();
              }
            }
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    } else {
      if (login_flag_res === "0") {
        handleError("Enter Vaild Mobile No");
      } else if (login_flag_res === "1") {
        handleError("Enter Vaild OTP");
      } else {
        handleError("Enter Vaild Full name");
      }
    }
  };

  const confirmVIP = () => {
    removeData();
    navigate("/");
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);

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

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-lg">
          {!searchShow && (
            <Link
              className="nav-link navItem hideAfter991"
              aria-current="page"
              to="/registerMyVenue"
            >
              <img src={regMyVenuw} alt="regmyvenue" />
              <p>Register My Venue</p>
            </Link>
          )}
          <Link className="navbar-brand" to="/">
            <img src={mainLogo} alt="mainlogo" width={150} />
          </Link>
          {searchShow && (
            <Link className="navbar-brand width50 width70 hideAfter768">
              <SearchBar />
            </Link>
          )}

          <div className="d-flex gap-2">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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

                {!profileShow && (
                  <li className="nav-item">
                    <Link
                      className="nav-link navItem"
                      onClick={handleOpenLoginModal}
                    >
                      <p>Login</p>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {profileShow && (
              <div className="dropdown">
                <Link
                  className="nav-link navItem "
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div id="">
                    <img
                      src={make_image_from_letter(customer_name)}
                      onError={(e) => {
                        e.target.src = mainLogo; // Provide the path to your fallback image
                      }}
                      alt={customer_name}
                    />
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
                        confirmVIP();
                      }}
                    >
                      <img src={logout} alt="favIcon" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
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
          <div className="hide_ssection_profile">
            <h6>Enter your Phone Number</h6>
            <p>You will receive a text message to verify your account.</p>
            <PhoneInput
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="mt-2"
              defaultCountry="in"
              value={userNumber}
              onChange={(phone) => {
                setUserNumber(phone);
                setisPhoneNumberValid(phone.length >= 10);
              }}
            />
            <Button
              className="PhoneloginButton mt-5 width100per"
              onClick={() => login_section_res()}
              style={{
                backgroundColor: !isPhoneNumberValid ? "grey" : "",
                borderColor: !isPhoneNumberValid ? "grey" : "",
                cursor: !isPhoneNumberValid ? "not-allowed" : "pointer",
              }}
              disabled={!isPhoneNumberValid}
            >
              Continue
            </Button>
          </div>
          <div className="otp_section">
            <h6>Enter the OTP</h6>
            <p>Please enter the OTP sent to your phone.</p>
            <input
              type="text"
              id="opt_user"
              name="opt_user"
              placeholder="Enter verification code"
              className="mt-2 form-control border0"
              onInput={handleNumbersChange}
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setisisOTPValid(
                  parseInt(e.target.value) === parseInt(presentotp)
                );
              }}
            />
            <Button
              className="PhoneloginButton mt-5 width100per"
              onClick={() => login_section_res()}
              style={{
                backgroundColor: !isOTPValid ? "grey" : "",
                borderColor: !isOTPValid ? "grey" : "",
                cursor: !isOTPValid ? "not-allowed" : "pointer",
              }}
              disabled={!isOTPValid}
            >
              Continue
            </Button>
          </div>
          <div className="last_section">
            <h6>Welcome to Book My Venue </h6>
            <p>Create your account and quickly make a reservation </p>
            <form className="userRegistration_form">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="user_name"
                  name="user_name"
                  placeholder="First Name"
                  maxLength={50}
                  onInput={handleAphabetsChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="user_last"
                  name="user_last"
                  className="form-control"
                  placeholder="  Last Name"
                  maxLength={50}
                  onInput={handleAphabetsChange}
                />
              </div>
              <input
                type="text"
                id="user_email"
                name="user_email"
                className="form-control"
                placeholder="Email ID"
                maxLength={100}
                onInput={handleEmailChange}
              />
              <div className="mb-3 dfoodoterms_agreement ">
                <input
                  type="checkbox"
                  id="user_checkbox"
                  name="user_checkbox"
                  value="0"
                  className="wifth_chckbox"
                />
                <p>
                  I agree to Book My Venue Terms of Service Privacy Policy and
                  Content Policy
                </p>
              </div>
              <Button
                className="PhoneloginButton mt-5 width100per"
                onClick={() => login_section_res()}
                style={{
                  cursor: "pointer",
                }}
              >
                Complete Profile
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
