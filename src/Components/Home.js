import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Css/Home.css";
import homeBg from "../Assets/heroSectinobgImage.webp";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import venueImg1 from "../Assets/venue1.png";
import venueImg2 from "../Assets/venueImg2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import discoverbg1 from "../Assets/squareImg1.png";
import discoverbg2 from "../Assets/squareImg2.png";
import discoverbg3 from "../Assets/squareImg3.png";
import discoverbg4 from "../Assets/squareImg5.png";
import discoverbg_1 from "../Assets/Background.png";
import discoverbg_2 from "../Assets/background1.png";
import howitworks1 from "../Assets/howitworks1.png";
import howitworks2 from "../Assets/howitworks2.png";
import howitworks3 from "../Assets/howitworks3.png";
import howitworks4 from "../Assets/howitworks4.png";
import Footer from "./Footer";
import ListYourVenue from "./ListYourVenue";
import testiMonial_bg from "../Assets/testimonial_bg.png";
import VenueCategories from "./VenueCategories";
import BrowseCity from "./BrowseCity";
import testiBg from "../Assets/bglager.png";
import PERSON from "../Assets/persontesti.png";
import Next from "../Assets/nextOn.svg";
import PrevOff from "../Assets/prevOff.svg";
import { handleError } from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_blog_data_website,
  get_home_web,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  handleLinkClick,
  inputdateformateChange,
} from "../CommonJquery/CommonJquery.js";
function Home() {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [SEOloop, setSEOloop] = useState([]);
  const [GetVenueData, SetVenueData] = useState([]);
  const [testimonials, Settestimonials] = useState([]);
  const [blogs, Setblogs] = useState([]);

  useEffect(() => {
    master_data_get();
    master_data_get_seo();
  }, []);

  //get data
  const master_data_get = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    await server_post_data(get_home_web, fd)
      .then((Response) => {
        console.log(Response.data.message.testimonial_active_data);
        if (Response.data.error) {
          handleError(Response.data.message.title_name);
        } else {
          SetVenueData(Response.data.message.venue_active_data);
          Settestimonials(Response.data.message.testimonial_active_data);
          console.log(Response.data.message.blog_active_data);
          Setblogs(Response.data.message.blog_active_data);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const master_data_get_seo = async () => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    await server_post_data(get_blog_data_website, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setSEOloop(Response.data.message.seo_loop);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
        console.log(error);
      });
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

  // Custom Next Arrow
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  // Custom Prev Arrow
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // how it works
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const cardsData = [
    {
      img: howitworks1,
      title: "Discover & Shortlist Venues",
      desc: "Input your requirements & see our recommendations & prices.",
    },
    {
      img: howitworks2,
      title: "Guided Visits",
      desc: "Visit venues on your own or with our venue expert.",
    },
    {
      img: howitworks3,
      title: "Book Venue",
      desc: "Get final quotes (upto 30% off) and book your venue.",
    },
    {
      img: howitworks4,
      title: "Book Vendors",
      desc: "Meet our trusted vendors and book them at your ease.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const index =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const index =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
  };
  const handlePreviousSlide = () => {
    console.log("click");
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    console.log("click");
    if (currentSlide < testimonials.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
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
                                      {/* <p>{venue.Rating}</p> */}
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
                          to="/blogs"
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
                      {blogs.slice(0, 2).map((blog, index) => (
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
              <img
                src={testiMonial_bg}
                alt="testiMonial_bg"
                className="background-image"
              />
              <div className="col-lg-8 col-md-11">
                <div className="testimonial_Container">
                  <div className="carousel">
                    <button className="carousel-button" onClick={handlePrev}>
                      <img src={PrevOff} alt="next-icon" />
                    </button>
                    <div className="carousel-content">
                      {testimonials.map((testiMonial, index) => (
                        <div className="row m-0" key={index}>
                          <div className="col-md-4 col-6 d-flex align-items-center padding0 mx-auto">
                            <div className="profile-section">
                              <img
                                className="bgImge"
                                src={testiBg}
                                alt="profile-img"
                              />
                              <img
                                src={testiBg}
                                className="bgImge2"
                                alt="profile-img"
                              />
                              <img
                                src={PERSON}
                                alt={`${testiMonial.testimonial_details}'s profile`}
                                className="personImg"
                              />
                            </div>
                          </div>
                          <div className="col-lg-7 col-md-8 d-flex  align-items-center">
                            <div className="comment-section">
                              <h2>Testimonials</h2>
                              <div>
                                <p className="comment">
                                  {testiMonial.testimonial_details}
                                </p>
                                <h2 className="author">
                                  {testiMonial.testimonial_name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="carousel-button" onClick={handleNext}>
                      <img src={Next} alt="next-icon" />
                    </button>
                  </div>
                </div>
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
