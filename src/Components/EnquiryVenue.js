import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Css/FavouriteVenue.css";
import noVenue from "../Assets/novenuesFound.png";
import {
  server_post_data,
  get_myenquiry,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";

// Consolidate imports for better organization
import { handleError } from "../CommonJquery/CommonJquery.js";

// Consolidate image imports if possible

import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import { retrieveData, storeData } from "../LocalConnection/LocalConnection.js";
const EnquiryVenue = () => {
  const customer_id = retrieveData("customer_id");

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [venues_data, setVenuesData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  useEffect(() => {
    const call_id = customer_id;
    master_data_get(call_id);
  }, []);

  const master_data_get = async (call_id) => {
    setshowLoaderAdmin(true);
    try {
      const fd = new FormData();
      fd.append("call_id", call_id);

      const response = await server_post_data(get_myenquiry, fd);
      if (response.data.error) {
        handleError(response.data.message);
      } else {
        setVenuesData(response.data.message);
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      setshowLoaderAdmin(false);
    }
  };

  const itemsPerPage = 8;
  const totalPaginationPages = Math.ceil(venues_data.length / itemsPerPage);

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
  const currentPaginationItems = venues_data.slice(
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
                  <h6 style={{ color: "var(--text-black)" }}>My Vanues</h6>
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
                {venues_data.length === 0 ? (
                  <div className="no-venues-message row">
                    <div className="col-lg-6 no_venues_found">
                      <p>No favorite venues found.</p>
                      <img src={noVenue} alt="noVenue" width={"200px"} />
                      <Link to="/venue">
                        {" "}
                        <button>Explore Venues</button>
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
                                <img
                                  src={
                                    APL_LINK +
                                    "/assets/" +
                                    venue.data[0][`venue_images`]
                                  }
                                  alt="venueImg"
                                />
                              </div>
                              <div className="venuePage_text_section">
                                <div className="venueContainer_rowtext">
                                  <div className="venueContainer_nameAndAddress">
                                    <h6> {venue.data[0][`venue_name`]}</h6>
                                  </div>
                                  <div className="venuePage_ratingSection">
                                    <p>{venue.data[0][`rating`]}</p>
                                    <img src={star} alt="star" />
                                  </div>
                                </div>
                                <p> {venue.data[0][`type_address`]}</p>
                                <h6>
                                  Average Price ₹{" "}
                                  {venue.data[0][`price_per_hour`]}
                                </h6>
                                <span className="venuePage_venue_category_titles">
                                  {venue.data[0]["catagory_datas"]
                                    .slice(0, 2)
                                    .map((category, index) => (
                                      <p id="category_venuePage" key={index}>
                                        {category.sub_category_name}
                                      </p>
                                    ))}
                                </span>
                                <span className="venuePage_venue_capacity_wrapper">
                                  <img src={person} alt="person" />
                                  <p>
                                    {venue.data[0][`guests_capacity`]} Max.
                                    Capacity
                                  </p>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
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
