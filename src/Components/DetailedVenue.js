import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import Right from "../Assets/arrow6.svg";
import { Carousel } from "react-responsive-carousel";
import person from "../Assets/person.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import leftArrowCarausal from "../Assets/leftArrowCarausal.svg";
import crossIcon from "../Assets/crossIcon.svg";
import right from "../Assets/right_arrow.svg";
import Successs from "../Assets/check.png";
import Reviews from "./Reviews";
import BrowseCity from "./BrowseCity";
import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
import { Dropdown } from "primereact/dropdown";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PhoneInput } from "react-international-phone";
import home from "../Assets/home_backbtn.svg";
import rightgrey from "../Assets/right_arrow_grey.svg";
import backBtn from "../Assets/leftArrow_black.svg";
import $ from "jquery";
import {
  check_vaild_save,
  combiled_form_data,
  handleAphabetsChange,
  handleEmailChange,
  handleError,
  handleNumbersChange,
  validateMobile,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  save_enquiry_now,
  get_venue_details_url,
  customer_login,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import { retrieveData, storeData } from "../LocalConnection/LocalConnection.js";
let login_flag_res = "0";
let customer_id = "0";
let customer_name = "0";
let customer_mobile_no = "0";
let customer_email = "0";
const DetailedVenue = () => {
  customer_id = retrieveData("customer_id");
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const footerRef = useRef(null);
  const [otp, setOtp] = useState("");
  const [presentotp, setpresentotp] = useState("");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [VenueOwnerId, setVenueOwnerId] = useState("0");
  const [getEventsData, setEventsData] = useState([]);
  const [getEventTime, setEventTime] = useState([]);
  const [getGuestCapacity, setGuestCapacity] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [GetVenueReview, SetVenueReview] = useState([]);
  const [GetVenueImages, SetVenueImages] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    master_data_get();
  }, []);

  //in the enquiy mobile will hide when the footer willl show

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.6, // 10% of the footer must be visible to trigger the callback
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  const [selectedCardValue, setSelectedCardValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [userNumber, setUserNumber] = useState("");
  const [stepclick, setstepclick] = useState(0);
  const [enterGuest, setEnterGuest] = useState(false);
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(false);
  const [isOTPValid, setisisOTPValid] = useState(false);
  const [EventImageData, setEventImageData] = useState("");
  const [showCarousel, setShowCarousel] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const handleSelection = (valuedata) => {
    setstepclick(1);
    setSelectedCardValue(valuedata);
  };

  const handleDateSelection = (newValue) => {
    setSelectedDate(newValue);
    setstepclick(2);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setstepclick(3);
  };

  const handleGuestSelection = (guestOption) => {
    setSelectedGuestCount(guestOption);
    setstepclick(4);
  };

  const setstepcount = (count_no) => {
    setstepclick(count_no);
  };

  const handleManualGuestInput = () => {
    const inputValue = document.getElementById("guestCountInput").value;
    if (inputValue !== "") {
      setEnterGuest(false);
      handleGuestSelection(inputValue);
    } else {
      setEnterGuest(true);
    }
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    const dateObject = new Date(selectedDate.$d);
    const formattedDate = dateObject.toISOString().split("T")[0];

    if (vaild_data) {
      if (validateMobile(userNumber)) {
        if (parseInt(customer_id) > 0) {
          setshowLoaderAdmin(true);
          let user_email = $("#admin_email").val();
          let user_name = $("#admin_name").val();
          let fd_from = combiled_form_data(form_data, null);
          fd_from.append("venue_id", editorDataMainID);
          fd_from.append("category_id", selectedCardValue.primary_id);
          fd_from.append("venue_owner_id", VenueOwnerId);
          fd_from.append("guest_capacity", selectedGuestCount);
          fd_from.append("person_name", user_name);
          fd_from.append("event_date", formattedDate);
          fd_from.append("mobile_no", userNumber);
          fd_from.append("from", selectedTime.start_time);
          fd_from.append("to", selectedTime.end_time);
          fd_from.append("email_id", user_email);
          fd_from.append("type", "Enquiry");
          fd_from.append("status", "none");
          fd_from.append("customer_id", customer_id);
          fd_from.append("lead_source", "Website");
          fd_from.append("admin_id", "0");
          await server_post_data(url_for_save, fd_from)
            .then((Response) => {
              setshowLoaderAdmin(false);
              if (Response.data.error) {
                alert(Response.data.message);
              } else {
                setstepclick(5);
              }
            })
            .catch((error) => {
              setshowLoaderAdmin(false);
            });
        } else {
          login_section_res();
        }
      } else {
        alert("Please Enter Valid Mobile No");
      }
    }
  };

  const login_section_res = async () => {
    let vaild = "0";
    let login_otp = $("#opt_user").val();
    let user_email = $("#admin_email").val();
    let user_name = $("#admin_name").val();

    if (login_flag_res === "1") {
      if (parseInt(login_otp) === "") {
        vaild = "1";
      } else if (parseInt(login_otp) !== parseInt(presentotp)) {
        vaild = "1";
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

      await server_post_data(customer_login, fd)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            if (Response.data.message.data_customer.length > 0) {
              setpresentotp(Response.data.message.owner_otp);

              if (login_flag_res === "0") {
                login_flag_res = "1";
                $(".hide_ssection_profile").hide();
                $(".otp_section").show();
              } else if (login_flag_res === "1") {
                customer_id = Response.data.message.data_customer[0].primary_id;
                customer_name =
                  Response.data.message.data_customer[0].owner_fname +
                  " " +
                  Response.data.message.data_customer[0].owner_lname;
                customer_mobile_no =
                  Response.data.message.data_customer[0].owner_moblie_no;
                customer_email =
                  Response.data.message.data_customer[0].owner_email;
                storeData("customer_id", customer_id);
                storeData("customer_name", customer_name);
                storeData("customer_mobile_no", customer_mobile_no);
                storeData("customer_email", customer_email);
                handleSaveChangesdynamic("vanueregistration", save_enquiry_now);
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setshowLoaderAdmin(false);
        });
    }
  };

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    await server_post_data(get_venue_details_url, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          if (Response.data.message.venue.length > 0) {
            SetVenueData(Response.data.message.venue[0]);
            SetVenueReview(Response.data.message.reviews_active_data);
            SetVenueImages(Response.data.message.venue[0].images);
            setEditorDatMainID(Response.data.message.venue[0].primary_id);
            setVenueOwnerId(Response.data.message.venue[0].primary_id);
            setEventsData(Response.data.message.data_category_list);
            setEventTime(Response.data.message.time_options);
            setGuestCapacity(Response.data.message.guest_options);
            setEventImageData(Response.data.message.data_eventlisting_image);
          }
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };
  // react tabs:
  const [activeTab, setActiveTab] = useState("about");

  //readmore section:
  function ReadMore() {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    const text = GetVenueData.description;

    const maxLength = 500; // Set the number of characters for the truncated text

    return (
      <div className="read-more-section ">
        {text && text.length > 0 && (
          <p>
            {isReadMore
              ? `${text.slice(0, maxLength)}${text.length > 500 ? "..." : ""}`
              : text}
            {text.length > 500 && (
              <span
                onClick={toggleReadMore}
                className="read-more-toggle"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              >
                {isReadMore ? "Read more" : "Show less"}
              </span>
            )}
          </p>
        )}
      </div>
    );
  }

  const handleViewMoreClick = () => {
    setShowCarousel(true);
  };

  const handleCloseCarousel = () => {
    setShowCarousel(false);
  };
  const handleNext = () => {
    const totalSlides = 3;
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    const totalSlides = 3;
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="detailed_venue_wrapper">
        <Header />
        <div className="searchBarContainer d-md-none">
          <SearchBar />
        </div>
        <section>
          <div className="container-md mt-3 mb-3">
            <div className="venuePage_venueCategory_heading">
              <Link to="/">
                <img src={home} alt="hdbhjb" width={"14px"} />
              </Link>{" "}
              <img src={rightgrey} alt="right" />
              <Link to="/venue">{GetVenueData.city}</Link>
              <img src={rightgrey} alt="right" />
              <Link>{GetVenueData.venue_name}</Link>
            </div>
          </div>
        </section>
        {/* images gallery section */}
        <section className="image_gallery_section">
          <div className="container-md">
            <div className="row height50vh">
              {GetVenueImages && GetVenueImages.length > 0 && (
                <>
                  <div className="col-lg-8 col-sm-6 col-6 m-0 p-0 height50vh">
                    <img
                      className="image1Veiw"
                      src={
                        APL_LINK + EventImageData + GetVenueImages[0].image_name
                      }
                      alt="features.venue_feature_name"
                    />
                  </div>
                  <div className="col-lg-2 col-3 m-0 p-0 imagegallery_verticle_images">
                    <img
                      src={
                        APL_LINK + EventImageData + GetVenueImages[1].image_name
                      }
                      alt="features.venue_feature_name"
                    />
                    <img
                      src={
                        APL_LINK + EventImageData + GetVenueImages[2].image_name
                      }
                      alt="features.venue_feature_name"
                    />
                  </div>
                  <div className="col-lg-2 col-3 m-0 p-0 view_more_image_wrapper">
                    <Link onClick={handleViewMoreClick}>
                      <img
                        src={
                          APL_LINK +
                          EventImageData +
                          GetVenueImages[3].image_name
                        }
                        alt="features.venue_feature_name"
                      />
                      <p>View More</p>
                    </Link>
                  </div>
                </>
              )}
            </div>
            {showCarousel && (
              <div className="carousel_overlay">
                <div className="col-lg-10 m-auto d-flex alig-items-center justify-content-center">
                  <div className="carousel_container">
                    <button
                      className="close_button"
                      onClick={handleCloseCarousel}
                    >
                      &times;
                    </button>
                    <Carousel
                      selectedItem={currentSlide}
                      onChange={(index) => setCurrentSlide(index)}
                    >
                      {GetVenueImages &&
                        GetVenueImages.length > 0 &&
                        GetVenueImages.map((image, index) => (
                          <div className="causelImgsRadius" key={index}>
                            <img
                              src={APL_LINK + EventImageData + image.image_name}
                              alt="img1"
                            />
                          </div>
                        ))}
                    </Carousel>
                    <div className="ModalArrows">
                      {" "}
                      <button
                        className="carousel_control left"
                        onClick={handlePrev}
                      >
                        <img src={leftArrowCarausal}></img>
                      </button>
                      <button
                        className="carousel_control right"
                        onClick={handleNext}
                      >
                        <img
                          className="rightArrow"
                          src={leftArrowCarausal}
                        ></img>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="venue_tags_section">
          <div className="container-md">
            <div className="venue_tags_container">
              {GetVenueData.catagory_datas &&
                GetVenueData.catagory_datas.length > 0 &&
                GetVenueData.catagory_datas.map((tag, index) => (
                  <div key={index} className="venue_tag">
                    {tag.sub_category_name}
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="venue_about_section">
          <div className="container-md">
            <div className="row m-0">
              <div className="tab-content col-xl-8 col-lg-7">
                <div className="tab-buttons col-md-8 sticky-container">
                  <button
                    className={activeTab === "about" ? "active" : ""}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </button>
                  <button
                    className={activeTab === "reviews" ? "active" : ""}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>
                {activeTab === "about" && (
                  <div className="about_venue_tabContent otherContent">
                    <h2 className="m-0">{GetVenueData.venue_name}</h2>
                    <p className="m-0">{GetVenueData.type_address}</p>
                    <span className="venuePage_venue_capacity_wrapper">
                      <img src={person} alt="person" />
                      <p>{GetVenueData.guests_capacity} Max. Capacity</p>
                    </span>
                    <h6>About this venue</h6>
                    <ReadMore />
                    <div className="venue_features_section row">
                      {GetVenueData.amenities &&
                        GetVenueData.amenities.length > 0 &&
                        GetVenueData.amenities.map((features, idx) => (
                          <div className="col-xl-3 col-4" key={idx}>
                            <div className="venue_features_wrapper">
                              <img
                                src={APL_LINK + EventImageData + features.image}
                                alt={features.venue_feature_name}
                              />
                              <p className="venue_feature_name">
                                {features.name}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <section className="Reviews_section d-none d-md-block">
                      <Reviews tabOpen={activeTab} review={GetVenueReview} />
                      <div className="see_more_reviews">
                        <Link onClick={() => setActiveTab("reviews")}>
                          See more reviews ({GetVenueData.total_reviews})
                          <img src={right} alt="right" />
                        </Link>
                      </div>
                    </section>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="otherContent">
                    <Reviews tabOpen={activeTab} review={GetVenueReview} />
                  </div>
                )}
              </div>
              <div
                id="enquiryButtonMobile"
                className="EquiryButtonMobile"
                style={{ display: isFooterVisible ? "none" : " " }}
              >
                <button onClick={toggleModal}>Enquiry</button>
              </div>

              <div className="col-xl-4 col-lg-5 col-md-6 sticky-container">
                <form id="vanueregistration">
                  <div
                    className={
                      isMobile
                        ? `calenday_modelContainermobile ${
                            isModalVisible ? "show" : ""
                          }`
                        : `calenday_modelContainer ${
                            isModalVisible ? "show" : ""
                          }`
                    }
                  >
                    <div className="MobileCrossButton">
                      {" "}
                      <button onClick={closeModal} style={{ border: "none " }}>
                        <img src={crossIcon} alt="crossicon"></img>{" "}
                      </button>
                    </div>

                    <div className="calenday_model-section">
                      <div className="calendy_modelHead">
                        {/* <p>Avg. Price ₹120000</p> */}
                        <h4>Enquiry Now</h4>
                      </div>
                    </div>
                    <div className="calenday_modelSubHead">
                      {stepclick === 0 && <p>Selection Occasion</p>}
                      {stepclick === 1 && <p>Selection Date</p>}
                      {stepclick === 2 && (
                        <p>
                          What Time is your{" "}
                          {selectedCardValue.category_master_name}
                        </p>
                      )}
                      {stepclick === 3 && (
                        <p>
                          How many guests do you expect for your{" "}
                          {selectedCardValue.category_master_name}
                        </p>
                      )}
                      {stepclick === 4 && (
                        <p>Please Enter Your Details to Get A Quote</p>
                      )}
                    </div>
                    <div className="calenday_modelScreen">
                      {stepclick === 0 && (
                        <div className="eventSelect">
                          <div className="row">
                            {getEventsData.map((option, index) => {
                              if (option.event_list_front === "1") {
                                return (
                                  <div
                                    key={index}
                                    className="col-4"
                                    onClick={() => handleSelection(option)}
                                  >
                                    <div className={`slctOcsnCard `}>
                                      <div className="slctOcsnCardimg">
                                        <img
                                          src={
                                            APL_LINK +
                                            EventImageData +
                                            option.category_master_image2
                                          }
                                          alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                        />
                                      </div>
                                      <div className="slctOcsnCardTxt">
                                        <p>{option.category_master_name}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <div className="eventDropdown">
                            <Dropdown
                              value={
                                selectedCardValue
                                  ? selectedCardValue.category_master_name
                                  : null
                              }
                              onChange={(e) => handleSelection(e.value)}
                              options={getEventsData.filter(
                                (option) => option.event_list_front === "0"
                              )}
                              optionLabel="category_master_name"
                              placeholder="Others"
                              className="ocsnDopdown"
                              appendTo={document.body}
                            />
                          </div>
                        </div>
                      )}
                      {stepclick === 1 && (
                        <div className="calenderDiv">
                          <span
                            className="backBtn mb-2"
                            style={{
                              display: "flex",
                              gap: "0.2rem",
                              margin: "0rem",
                              cursor: "pointer",
                              marginRight: "auto",
                            }}
                            onClick={() => {
                              setstepcount(0);
                            }}
                          >
                            <img src={backBtn} alt="backBtn" />
                            Back
                          </span>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                              value={dayjs()}
                              onChange={(newValue) =>
                                handleDateSelection(newValue)
                              }
                              minDate={dayjs()}
                            />
                          </LocalizationProvider>
                        </div>
                      )}
                      {stepclick === 2 && (
                        <div className="selectTime">
                          <div className="row">
                            <span
                              className="backBtn mb-2"
                              style={{
                                display: "flex",
                                gap: "0.2rem",
                                margin: "0rem",
                                cursor: "pointer",
                                marginRight: "auto",
                              }}
                              onClick={() => {
                                setstepcount(1);
                              }}
                            >
                              <img src={backBtn} alt="backBtn" />
                              Back
                            </span>
                            {getEventTime.map((period, index) => (
                              <div className="col-6" key={index}>
                                <div className="timeBox">
                                  <h6>{period.label}</h6>
                                  <div
                                    className="timingLabels"
                                    onClick={() => handleTimeSelection(period)}
                                  >
                                    {" "}
                                    <p>{period.start_time}</p>
                                    <p>{period.end_time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {stepclick === 3 && (
                        <div className="selectTime">
                          <div className="row">
                            <span
                              className="backBtn mb-2"
                              style={{
                                display: "flex",
                                gap: "0.2rem",
                                margin: "0rem",
                                cursor: "pointer",
                                marginRight: "auto",
                              }}
                              onClick={() => {
                                setstepcount(2);
                              }}
                            >
                              <img src={backBtn} alt="backBtn" />
                              Back
                            </span>
                            {getGuestCapacity.map((period, index) => (
                              <div className="col-6" key={index}>
                                <div
                                  className="timeBox personBox"
                                  onClick={() =>
                                    handleGuestSelection(period.guest_no)
                                  }
                                >
                                  <h6>{period.range}</h6>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="gCountInput">
                            <input
                              id="guestCountInput"
                              type="text"
                              placeholder="Enter No of Guests Manually"
                              onInput={handleNumbersChange}
                              maxLength="6"
                            />
                            <div
                              className="gCountInputImg"
                              onClick={handleManualGuestInput}
                            >
                              <img src={Right} alt="bookmyvenue" />
                            </div>
                          </div>
                          {enterGuest && (
                            <p className="condition_error">
                              Please select number of guests or enter manually.
                            </p>
                          )}
                        </div>
                      )}
                      {stepclick === 4 && (
                        <div className="personInfo">
                          <div className="hide_ssection_profile">
                            <input
                              type="name"
                              name="admin_name"
                              id="admin_name"
                              maxLength={50}
                              onInput={handleAphabetsChange}
                              placeholder="Enter Your Name"
                              className="mt-2 form-control  trio_mandatory trio_name border0"
                            />
                            <PhoneInput
                              id="phone"
                              name="phone"
                              placeholder="Phone Number"
                              className="mt-2 border0"
                              defaultCountry="in"
                              value={userNumber}
                              onChange={(phone) => {
                                setUserNumber(phone);
                                setisPhoneNumberValid(phone.length >= 10);
                              }}
                            />
                            <input
                              type="text"
                              name="admin_email"
                              id="admin_email"
                              placeholder="Enter Email ID "
                              className="mt-2 form-control border0"
                              maxLength={100}
                              onInput={handleEmailChange}
                            />
                          </div>
                          <div className="varifuy otp_section">
                            <h6>Verify It’s you</h6>
                            <p className="sentOtp">
                              we’ve Sent a code to <span>{userNumber}</span>.
                              Enter the code to continue
                            </p>
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
                                  parseInt(e.target.value) ===
                                    parseInt(presentotp)
                                );
                                console.log(
                                  e.target.value + "===" + presentotp
                                );
                              }}
                            />
                          </div>
                          <button
                            className="PhoneloginButton hide_ssection_profile"
                            type="button"
                            style={{
                              backgroundColor: !isPhoneNumberValid
                                ? "grey"
                                : "",
                              borderColor: !isPhoneNumberValid ? "grey" : "",
                              cursor: !isPhoneNumberValid
                                ? "not-allowed"
                                : "pointer",
                            }}
                            disabled={!isPhoneNumberValid}
                            onClick={() =>
                              handleSaveChangesdynamic(
                                "vanueregistration",
                                save_enquiry_now
                              )
                            }
                          >
                            Continue
                          </button>
                          <button
                            className="PhoneloginButton otp_section"
                            type="button"
                            style={{
                              backgroundColor: !isOTPValid ? "grey" : "",
                              borderColor: !isOTPValid ? "grey" : "",
                              cursor: !isOTPValid ? "not-allowed" : "pointer",
                            }}
                            disabled={!isOTPValid}
                            onClick={() => login_section_res()}
                          >
                            Match OTP
                          </button>
                        </div>
                      )}
                      {stepclick === 5 && (
                        <div className="thankYou">
                          <img src={Successs} alt="success-icon" />
                          <h6>
                            Thank your for your interest our Team will connect
                            to you Soon
                          </h6>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section>
          <BrowseCity />
        </section>
        <section className="mt-5">
          <ListYourVenue />
        </section>
        <div id="footerSection" className="fooTer" ref={footerRef}>
          {" "}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DetailedVenue;
