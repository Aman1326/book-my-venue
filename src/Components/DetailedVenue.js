import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import img1 from "../Assets/imageGallery3.png";
import img2 from "../Assets/imageGallery1.png";
import img3 from "../Assets/imageGallery2.png";
import img4 from "../Assets/view_more_image.png";
import { Carousel } from "react-responsive-carousel";
import person from "../Assets/person.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import featureImg1 from "../Assets/featureImg1.svg";
import featureImg2 from "../Assets/featureImg2.svg";
import featureImg3 from "../Assets/featureImg3.svg";
import featureImg4 from "../Assets/featureImg.svg";
import featureImg5 from "../Assets/featureImg5.svg";
import featureImg6 from "../Assets/featureImg6.svg";
import featureImg7 from "../Assets/featureImg7.svg";
import featureImg8 from "../Assets/featureImg8.svg";
import leftArrowCarausal from "../Assets/leftArrowCarausal.svg";
import crossIcon from "../Assets/crossIcon.svg";
import right from "../Assets/right_arrow.svg";
import Weeding from "../Assets/wedding.png";
import Event from "../Assets/event.png";
import Engagement from "../Assets/engagment.png";
import Birthday from "../Assets/birthday.png";
import Yoga from "../Assets/yoga.png";
import Photoshoot from "../Assets/photoshoot.png";
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
import {
  check_vaild_save,
  combiled_form_data,
  handleError,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  save_enquiry_now,
  get_enquiry_now,
  get_venue_details_url,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
const DetailedVenue = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [thankYouOpen, setthankYouOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState("");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [getEventsData, setEventsData] = useState([]);
  const [getEventTime, setEventTime] = useState([]);
  const [getGuestCapacity, setGuestCapacity] = useState([]);

  //get data
  useEffect(() => {
    const flag = "1";

    master_data_get_enquiy("", "", flag, "");
  }, []);
  const master_data_get_enquiy = async (flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    await server_post_data(get_enquiry_now, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setEventsData(Response.data.message.data_category_list);
          setEventTime(Response.data.message.time_options);
          setGuestCapacity(Response.data.message.guest_options);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleSaveChangesdynamic = async (form_data, save_enquiry_now) => {
    let vaild_data = check_vaild_save(form_data);
    // seterror_show("");

    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);

      // Append selectedValues to fd_from
      let currentPath = window.location.pathname;
      let pathParts = currentPath.split("/");
      let id = pathParts[pathParts.length - 1];

      fd_from.append("venue_id", id);
      fd_from.append("category_id", selectedValues.category_id);
      fd_from.append("event_date", selectedValues.event_date);
      fd_from.append("guest_capacity", selectedValues.guest_capacity);
      fd_from.append("from", `start_time: ${selectedValues.from}`);
      fd_from.append("to", `end_time: ${selectedValues.to}`);
      fd_from.append("person_name", userName);
      fd_from.append("mobile_no", userNumber);
      fd_from.append("email_id", userEmail);

      await server_post_data(save_enquiry_now, fd_from)
        .then((Response) => {
          console.log(Response);
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            // Handle success scenario if needed
          }
        })
        .catch((error) => {
          console.log(error);
          setshowLoaderAdmin(false);
        });
    }
  };

  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [GetVenueReview, SetVenueReview] = useState([]);
  const [GetVenueImages, SetVenueImages] = useState([]);

  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    await server_post_data(get_venue_details_url, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          SetVenueData(Response.data.message.venue[0]);
          SetVenueReview(Response.data.message.reviews_active_data);
          SetVenueImages(Response.data.message.venue[0].images);
          console.log(Response.data.message.venue[0].images);
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
  //  array for venue features:
  const features_venue = [
    {
      venue_feature_image: featureImg1,
      venue_feature_name: "Buffet",
    },
    {
      venue_feature_image: featureImg2,
      venue_feature_name: "Coffee",
    },
    {
      venue_feature_image: featureImg3,
      venue_feature_name: "Pets Allowed",
    },
    {
      venue_feature_image: featureImg4,
      venue_feature_name: "Rooftop ",
    },
    {
      venue_feature_image: featureImg5,
      venue_feature_name: "Garden",
    },
    {
      venue_feature_image: featureImg6,
      venue_feature_name: "Bridal Suite",
    },
    {
      venue_feature_image: featureImg7,
      venue_feature_name: "Catering",
    },
    {
      venue_feature_image: featureImg8,
      venue_feature_name: "Outdoors ",
    },
  ];
  const [eventSelected, setEventSelected] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    category_id: "",
    event_date: "",
    from: "",
    to: "",
    guest_capacity: "",
  });

  const handleSelection = (
    selectedValue,
    field,
    labelWithTimes,
    timeValue,
    timeField
  ) => {
    setEventSelected(selectedValue);
    setSelectedValues((prev) => ({
      ...prev,
      [field]: selectedValue,
      ...(timeField ? { [timeField]: timeValue } : {}),
    }));

    // Append labelWithTimes to your form data

    console.log({
      ...selectedValues,
      [field]: selectedValue,
      label_with_times: labelWithTimes,
    });
  };

  const [value, setValue] = useState(dayjs());
  const handleDateSelection = (newValue) => {
    setValue(newValue); // Update state with selected date
  };

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
    setthankYouOpen(true);
  };
  const isPhoneNumberValid = userNumber.length >= 10;
  const isEmailValid = userEmail.includes("@");

  // user registration modal after logging in after phone otp
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowRegistrationModal = () => setShowRegistrationModal(true);

  // states for calendar model:
  const [selectedCardValue, setSelectedCardValue] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

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
              <Link to="/venue">Bhopal</Link>
              <img src={rightgrey} alt="right" />
              <Link>TT nagar</Link>
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
                      src={APL_LINK + "/assets/" + GetVenueImages[0].image_name}
                      alt="features.venue_feature_name"
                    />
                  </div>
                  <div className="col-lg-2 col-3 m-0 p-0 imagegallery_verticle_images">
                    <img
                      src={APL_LINK + "/assets/" + GetVenueImages[1].image_name}
                      alt="features.venue_feature_name"
                    />
                    <img
                      src={APL_LINK + "/assets/" + GetVenueImages[2].image_name}
                      alt="features.venue_feature_name"
                    />
                  </div>
                  <div className="col-lg-2 col-3 m-0 p-0 view_more_image_wrapper">
                    <Link to="" onClick={handleViewMoreClick}>
                      <img
                        src={
                          APL_LINK + "/assets/" + GetVenueImages[3].image_name
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
                              src={APL_LINK + "/assets/" + image.image_name}
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
                <div className="tab-buttons col-md-8">
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
                  <div className="about_venue_tabContent">
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
                                src={APL_LINK + "/assets/" + features.image}
                                alt="{features.venue_feature_name}"
                              />
                              <p className="venue_feature_name">
                                {features.amenities_name}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <section className="Reviews_section d-none d-md-block">
                      <Reviews tabOpen={activeTab} review={GetVenueReview} />
                      <div className="see_more_reviews">
                        <Link onClick={() => setActiveTab("reviews")}>
                          See more reviews (2083)
                          <img src={right} alt="right" />
                        </Link>
                      </div>
                    </section>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div>
                    <Reviews />
                  </div>
                )}
              </div>
              <div className="EquiryButtonMobile">
                <button onClick={toggleModal}>Enquiry</button>
              </div>

              <div className="col-xl-4 col-lg-5 col-md-6">
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
                      {step === 0 && <p>Selection Occasion</p>}
                      {step === 1 && <p>Selection Date</p>}
                      {step === 2 && (
                        <p>What Time is your {selectedCardValue}</p>
                      )}
                      {step === 3 && (
                        <p>
                          How many guests do you expect for your{" "}
                          {selectedCardValue}
                        </p>
                      )}
                      {step === 4 && (
                        <p>Please Enter Your Details to Get A Quote</p>
                      )}
                    </div>
                    <div className="calenday_modelScreen">
                      {step === 0 && (
                        <div className="eventSelect">
                          <div className="row">
                            {getEventsData.slice(0, 9).map((event, index) => (
                              <div key={index} className="col-4">
                                <div
                                  className="eventBox"
                                  onClick={() => {
                                    handleSelection(
                                      event.primary_id,
                                      "category_id"
                                    );
                                    setStep(1);
                                  }}
                                >
                                  <img
                                    src={
                                      APL_LINK +
                                      "/assets/" +
                                      event.category_master_image
                                    }
                                    alt={event.category_master_image}
                                  />
                                  <p>{event.category_master_name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="eventDropdown">
                            <Dropdown
                              value={eventSelected}
                              onChange={(e) => {
                                setEventSelected(e.value);
                                handleSelection(e.value, "category_id");
                                setStep(2);
                              }}
                              options={getEventsData.map((event) => ({
                                label: event.category_master_name,
                                value: event.category_master_name,
                              }))}
                              optionLabel="label"
                              placeholder="Others"
                              className="ocsnDopdown"
                            />
                          </div>
                        </div>
                      )}
                      {step === 1 && (
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
                              setStep(0);
                            }}
                          >
                            <img src={backBtn} alt="backBtn" />
                            Back
                          </span>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                              value={value}
                              onChange={(newDate) => {
                                const dateObject = new Date(newDate);
                                const day = dateObject
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0");
                                const month = (dateObject.getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0");
                                const year = dateObject
                                  .getFullYear()
                                  .toString()
                                  .slice(-2);

                                const formattedDate = `${day}-${month}-${year}`;

                                handleSelection(formattedDate, "event_date");
                                setStep(2);
                              }}
                              minDate={dayjs()}
                            />
                          </LocalizationProvider>
                        </div>
                      )}
                      {step === 2 && (
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
                                setStep(1);
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
                                    onClick={() => {
                                      handleSelection(
                                        period.start_time,
                                        period.end_time,
                                        "from",
                                        "to"
                                      );
                                      setStep(3);
                                    }}
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
                      {step === 3 && (
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
                                setStep(2);
                              }}
                            >
                              <img src={backBtn} alt="backBtn" />
                              Back
                            </span>
                            {getGuestCapacity.map((period, index) => (
                              <div className="col-6" key={index}>
                                <div
                                  className="timeBox personBox"
                                  onClick={() => {
                                    handleSelection(
                                      period.guest_no,
                                      "guest_capacity"
                                    );
                                    setStep(4);
                                  }}
                                >
                                  <h6>{period.range}</h6>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {step === 4 && (
                        <div className="personInfo">
                          {!otpSent ? (
                            <>
                              <input
                                type="name"
                                id="person_name"
                                name="person_name"
                                placeholder="Enter Your Name"
                                className="mt-2 form-control border0"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                              <PhoneInput
                                id="mobile_no"
                                name="mobile_no"
                                placeholder="Phone Number"
                                className="mt-2 border0"
                                defaultCountry="in"
                                value={userNumber}
                                onChange={(phone) => setUserNumber(phone)}
                              />
                              <input
                                type="email"
                                id="email_id"
                                name="email_id"
                                placeholder="Enter Email ID "
                                className="mt-2 form-control border0"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                              />
                            </>
                          ) : (
                            <div className="varifuy">
                              <h6>Verify It’s you</h6>
                              <p className="sentOtp">
                                we’ve Sent a code to <span>{userNumber}</span>.
                                Enter the code to continue
                              </p>
                              <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter verification code"
                                className="mt-2 form-control border0"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                            </div>
                          )}
                          {!otpSent ? (
                            <button
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
                            </button>
                          ) : (
                            <button
                              className="PhoneloginButton"
                              onClick={() => {
                                handleOtpSubmit();
                                handleShowRegistrationModal();
                                handleSaveChangesdynamic(
                                  "vanueregistration",
                                  save_enquiry_now
                                );
                                setStep(5);
                              }}
                              style={{
                                backgroundColor: otp.length < 4 ? "grey" : "",
                                borderColor: otp.length < 4 ? "grey" : "",
                                cursor:
                                  otp.length < 4 ? "not-allowed" : "pointer",
                              }}
                              disabled={otp.length < 4}
                            >
                              Confirm OTP
                            </button>
                          )}
                        </div>
                      )}
                      {step === 5 && (
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
        <Footer />
      </div>
    </>
  );
};

export default DetailedVenue;
