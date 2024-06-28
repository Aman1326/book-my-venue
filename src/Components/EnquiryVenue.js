import React, { useState } from "react";
import { Link } from "react-router-dom";
import bar1 from "../Assets/bar1.png";
import bar2 from "../Assets/bar2.png";
import bar3 from "../Assets/bar3.png";
import bar4 from "../Assets/bar4.png";
import bar5 from "../Assets/bar5.png";
import bar6 from "../Assets/bar6.png";
import bar7 from "../Assets/bar7.png";
import barPresent from "../Assets/bars-3x.png.svg";
import alcoholPresent from "../Assets/alcohol-served3x.png.svg";
import valetParking from "../Assets/valet-parking3x.png.svg";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import Header from "./Header";
import "./Css/FavouriteVenue.css";
import noVenue from "../Assets/novenuesFound.png";
const EnquiryVenue = () => {
  const venues_data_labeled = [
    {
      venue_image: bar1,
      Venue: ["Wedding", "Birthday party"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      Capacity: "180-600",
      average_price: "5000",
      facilities: ["bar", "valet parking", "alcohol served"],
      facilities_images: [barPresent, valetParking, alcoholPresent],
    },
    // ... other venue objects
  ];

  // pagination of popular venues
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const itemsPerPage = 8;

  const totalPaginationPages = Math.ceil(
    venues_data_labeled.length / itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPaginationPage((prevPage) =>
      Math.min(prevPage + 1, totalPaginationPages)
    );
  };

  const handlePreviousPage = () => {
    setCurrentPaginationPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPaginationPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginationItems = venues_data_labeled.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <Header />
      <section className="found_venues_section">
        <div className="container">
          <section>
            <div className="popularVenues_section">
              <div className="">
                <div className="popularVenues_heading_container">
                  <h6 style={{ color: "var(--text-black)" }}>My Enquires</h6>
                  <span className="seAll_span">
                    <div className="pagination_controls">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPaginationPage === 1}
                      >
                        <img src={leftArrow} alt="leftArrow" />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={
                          currentPaginationPage === totalPaginationPages
                        }
                      >
                        <img src={rigthArrow} alt="rightArrow" />
                      </button>
                    </div>
                  </span>
                </div>
                {venues_data_labeled.length === 0 ? (
                  <div className="no-venues-message row">
                    <div className="col-lg-6 no_venues_found">
                      <p>No Enquiries Yet </p>
                      <img src={noVenue} alt="noVenue" width={"200px"} />

                      <Link to="/venues">
                        {" "}
                        <button>Make My Initial Inquiry</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="popularVenues">
                    <div className="venue_cards_container row mt-1">
                      {currentPaginationItems.map((venue, index) => (
                        <div className="col-xl-6 col-12 mb-2" key={index}>
                          <Link
                            to="/detailedVenue"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="VenuePage_venue_container">
                              <div className="venuePage_image_container">
                                <img src={venue.venue_image} alt="venueImg" />
                              </div>
                              <div className="venuePage_text_section">
                                <div className="venueContainer_rowtext">
                                  <div className="venueContainer_nameAndAddress">
                                    <h6>{venue.Name}</h6>
                                  </div>
                                  <div className="venuePage_ratingSection">
                                    <p>{venue.Rating}</p>
                                    <img src={star} alt="star" />
                                  </div>
                                </div>
                                <p>{venue.Address}</p>
                                <h6>Average Price ₹{venue.average_price}</h6>
                                <span className="venuePage_venue_category_titles">
                                  {venue.Venue.map((category, idx) => (
                                    <p id="category_venuePage" key={idx}>
                                      {category}
                                    </p>
                                  ))}
                                </span>
                                <span className="venuePage_venue_category_titles">
                                  {venue.facilities.map((facility, idx) => (
                                    <div key={idx} className="facility_item">
                                      <img
                                        id="facilities_venuePage"
                                        src={venue.facilities_images[idx]}
                                        alt={facility}
                                      />
                                      <p id="facilities_venuePage">
                                        {facility}
                                      </p>
                                    </div>
                                  ))}
                                </span>
                                <span className="venuePage_venue_capacity_wrapper">
                                  <img src={person} alt="person" />
                                  <p>{venue.Capacity} Capacity</p>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <span className="seAll_span">
                      <div className="pagination_controls">
                        <button
                          onClick={handlePreviousPage}
                          disabled={currentPaginationPage === 1}
                        >
                          <img src={leftArrow} alt="leftArrow" />
                        </button>
                        <button
                          onClick={handleNextPage}
                          disabled={
                            currentPaginationPage === totalPaginationPages
                          }
                        >
                          <img src={rigthArrow} alt="rightArrow" />
                        </button>
                      </div>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default EnquiryVenue;
