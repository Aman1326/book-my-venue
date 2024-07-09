import { useState, useEffect } from "react";
import Header from "./Header";
import { PhoneInput } from "react-international-phone";
import {
  combiled_form_data,
  handleError,
  handleSuccess,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  update_profile,
  get_profile,
} from "../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
let customer_id = "0";
const ProfilePage = () => {
  customer_id = retrieveData("customer_id");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  const [editProfileData, seteditProfileData] = useState([]);
  const [userNumber, setUserNumber] = useState("");
  const [dob, setDob] = useState([]);
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("call_id", customer_id);
    await server_post_data(get_profile, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditProfileData(Response.data.message.owner_data[0]);
          setUserNumber(
            Response.data.message.owner_data[0].owner_moblie_no_without_zip
          );

          const ownerData = Response.data.message.owner_data[0];
          if (ownerData.owner_dob) {
            setDob(ownerData.owner_dob);
          }
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleInputChange = (event) => {
    setFormChanged(true); // Set formChanged to true whenever there's an input change
  };
  const handleSaveChangesdynamic = async (form_data, update_profile) => {
    let isValid = true;

    // Check first name
    const firstName = document.getElementById("name").value.trim();
    if (!firstName) {
      document.getElementById("nameError").innerText =
        "Please enter the first name";
      isValid = false;
    } else {
      document.getElementById("nameError").innerText = "";
    }

    // Check last name
    const lastName = document.getElementById("lname").value.trim();
    if (!lastName) {
      document.getElementById("lnameError").innerText =
        "Please enter the last name";
      isValid = false;
    } else {
      document.getElementById("lnameError").innerText = "";
    }

    // Check email
    const email = document.getElementById("email").value.trim();
    if (!email) {
      document.getElementById("emailError").innerText =
        "Please enter the email";
      isValid = false;
    } else {
      document.getElementById("emailError").innerText = "";
    }

    // Check date of birth
    const day = document.getElementById("day").value.trim();
    const month = document.getElementById("month").value.trim();
    const year = document.getElementById("year").value.trim();
    if (!day || !month || !year) {
      document.getElementById("dobError").innerText =
        "Please enter the complete date of birth";
      isValid = false;
    } else {
      document.getElementById("dobError").innerText = "";
    }

    // Check gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      document.getElementById("genderError").innerText =
        "Please select a gender";
      isValid = false;
    } else {
      document.getElementById("genderError").innerText = "";
    }

    if (!isValid) {
      // Scroll to the top to show the error messages
      window.scrollTo(0, 0);
      return;
    }

    // Proceed with form submission
    let fd_from = combiled_form_data(form_data, null);
    const dobString = `${year}-${month}-${day}`;
    fd_from.append("dob", dobString);
    fd_from.append("call_id", customer_id);

    try {
      setshowLoaderAdmin(true);
      const response = await server_post_data(update_profile, fd_from);
      setshowLoaderAdmin(false);
      if (response.data.error) {
        handleError(response.data.message);
      } else {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setshowLoaderAdmin(false);
    }
  };

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

  return (
    <>
      <Header />
      <section className="container-lg">
        <div className="row">
          <div className="ProfileCont">
            <div className="col-lg-10">
              <div className="profile_section">
                <div className=" mt-3">
                  <div className="register-venue-form-heading">
                    <h2>My Profile</h2>
                    <p>Manage my personal Information </p>
                    <desc>
                      Your Contact information will be send to the Venue Owner
                      when you make a Enquiry
                    </desc>
                  </div>
                  <form
                    className="venue-registration-form profile_pafe_form"
                    id="UpateProfile"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="venueName">First Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          defaultValue={editProfileData.owner_fname || ""}
                          onChange={handleInputChange}
                        />
                        <span id="nameError" className="error-message"></span>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="venueLocation">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          name="lname"
                          className="form-control"
                          defaultValue={editProfileData.owner_lname || ""}
                          onChange={handleInputChange}
                        />
                        <span id="lnameError" className="error-message"></span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="contactPerson">Email</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          defaultValue={editProfileData.owner_email || ""}
                          onChange={handleInputChange}
                        />
                        <span id="emailError" className="error-message"></span>
                      </div>
                      <div className="col-md-6 birth_date_profile">
                        <label className="mb-2">Date of Birth</label>
                        <div className="DOBCalander">
                          <select
                            id="day"
                            name="day"
                            className="form-control  custom-select"
                            defaultValue={dob.day || ""}
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
                            defaultValue={dob.month || ""}
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
                            defaultValue={dob.year || ""}
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <span id="dobError" className="error-message"></span>
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
                          disabled
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Gender</label>
                        <span className="radio_buttons_reg_form mt-2 ">
                          <input
                            type="radio"
                            id="1"
                            name="gender"
                            value="Male"
                            defaultChecked={
                              editProfileData.owner_gender === "Male" || ""
                            }
                          />
                          <label>Male</label>
                          <br />
                          <input
                            type="radio"
                            id="2"
                            name="gender"
                            value="Female"
                            defaultChecked={
                              editProfileData.owner_gender === "Female" || ""
                            }
                          />
                          <label>Female</label>
                          <br />
                          <input
                            type="radio"
                            id="3"
                            name="gender"
                            value="Others"
                            defaultChecked={
                              editProfileData.owner_gender === "Others" || ""
                            }
                          />
                          <label>Others</label>
                        </span>
                        <span id="genderError" className="error-message"></span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 checkBox_registerMyVenue">
                        <br />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleSaveChangesdynamic(
                              "UpateProfile",
                              update_profile
                            );
                          }}
                          type="submit"
                          style={{ opacity: formChanged ? 1 : 0.5 }}
                          disabled={!formChanged}
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
        </div>
      </section>
      {/* <section className="footer_section_regmyvenue">
        <Footer />
      </section> */}
    </>
  );
};

export default ProfilePage;
