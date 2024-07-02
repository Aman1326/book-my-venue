import React, { useState } from "react";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link } from "react-router-dom";
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

  const Venue_tags = [
    "Wedding ",
    "Engagement",
    "Corporate Event",
    "Birthday Party",
  ];
  // react tabs:
  const [activeTab, setActiveTab] = useState("about");

  //readmore section:
  function ReadMore() {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    const text =
      "Airport City Hotel, Jessore Road, Kolkata, is a perfect venue to host your social and corporate events. It is located off Jessore Road, within the locale of Khalisha Kota. It is also close to the Airport City Phase I, which is well-known among the locals How to Reach Airport City Hotel Placed off Jessore Road, Kolkata Airport Hotel is 12 minutes away from Durganagar Railway Station, 10 minutes away from Noapara Metro Station, and about 25 minutes away from Netaji Subhash Chandra Bose International Airport. Owing to the excellent connectivity of the hotel, it is easily accessible for everyone.";

    const maxLength = 500; // Set the number of characters for the truncated text

    return (
      <div className="read-more-section ">
        <p>
          {isReadMore ? `${text.slice(0, maxLength)}...` : text}
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
        </p>
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

  const handleViewMoreClick = () => {
    setShowCarousel(true);
  };

  const handleCloseCarousel = () => {
    setShowCarousel(false);
  };

  return (
    <>
      <div className="detailed_venue_wrapper">
        <Header />
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
            <div className="row">
              <div className="col-md-8 col-sm-8 col-6 m-0 p-0">
                <img src={img1} alt="img1" />
              </div>
              <div className="col-sm-2 col-3 m-0 p-0 imagegallery_verticle_images">
                <img src={img2} alt="img2" />
                <img src={img3} alt="img3" />
              </div>
              <div className="col-sm-2 col-3 m-0 p-0 view_more_image_wrapper">
                <Link to="" onClick={handleViewMoreClick}>
                  <img src={img4} alt="img4" />
                  <p>View More</p>
                </Link>
              </div>
            </div>
            {showCarousel && (
              <div className="carousel_overlay">
                <div className="carousel_container">
                  <button
                    className="close_button"
                    onClick={handleCloseCarousel}
                  >
                    &times;
                  </button>
                  <Carousel showThumbs={false}>
                    <div>
                      <img src={img1} alt="img1" />
                    </div>
                    <div>
                      <img src={img1} alt="img2" />
                    </div>
                    <div>
                      <img src={img1} alt="img3" />
                    </div>
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="venue_tags_section">
          <div className="container-md">
            <div className="venue_tags_container">
              {Venue_tags.map((tag, index) => (
                <div key={index} className="venue_tag">
                  {tag}
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
                    <h2>Airport City Hotel, Jessore Road, Kolkata</h2>
                    <p>
                      Airport City Hotel, 259, Jessore Rd, Khalisha Kota,
                      Birati, Kolkata, West Bengal 700081 
                    </p>
                    <span className="venuePage_venue_capacity_wrapper">
                      <img src={person} alt="person" />
                      <p>100-200 Capacity</p>
                    </span>
                    <h6>About this venue</h6>
                    <ReadMore />
                    <div className="venue_features_section row">
                      {features_venue.map((features, idx) => (
                        <div className="col-md-3 col-4 " key={idx}>
                          <div className="venue_features_wrapper">
                            <img
                              src={features.venue_feature_image}
                              alt="{features.venue_feature_name}"
                            />
                            <p className="venue_feature_name">
                              {features.venue_feature_name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <section className="Reviews_section d-none d-block-md">
                      <Reviews tabOpen={activeTab} />
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
              <div className="col-xl-4 col-md-5">
                <div className="calenday_modelContainer">
                  <div className="calenday_model-section">
                    <div className="calendy_modelHead">
                      <p>Avg. Price ₹120000</p>
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
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="selectTime">
                        <div className="row">
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
