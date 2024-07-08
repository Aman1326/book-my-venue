import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Css/ProfilePage.css";
import { PhoneInput } from "react-international-phone";
import {
  check_vaild_save,
  combiled_form_data,
  handleError,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  update_profile,
  get_profile,
} from "../ServiceConnection/serviceconnection.js";
const ProfilePage = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [GetProfileData, SetProfileData] = useState([]);
  const [editProfileData, seteditProfileData] = useState([]);
  const [userNumber, setUserNumber] = useState("");
  const [dob, setDob] = useState([]);
  console.log(dob);
  useEffect(() => {
    const call_id = "16";
    master_data_get(call_id);
  }, []);

  const master_data_get = async (call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("call_id", "16");
    await server_post_data(get_profile, fd)
      .then((Response) => {
        console.log(Response.data.message.owner_data[0].owner_moblie_no);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditProfileData(Response.data.message.owner_data[0]);
          setUserNumber(Response.data.message.owner_data[0].owner_moblie_no);
          SetProfileData(Response.data.message);
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
  console.log(userNumber);
  const handleSaveChangesdynamic = async (form_data, update_profile) => {
    let vaild_data = check_vaild_save(form_data);
    // seterror_show("");

    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);
      const year = document.getElementById("year").value;
      const month = document.getElementById("month").value;
      const day = document.getElementById("day").value;
      const dob = `${year}-${month}-${day}`;
      fd_from.append("dob", dob);

      fd_from.append("main_id", editorDataMainID);
      fd_from.append("call_id", "16");
      await server_post_data(update_profile, fd_from)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
          setshowLoaderAdmin(false);
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = dob.split("-");
    const updatedDob = { year, month, day, [name]: value };
    setDob(`${updatedDob.year}-${updatedDob.month}-${updatedDob.day}`);
  };
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
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="venueLocation">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          name="lname"
                          className="form-control"
                          defaultValue={editProfileData.owner_lname || ""}
                        />
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
                        />
                      </div>
                      <div className="col-md-6 birth_date_profile">
                        <label className="mb-2">Date of Birth</label>
                        <div className="DOBCalander">
                          <select
                            id="day"
                            name="day"
                            className="form-control  custom-select"
                            defaultValue={dob.day || ""}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                          disabled
                        />
                      </div>
                      <div className="col-md-6 ">
                        <br />
                        <span className="radio_buttons_reg_form mt-2 ">
                          <input type="radio" id="1" name="gender" value="1" />
                          <label>Male</label>
                          <br />
                          <input type="radio" id="2" name="gender" value="2" />
                          <label>Female</label>
                          <br />
                          <input type="radio" id="3" name="gender" value="3" />
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
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleSaveChangesdynamic(
                              "UpateProfile",
                              update_profile
                            );
                          }}
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
        </div>
      </section>
      {/* <section className="footer_section_regmyvenue">
        <Footer />
      </section> */}
    </>
  );
};

export default ProfilePage;
