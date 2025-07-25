import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

import filter from "../Assets/filter.svg";
import "../Components/Css/Venue.css";

import { retrieveData } from "../LocalConnection/LocalConnection.js";
import rigthArrow from "../Assets/right_svg_button.svg";
import leftArrow from "../Assets/left_svg_button.svg";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
import VenueCategories from "./VenueCategories";

import home from "../Assets/home_backbtn.svg";
import right from "../Assets/right_arrow_grey.svg";
import Heart from "../Assets/heart.svg";
import HeartRed from "../Assets/HeartRed.svg";
import SearchBar from "./SearchBar";
import {
  server_post_data,
  get_venue_catagory_data_url,
  APL_LINK,
  save_favourite,
} from "../ServiceConnection/serviceconnection.js";
import { handleError, handleLinkClick } from "../CommonJquery/CommonJquery.js";
const Venue = () => {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  console.log(currentUrl);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);

  const [numberOfVenuesFound, setNumberOfVenuesFound] = useState(0);
  const [selectedSort, setSelectedSort] = useState("");
  const [cityName, setCityName] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const customer_id = retrieveData("customer_id");
  useEffect(() => {
    let category_id = 0;
    master_data_get(category_id);
  }, []);

  const master_data_get = async (category_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("current_url", "/" + currentUrl);
    fd.append("category_id", category_id);
    console.log(category_id);
    if (currentUrl.includes("catagory/catagory_detail")) {
      fd.append("click_from", "catagory");
    } else {
      fd.append("click_from", "city");
    }
    await server_post_data(get_venue_catagory_data_url, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          console.log(Response.data.message);
          const venueData = Response.data.message.venue_active_data;
          const numberOfVenues = venueData.length;

          SetVenueData(Response.data.message.venue_active_data);
          setCityName(Response.data.message.show_name_cate_city);
          setNumberOfVenuesFound(numberOfVenues);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleHeartClick = async (index, id) => {
    handleSaveChangesdynamic(id);
    const updatedIndexes = [...selectedIndexes];
    const selectedIndex = updatedIndexes.indexOf(index);
    if (selectedIndex === -1) {
      updatedIndexes.push(index);
    } else {
      updatedIndexes.splice(selectedIndex, 1);
    }
    setSelectedIndexes(updatedIndexes);
  };
  //heartData send
  const handleSaveChangesdynamic = async (id) => {
    // seterror_show("");
    const form_data = new FormData();

    form_data.append("venue_id", id);
    form_data.append("customer_id", customer_id);
    form_data.append("flag", "0");
    await server_post_data(save_favourite, form_data)
      .then((Response) => {
        setshowLoaderAdmin(false);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          // handleSuccessSession(Response.data.message, "/admin_news");
        }
      })
      .catch((error) => {
        console.log(error);
        setshowLoaderAdmin(false);
      });
  };
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

  const filters = ["Rating: 4.0+", "Popular", "Budget Friendly", "High Rated"];

  const venues_data_labeled = GetVenueData;

  const handleFilterChange = (filter) => {
    applyFilterChanges(filter);
  };
  // filter buttons map  data filter
  const applyFilterChanges = (filter) => {
    let filteredVenues = [...currentPaginationItems];

    if (filter === "Rating: 4.0+") {
      filteredVenues = filteredVenues.filter((venue) => venue.rating >= 4.0);
      filteredVenues.sort((a, b) => b.rating - a.rating);
    } else if (filter === "Popular") {
      filteredVenues.sort((a, b) => b.price_per_day - a.price_per_day);
    } else if (filter === "Budget Friendly") {
      filteredVenues.sort((a, b) => a.price_per_day - b.price_per_day);
    } else if (filter === "High Rated") {
      filteredVenues.sort((a, b) => b.rating - a.rating);
    }

    setSortedData(filteredVenues);
  };
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
  const currentPaginationItems =
    venues_data_labeled &&
    venues_data_labeled.slice(indexOfFirstItem, indexOfLastItem);

  // filter modal states
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };
  const applySortChanges = () => {
    let sortedVenues = [...currentPaginationItems];

    if (selectedSort === "Rating: High to Low") {
      sortedVenues.sort((a, b) => b.Rating - a.Rating);
    } else if (selectedSort === "Rating: Low to High") {
      sortedVenues.sort((a, b) => a.Rating - b.Rating);
    } else if (selectedSort === "Cost: Low to High") {
      sortedVenues.sort((a, b) => a.price_per_day - b.price_per_day);
    } else if (selectedSort === "Cost: High to Low") {
      sortedVenues.sort((a, b) => b.price_per_day - a.price_per_day);
    }

    setSortedData(sortedVenues);
    handleCloseFilterModal();
  };
  const clearAllFilters = () => {
    handleCloseFilterModal();
    setSelectedSort("");

    setSortedData([]);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleClick = (filter) => {
    setActiveFilter(filter);
    handleFilterChange(filter);
  };

  const toPascalCase = (str) => {
    let tempArray = str.split(" ");
    tempArray = tempArray.map(
      (value) => value.charAt(0).toUpperCase() + value.slice(1, value.length)
    );
    return tempArray.join("");
  };

  const [showModal, setShowModal] = useState(false);

  const check_login_or_not = (primary_id, index, click_type) => {
    if (customer_id !== "0") {
      if (click_type === "0") {
        handleHeartClick(index, primary_id);
      } else {
        setShowModal(true);
      }
    } else {
      var event = new CustomEvent("customEvent");
      document.getElementById("login_check_jquery").dispatchEvent(event);
    }
  };
  return (
    <>
      <div venue_wrapper>
        <Header />
        <div className="searchBarContainer d-md-none">
          <SearchBar />
        </div>
        {/* venue categories section */}
        <section>
          <div className="container-lg mt-3">
            <div className="venuePage_venueCategory_heading">
              <Link to="/">
                <img src={home} alt="hdbhjb" width={"14px"} />
              </Link>{" "}
              <img src={right} alt="right" />
              <Link to="/">{toPascalCase(cityName)}</Link>
            </div>
          </div>
          <VenueCategories />
        </section>
        <section>
          <div className="filters_section">
            <div className="container-lg">
              <div className="filters_wrapper">
                <ul>
                  <li onClick={handleShowFilterModal}>
                    <img src={filter} alt="filter" /> Filter
                  </li>
                  {filters.map((text, index) => (
                    <li
                      key={index}
                      onClick={() => handleClick(text)}
                      className={`filter-item ${
                        activeFilter === text ? "active" : ""
                      }`}
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="found_venues_section">
          <div className="container-lg">
            <section>
              <div className="popularVenues_section">
                <div className="">
                  <div className="popularVenues_heading_container">
                    <h5>{numberOfVenuesFound} Venues Found</h5>

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
                  <div className="popularVenues">
                    <div className="row mt-1">
                      {(sortedData.length
                        ? sortedData
                        : currentPaginationItems
                      ).map((venue, index) => (
                        <div
                          className="col-lg-6 col-12 margin24px"
                          style={{ position: "relative" }}
                          key={`${index}`}
                          id="vanueregistration"
                        >
                          <div className="heatImgg">
                            <button
                              onClick={() =>
                                check_login_or_not(venue.primary_id, index, "0")
                              }
                            >
                              <img
                                src={
                                  selectedIndexes.includes(index)
                                    ? HeartRed
                                    : Heart
                                }
                                alt="Heart"
                                className="heart_icon"
                              />
                            </button>
                          </div>
                          <Link
                            onClick={() =>
                              handleLinkClick(
                                match_and_return_seo_link(venue.primary_id)
                              )
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <div className="VenuePage_venue_container">
                              <div className="row m-0">
                                <div className="col-sm-5 px-0">
                                  <div
                                    className="venuePage_image_container"
                                    style={{ position: "relative" }}
                                  >
                                    <img
                                      src={
                                        APL_LINK +
                                        "/assets/" +
                                        venue.venue_images
                                      }
                                      alt={`Venue ${index + 1}`}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-7">
                                  <div className="venuePage_text_section">
                                    <div className="venueContainer_rowtext">
                                      <div className="venueContainer_nameAndAddress">
                                        <h6>{venue.venue_name}</h6>
                                      </div>
                                      <div className="venuePage_ratingSection">
                                        <p>{venue.rating}</p>
                                        <img src={star} alt="star" />
                                      </div>
                                    </div>
                                    <p>{venue.type_address}</p>
                                    <h6 className="avrgPrice">
                                      Starting From ₹{venue.price_per_day}
                                    </h6>
                                    <span className="venuePage_venue_category_titles">
                                      {venue.catagory_datas.length > 0 &&
                                        venue.catagory_datas
                                          .slice(0, 2)
                                          .map((category, index) => (
                                            <p
                                              id="category_venuePage"
                                              key={index}
                                            >
                                              {category.sub_category_name}
                                            </p>
                                          ))}
                                    </span>
                                    <span className="venuePage_venue_category_titles mb-4">
                                      {venue.amenities_data.length > 0 &&
                                        venue.amenities_data
                                          .slice(0, 2)
                                          .map((facility, idx) => (
                                            <div
                                              key={idx}
                                              className="facility_item"
                                            >
                                              <img
                                                src={
                                                  APL_LINK +
                                                  "/assets/" +
                                                  facility.image
                                                }
                                                alt={`Venue ${index + 1}`}
                                              />
                                              <p id="facilities_venuePage">
                                                {facility.name}
                                              </p>
                                            </div>
                                          ))}
                                    </span>
                                    <span className="venuePage_venue_capacity_wrapper">
                                      <img src={person} alt="person" />
                                      <p>
                                        {venue.guests_capacity} Max. Capacity
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="venuePage_listyourVenue_section">
          <ListYourVenue />
        </section>
        <Footer />
      </div>

      <Modal
        show={showFilterModal}
        onHide={handleCloseFilterModal}
        centered
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="filters_modal_heading">Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body id="filters_modal">
          <Tabs
            className="vertical-tabs"
            selectedIndex={selectedTab}
            onSelect={(index) => setSelectedTab(index)}
          >
            <TabList className="vertical-tab-list">
              <Tab>
                Sort by
                <br />
                <p className="colored_text_verticle_tabs">{selectedSort}</p>
              </Tab>
            </TabList>

            <TabPanel>
              {selectedTab === 0 && (
                <div>
                  <form className="filters_modal_venuesPage">
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Rating: High to Low"
                        checked={selectedSort === "Rating: High to Low"}
                        onChange={handleSortChange}
                      />
                      Rating: High to Low
                    </label>

                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Cost: Low to High"
                        checked={selectedSort === "Cost: Low to High"}
                        onChange={handleSortChange}
                      />
                      Cost: Low to High
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="Cost: High to Low"
                        checked={selectedSort === "Cost: High to Low"}
                        onChange={handleSortChange}
                      />
                      Cost: High to Low
                    </label>
                  </form>
                </div>
              )}
              {selectedTab === 1 && (
                <div>
                  <h3>Rating</h3>
                  <p>Content for Rating tab</p>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="filter_modal_button">
          <Button onClick={clearAllFilters}>Clear All</Button>
          <Button onClick={applySortChanges}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Venue;
