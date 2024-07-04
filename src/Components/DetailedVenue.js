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
  server_post_data,
  get_venue_details_url,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import { handleError } from "../CommonJquery/CommonJquery.js";
const DetailedVenue = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmailLoginModal, setShowEmailLoginModal] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // State to toggle between phone and email
  const [userNumber, setUserNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [searchShow, setsearchShow] = useState(false);
  const [thankYouOpen, setthankYouOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State to manage OTP view
  const [otp, setOtp] = useState(""); // State to manage the entered OTP
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
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

  const eventData = [
    { label: "Conference" },
    { label: "Workshop" },
    { label: "Seminar" },
    { label: "Meetup" },
    { label: "Retreat" },
    { label: "Exhibition" },
  ];

  const events = [
    {
      label: "Wedding",
      image: Weeding,
    },
    {
      label: "Event",
      image: Event,
    },
    {
      label: "Engagement",
      image: Engagement,
    },
    {
      label: "Birthday",
      image: Birthday,
    },
    {
      label: "Yoga",
      image: Yoga,
    },
    {
      label: "Photoshoot",
      image: Photoshoot,
    },
  ];

  const timePeriods = [
    {
      label: "Early Morning",
      startTime: "5:00 AM",
      endTime: "7:00 AM",
    },
    {
      label: "Morning",
      startTime: "7:00 AM",
      endTime: "11:00 AM",
    },
    {
      label: "Afternoon",
      startTime: "12:00 PM",
      endTime: "3:30 PM",
    },
    {
      label: "Evening",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
    },
    {
      label: "Night",
      startTime: "7:00 PM",
      endTime: "12:00 AM", // technically next day, consider wrapping around
    },
    {
      label: "Midnight",
      startTime: "12:00 AM",
      endTime: "3:00 AM",
    },
  ];

  const numberRanges = [
    {
      label: "Less than 100",
    },
    {
      label: "100-200",
    },
    {
      label: "200-300",
    },
    {
      label: "300-400",
    },
    {
      label: "400-500",
    },
    {
      label: "Above 500",
    },
  ];

  const [eventSelected, setEventSelected] = useState(null);

  const handleSelection = (selectedValue) => {
    setEventSelected(selectedValue);
  };

  const [value, setValue] = useState(dayjs()); // Initialize with today's date or any initial value
  const handleDateSelection = (newValue) => {
    setValue(newValue); // Update state with selected date
  };

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
                    {step === 2 && <p>What Time is your {selectedCardValue}</p>}
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
                          {events.map((event, index) => (
                            <div key={index} className="col-4">
                              <div
                                className="eventBox"
                                onClick={() => {
                                  setSelectedCardValue(event.label);
                                  setStep(1);
                                }}
                              >
                                <img src={event.image} alt={event.label} />
                                <p>{event.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="eventDropdown">
                          <Dropdown
                            value={eventSelected}
                            onChange={(e) => {
                              handleSelection(e.value);
                              setStep(2);
                            }}
                            options={eventData}
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
                            onChange={() => {
                              handleDateSelection();
                              setStep(2);
                            }}
                            minDate={dayjs()} // Optional: Set minimum selectable date
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
                          {timePeriods.map((period, index) => (
                            <div className="col-6" key={index}>
                              <div
                                className="timeBox"
                                onClick={() => {
                                  setSelectedTime(period.label);
                                  setStep(3);
                                }}
                              >
                                <h6>{period.label}</h6>
                                <p>
                                  {period.startTime} to {period.endTime}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div className="col-12">
                            <div
                              className="timeBox"
                              onClick={() => {
                                setSelectedTime("Full Day");
                                setStep(3);
                              }}
                            >
                              <h6>Full Day</h6>
                              <p>6:00 AM to 12:00 AM</p>
                            </div>
                          </div>
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
                          {numberRanges.map((period, index) => (
                            <div className="col-6" key={index}>
                              <div
                                className="timeBox personBox"
                                onClick={() => {
                                  setSelectedGuestCount(period.label);
                                  setStep(4);
                                }}
                              >
                                <h6>{period.label}</h6>
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
                              id="name"
                              name="name"
                              placeholder="Enter Your Name"
                              className="mt-2 form-control border0"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                            <PhoneInput
                              id="phone"
                              name="phone"
                              placeholder="Phone Number"
                              className="mt-2 border0"
                              defaultCountry="in"
                              value={userNumber}
                              onChange={(phone) => setUserNumber(phone)}
                            />
                            <input
                              type="email"
                              id="email"
                              name="email"
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
                          Thank your for your interest our Team will connect to
                          you Soon
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
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
