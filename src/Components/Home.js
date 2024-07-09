import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import testiBg from "../Assets/bglager.png";
import PERSON from "../Assets/persontesti.png";
import Next from "../Assets/nextOn.svg";
import PrevOn from "../Assets/leftOn.svg";
import Header from "./Header";
import homeBg from "../Assets/heroSectinobgImage.webp";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import rigthArrow from "../Assets/right_svg_button.svg";
import leftArrow from "../Assets/left_svg_button.svg";
import howitworks4 from "../Assets/howitworks1.svg";
import howitworks3 from "../Assets/howitworks2.svg";
import howitworks2 from "../Assets/howitworks3.svg";
import howitworks1 from "../Assets/howitworks3.svg";
import Footer from "./Footer";
import ListYourVenue from "./ListYourVenue";
import VenueCategories from "./VenueCategories";
import BrowseCity from "./BrowseCity";
import {
  server_post_data,
  get_home_web,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  handleLinkClick,
  inputdateformateChange,
  handleError,
} from "../CommonJquery/CommonJquery.js";

import "react-responsive-carousel/lib/styles/carousel.min.css";
function Home() {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [testimonials, Settestimonials] = useState([]);
  const [blogs, Setblogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    master_data_get();
  }, []);

  //get data
  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    await server_post_data(get_home_web, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message.title_name);
        } else {
          SetVenueData(Response.data.message.venue_active_data);
          Settestimonials(Response.data.message.testimonial_active_data);
          Setblogs(Response.data.message.blog_active_data);
          setSEOloop(Response.data.message.seo_loop);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // pagination of popular venues
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const itemsPerPage = 8;

  const totalPaginationPages = Math.ceil(
    GetVenueData && GetVenueData.length / itemsPerPage
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
    GetVenueData && GetVenueData.slice(indexOfFirstItem, indexOfLastItem);

  const cardsData = [
    {
      img: howitworks1,
      title: "Browse Venues",
      desc: "Discover the perfect wedding venues in your desired location.",
    },
    {
      img: howitworks2,
      title: "Get Detailed Info",
      desc: "Access comprehensive details, photos, and reviews for each venue.",
    },
    {
      img: howitworks3,
      title: "Submit Enquiries",
      desc: "Easily send inquiries to venues that catch your eye.",
    },
    {
      img: howitworks4,
      title: "Recieve Quick Responses",
      desc: "Get prompt replies and personalized assistance from our team.",
    },
  ];

  // const { name, profile, comment } = testimonials[currentIndex];

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

  const match_and_return_seo_blog_link = (v_id) => {
    let data_seo_link_final = "/blog/blog_detail/" + v_id;
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
    <div>
      <Header />
      <div className="homePage_wrapper">
        <div className="container-lg">
          {/* hero section */}
          <section className="heroSection">
            <div className="row">
              <div className="heroSection_wrapper col-lg-12 col-12">
                <img src={homeBg} alt="home bg" id="homeBG" />
                <div className="searchBar_container_homeScreen">
                  <div className="Heading_herosection">
                    <h1>Your Perfect Venue, Just a Click Away</h1>
                  </div>
                  <div className="searchBarInHeroSection w-100 px-sm-5 px-4">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <VenueCategories />
          </section>
          {/* Popular Venues */}
          <section>
            <div className="popularVenues_section">
              <div className="container-lg">
                <div className="popularVenues_heading_container">
                  <h2>Popular Venue</h2>
                  <span className="seAll_span">
                    <Link to="/venue">
                      <p>See All</p>
                    </Link>
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
                  <div className="venue_cards_container row mt-1">
                    {!currentPaginationItems
                      ? []
                      : currentPaginationItems.map((venue, index) => (
                          <div className="col-lg-3 col-md-4 col-sm-6">
                            <Link
                              onClick={() =>
                                handleLinkClick(
                                  match_and_return_seo_link(venue.primary_id)
                                )
                              }
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                key={index}
                                className="popularVenues_venue_container"
                              >
                                <div className="venue_image_holder">
                                  <img
                                    src={
                                      APL_LINK + "/assets/" + venue.venue_images
                                    }
                                    alt="venueImg"
                                  />
                                </div>
                                <div className="venueDetailCOntainer">
                                  <div className="venue_category_div">
                                    <span className="venue_category_titles">
                                      {venue.catagory_datas
                                        .slice(0, 2)
                                        .map((category, catIndex) => (
                                          <React.Fragment key={catIndex}>
                                            <p>{category.sub_category_name}</p>
                                            {catIndex < 1 && <p>|</p>}
                                          </React.Fragment>
                                        ))}
                                    </span>
                                    <div className="rating_greenDiv">
                                      <p>{venue.rating}</p>
                                      <img src={star} alt="star" />
                                    </div>
                                  </div>
                                  <div className="venue_address_wrapper">
                                    <h6 className="venue_address_heading">
                                      {venue.venue_name}
                                    </h6>
                                    <p className="mb-3">{venue.map_address}</p>
                                    <span className="venue_capacity_wrapper">
                                      <img src={person} alt="person" />
                                      <p>{venue.guests_capacity} Capacity</p>
                                    </span>
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
          {/* browse other cities */}
          <section>
            <BrowseCity />
          </section>
          {/* discover more great venues */}
          <section>
            <div className="discover_more_venues_section">
              <div className="container">
                <div className="row">
                  <div className="popularVenues_heading_container">
                    <h2>Discover more great Venues</h2>
                    <span className="seAll_span">
                      <Link to="/blogs">
                        <p>Explore All</p>
                      </Link>
                    </span>
                  </div>
                  {blogs.slice(0, 2).map((blog, index) => (
                    <div className="col-lg-4 col-md-6 mb-3" key={index}>
                      <div className="discoverMore_container">
                        <Link
                          onClick={() =>
                            handleLinkClick(
                              match_and_return_seo_blog_link(blog.primary_id)
                            )
                          }
                          style={{
                            textDecoration: "none",
                            color: "var(--text-black)",
                          }}
                        >
                          <img src={blog.image_name} alt="discoverImg" />
                          <div className="discoverMore_containerText">
                            <h6>{blog.title_name}</h6>
                            <p>{blog.tag_line}</p>
                            <p
                              style={{
                                color: "var(--primary-color)",
                                paddingBottom: "0.5rem",
                                margin: "0",
                              }}
                            >
                              {inputdateformateChange(blog.entry_date)}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-4 d-none d-lg-block mb-3">
                    <div className="verticle_container_discoverMore">
                      {blogs.slice(0, 4).map((blog, index) => (
                        <Link
                          onClick={() =>
                            handleLinkClick(
                              match_and_return_seo_blog_link(blog.primary_id)
                            )
                          }
                          key={index}
                          style={{
                            textDecoration: "none",
                            color: "var(--text-black)",
                          }}
                        >
                          <div
                            className="smaller_container_discoverMore"
                            key={index}
                          >
                            <img src={blog.image_name} alt="discoverbg1" />
                            <div className="heading_discoverMore">
                              <h6>{blog.title_name}</h6>
                              <p>{inputdateformateChange(blog.entry_date)}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* how it works  */}
          <section className="howitworks_section">
            <div className="howitworks_cards_heading">
              <h2>How it Works</h2>
            </div>
            <div className="howitworks_cards_section">
              <div className="row">
                {cardsData.map((card, index) => (
                  <div className="col-md-3 col-6">
                    <div className="mobileSizeCarausel">
                      <div key={index} className={`card${index + 1} crdd`}>
                        <div className="cententCarausel">
                          <img src={card.img} alt={card.title} />
                          <h6>{card.title}</h6>
                          <p>{card.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="testimonial_section">
          <div className="testimonial_wrapper row">
            <div className="testimonial_background_container p-0">
              <div
                className="col-lg-8 col-md-10 m-auto h-100 d-flex align-items-center"
                style={{ position: "relative" }}
              >
                <div className="leftRightArrows">
                  <button className="leftButton" onClick={handlePrevClick}>
                    <img src={PrevOn} alt="previous" />
                  </button>
                  <button
                    className="RightButtonArrow"
                    onClick={handleNextClick}
                  >
                    <img src={Next} alt="Next Slide"></img>
                  </button>
                </div>

                {testimonials.length > 0 && (
                  <Carousel
                    activeIndex={currentIndex}
                    onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
                    indicators={true}
                    controls={false}
                    interval={null} // Disable automatic slide change
                  >
                    {testimonials.map((testimonial, index) => (
                      <Carousel.Item key={index}>
                        <div className="row m-0">
                          <div className="col-md-4 col-6 d-flex align-items-center padding0 mx-auto">
                            <div className="profile-section">
                              <img
                                className="bgImge"
                                src={testiBg}
                                alt="profile-img"
                              />
                              <img
                                className="bgImge2"
                                src={testiBg}
                                alt="profile-img"
                              />
                              <img
                                src={PERSON}
                                alt={`${testimonial.testimonial_details}'s profile`}
                                className="personImg"
                              />
                            </div>
                          </div>
                          <div className="col-lg-7 col-md-8">
                            <div className="comment-section">
                              <h2>Testimonials</h2>
                              <div>
                                <p className="comment">
                                  {testimonial.testimonial_details}
                                </p>
                                <h2 className="author">
                                  {testimonial.testimonial_name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="listVenueDiv">
          <ListYourVenue />
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
