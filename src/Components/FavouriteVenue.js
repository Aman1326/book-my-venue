import React, { useState, useEffect } from "react";
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
import {
  check_vaild_save,
  combiled_form_data,
  handleError,
} from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_favourite,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
const FavouriteVenue = () => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [venues_data, setVenuesData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async (id, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("venue_id", id);
    fd.append("call_id", "1");
    fd.append("flag", "1");

    await server_post_data(get_favourite, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setVenuesData(Response.data.message);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };
  console.log(venues_data);

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

export default FavouriteVenue;
