import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import noVenue from "../Assets/novenuesFound.png";
import {
  server_post_data,
  get_favourite,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import { handleError, handleLinkClick } from "../CommonJquery/CommonJquery.js";
import rigthArrow from "../Assets/right_svg_button.svg";
import leftArrow from "../Assets/left_svg_button.svg";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const FavouriteVenue = () => {
  const customer_id = retrieveData("customer_id");
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [venues_data, setVenuesData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [SEOloop, setSEOloop] = useState([]);
  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    try {
      const fd = new FormData();
      console.log(customer_id);
      fd.append("call_id", customer_id);
      fd.append("flag", "1");

      const Response = await server_post_data(get_favourite, fd);
      if (Response.data.error) {
        handleError(Response.data.message);
      } else {
        setSEOloop(Response.data.message.seo_loop);
        setVenuesData(Response.data.message.like_lt);
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      setshowLoaderAdmin(false);
    }
  };

  const itemsPerPage = 8;
  const totalPaginationPages =
    venues_data.length > 0 && Math.ceil(venues_data.length / itemsPerPage);

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
  const currentPaginationItems =
    venues_data.length > 0 &&
    venues_data.slice(indexOfFirstItem, indexOfLastItem);

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/venue/venue_detail/" + v_id;
    let data_seo_link = data_seo_link_final;
    if (SEOloop) {
      const matchedItem = SEOloop.find((data) => {
        return data_seo_link === data.call_function_name;
      });

      if (matchedItem) {
        data_seo_link_final = matchedItem.pretty_function_name;
      }
    }
    return data_seo_link_final;
  };
  return (
    <>
      <Header />
      <section className="found_venues_section">
        <div className="container">
          <section>
            <div className="popularVenues_section">
              <div className="">
                <div className="popularVenues_heading_container">
                  <h6 style={{ color: "var(--text-black)" }}>
                    My Favorite Venues
                  </h6>
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
                      {currentPaginationItems.map((venue, index) => {
                        if (venue.data.length > 0) {
                          return (
                            <div className="col-xl-6 col-12 mb-2" key={index}>
                              <Link
                                onClick={() =>
                                  handleLinkClick(
                                    match_and_return_seo_link(venue.primary_id)
                                  )
                                }
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
                                        <h6>{venue.data[0][`venue_name`]}</h6>
                                      </div>
                                      <div className="venuePage_ratingSection">
                                        <p>{venue.data[0][`rating`]}</p>
                                        <img src={star} alt="star" />
                                      </div>
                                    </div>
                                    <p>{venue.data[0][`type_address`]}</p>
                                    <h6>
                                      Average Price ₹{" "}
                                      {venue.data[0][`price_per_hour`]}
                                    </h6>
                                    <span className="venuePage_venue_category_titles">
                                      {venue.data[0]["catagory_datas"]
                                        .slice(0, 2)
                                        .map((category, catIndex) => (
                                          <p
                                            id="category_venuePage"
                                            key={catIndex}
                                          >
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
                          );
                        }
                        return null; // Return null if venue.data.length is 0 to avoid rendering
                      })}
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

export default FavouriteVenue;
