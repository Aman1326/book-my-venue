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

import Reviews from "./Reviews";
import BrowseCity from "./BrowseCity";
import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
const DetailedVenue = () => {
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

  // states for calendar model:
  const [value, setvalue] = React.useState(dayjs());
  const [selectedCardValue, setSelectedCardValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [userNumber, setUserNumber] = useState("");
  const [thankyouVisible, setthankyouVisibility] = useState(false);
  const [stepclick, setstepclick] = useState(0);

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
  return (
    <>
      <div className="detailed_venue_wrapper">
        <Header />
        <section>
          <div className="container mt-3">
            <div className="venuePage_venueCategory_heading">
              <Link to="/">Home</Link> <p>{">"}</p>
              <Link>Bhopal</Link>
              <p>{">"}</p>
              <Link>TT nagar</Link>
              <p>{">"}</p>
              <Link>XyZ Venue</Link>
            </div>
          </div>
        </section>
        {/* images gallery section */}
        <section className="image_gallery_section">
          <div className="container">
            <div className="row d-none d-lg-flex">
              <div className="col-lg-8 m-0 p-0">
                <img src={img1} alt="img1" />
              </div>
              <div className="col-lg-2 m-0 p-0 imagegallery_verticle_images">
                <img src={img2} alt="img2" />
                <img src={img3} alt="img3" />
              </div>
              <div className="col-lg-2 m-0 p-0 view_more_image_wrapper">
                <Link to="">
                  <img src={img4} alt="img4" />
                  <p>View More</p>
                </Link>
              </div>
            </div>
            <div className="row d-lg-none">
              <div className="col-12 p-0">
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
          </div>
        </section>
        <section className="venue_tags_section">
          <div className="container">
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
          <div className="container">
            <div className="tabs row">
              <div className="tab-buttons col-lg-3">
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
              <div className="row">
                <div className="tab-content col-lg-7">
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
                          <div
                            className="col-lg-3 venue_features_wrapper"
                            key={idx}
                          >
                            <img
                              src={features.venue_feature_image}
                              alt="{features.venue_feature_name}"
                            />
                            <p className="venue_feature_name">
                              {features.venue_feature_name}
                            </p>
                          </div>
                        ))}
                      </div>
                      <section className="Reviews_section">
                        <Reviews />
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
                <div className="col-lg-4">
                  <div className="calenday_model-section"></div>
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
