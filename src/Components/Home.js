import React, { useState } from "react";
import Header from "./Header";
import "./Css/Home.css";
import homeBg from "../Assets/heroSectinobgImage.webp";
import venue1 from "../Assets/Ellipse-1-_6_.webp";
import venue2 from "../Assets/Ellipse-1-_2__1.webp";
import venue3 from "../Assets/Ellipse-1-_3__1.webp";
import venue4 from "../Assets/venue4.webp";
import venue5 from "../Assets/venue5.webp";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import venueImg1 from "../Assets/venue1.png";
import star from "../Assets/star.svg";
import person from "../Assets/person.svg";
import rigthArrow from "../Assets/rightArrow.svg";
import leftArrow from "../Assets/leftArrow.svg";
import city1 from "../Assets/city1.png";
import city2 from "../Assets/city2.png";
import city3 from "../Assets/city3.png";
import city4 from "../Assets/city4.png";
import city5 from "../Assets/city5.png";
import city6 from "../Assets/city6.png";
import Slider from "react-slick";
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
function Home() {
  const venueCategories = [
    { image: venue1, description: "Venue 1 " },
    { image: venue1, description: "Venue 1 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue3, description: "Venue 3 " },
    { image: venue3, description: "Venue 3 " },
    { image: venue4, description: "Venue 4 " },
    { image: venue5, description: "Venue 5 " },
  ];

  const venues_data_labeled = [
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Birthday party"],
      Rating: 4.1,
      Name: "Majestic Manor",
      Address: "Royal Plaza, Anand Nagar",
      Capacity: "180-600",
    },
    {
      venue_image: venueImg1,
      Venue: ["Conference", "Workshop"],
      Rating: 4.3,
      Name: "Business Hall",
      Address: "Tech Park, Sector 5, Downtown",
      Capacity: "50-200",
    },
    {
      venue_image: venueImg1,
      Venue: ["Concert", "Festival"],
      Rating: 4.8,
      Name: "Grand Arena",
      Address: "City Center, Main Square",
      Capacity: "500-2000",
    },
    {
      venue_image: venueImg1,
      Venue: ["Gala", "Banquet"],
      Rating: 4.5,
      Name: "Royal Banquet Hall",
      Address: "East Wing, Palace Grounds",
      Capacity: "100-400",
    },
    {
      venue_image: venueImg1,
      Venue: ["Birthday party", "Conference"],
      Rating: 4.0,
      Name: "Summit Center",
      Address: "Highland Boulevard, Peak District",
      Capacity: "150-400",
    },
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Anniversary"],
      Rating: 4.4,
      Name: "Paradise Point",
      Address: "Beachside, Coastal Highway",
      Capacity: "200-600",
    },
    {
      venue_image: venueImg1,
      Venue: ["Conference", "Corporate Event"],
      Rating: 4.6,
      Name: "Empire Hall",
      Address: "Downtown, Main Street",
      Capacity: "350-900",
    },
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Birthday party"],
      Rating: 4.1,
      Name: "Sunset Gardens",
      Address: "Hillside, Vista Drive",
      Capacity: "180-600",
    },
    {
      venue_image: venueImg1,
      Venue: ["Birthday party", "Reception"],
      Rating: 3.8,
      Name: "Happy Times Hall",
      Address: "Sunnyvale, Bright Road",
      Capacity: "100-350",
    },
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Corporate Event"],
      Rating: 4.5,
      Name: "Starlight Banquet",
      Address: "Midtown, Star Avenue",
      Capacity: "300-800",
    },
    {
      venue_image: venueImg1,
      Venue: ["Conference", "Anniversary"],
      Rating: 4.2,
      Name: "Harmony Hall",
      Address: "Harmony Street, Peace Park",
      Capacity: "200-500",
    },
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Reception"],
      Rating: 4.0,
      Name: "Elegant Venue",
      Address: "Fashion Street, Glamour District",
      Capacity: "250-650",
    },
    {
      venue_image: venueImg1,
      Venue: ["Birthday party", "Corporate Event"],
      Rating: 3.9,
      Name: "Joyful Hall",
      Address: "River Road, Lakeside",
      Capacity: "150-400",
    },
    {
      venue_image: venueImg1,
      Venue: ["Wedding", "Anniversary"],
      Rating: 4.3,
      Name: "Royal Palace",
      Address: "Queen's Avenue, Majestic Park",
      Capacity: "300-700",
    },
    {
      venue_image: venueImg1,
      Venue: ["Conference", "Birthday party"],
      Rating: 4.4,
      Name: "Summit Hall",
      Address: "Mountain Road, High Peaks",
      Capacity: "200-600",
    },
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

  //browse cities section
  const Browse_cities = [
    { image: city1, description: "Mumbai" },
    { image: city2, description: "Bhopal" },
    { image: city3, description: "Nasik" },
    { image: city4, description: "Indore" },
    { image: city5, description: "Pune" },
    { image: city6, description: "Ujjain" },
  ];
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
  };
  const [isDesktop, setIsDesktop] = useState(window.innerWidth < 800);
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
                    <h2>Your Perfect Venue, Just a Click Away</h2>
                  </div>
                  <div className="searchBarInHeroSection">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* venue categories section */}
          <section>
            <div className="venueCategor_section">
              <div className="container-lg">
                <div className="venueCategory_heading">
                  <h6>Browse by Venue Categories</h6>
                  <Link>
                    <p>
                      See All {">"}
                      {">"}
                    </p>
                  </Link>
                </div>
                <div className="venueCategories">
                  <div className="venue-row">
                    {venueCategories.map((venue, index) => (
                      <div key={index} className="venue-item">
                        <img
                          className="venue-image"
                          src={venue.image}
                          alt={`Venue ${index + 1}`}
                        />
                        <div className="venue-description">
                          {venue.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Popular Venues */}
          <section>
            <div className="popularVenues_section">
              <div className="container">
                <div className="popularVenues_heading_container">
                  <h3>Popular Venue</h3>
                  <span className="seAll_span">
                    <Link>
                      <p>
                        <strong>See All</strong>
                      </p>
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
                    {currentPaginationItems.map((venue, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6">
                        <div
                          key={index}
                          className="popularVenues_venue_container"
                        >
                          <div className="venue_image_holder">
                            <img src={venue.venue_image} alt="venueImg" />
                          </div>
                          <div className="venue_category_div">
                            <span className="venue_category_titles">
                              {venue.Venue.map((category, idx) => (
                                <React.Fragment key={idx}>
                                  <p>{category}</p>
                                  {idx < venue.Venue.length - 1 && <p>|</p>}
                                </React.Fragment>
                              ))}
                            </span>
                            <div className="rating_greenDiv">
                              <p>{venue.Rating}</p>
                              <img src={star} alt="star" />
                            </div>
                          </div>
                          <div className="venue_address_wrapper">
                            <h6 className="venue_address_heading">
                              {venue.Name}
                            </h6>
                            <desc>{venue.Address}</desc>
                            <span className="venue_capacity_wrapper">
                              <img src={person} alt="person" />
                              <p>{venue.Capacity} Capacity</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* browse other cities */}
          <section>
            <div className="browse_otherCities_section">
              <div className="container">
                <div className="browse_otherCities_heading">
                  <h3>Browse Other Cities </h3>
                </div>
                <div className="cities_mapped ">
                  <Slider {...settings}>
                    {Browse_cities.map((venue, index) => (
                      <div key={index} className="city-item">
                        <img
                          className="city-image"
                          src={venue.image}
                          alt={`Venue ${index + 1}`}
                        />
                        <div className="city-description">
                          {venue.description}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
          {/* discover more great venues */}
          <section>
            <div className="discover_more_venues_section">
              <div className="container">
                <div className="row">
                  <div className="discover_more_venues_heading">
                    <h3>Discover more great Venues</h3>
                  </div>
                  <div className="col-lg-4">
                    <div className="discoverMore_container">
                      <img src={discoverbg_1} alt="discoverImg" />
                      <h6>
                        Meet three SF chefs proudly repping the API community in
                        the...
                      </h6>
                      <p>
                        The first-ever Gold Chef Prize recognizes someof the
                        most exciting API chefs...
                      </p>
                      <p style={{ color: "var(--primary-color)" }}>
                        April 30, 2024
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="discoverMore_container">
                      <img src={discoverbg_2} alt="discoverImg" />
                      <h6>
                        Meet three SF chefs proudly repping the API community in
                        the...
                      </h6>
                      <p>
                        The first-ever Gold Chef Prize recognizes someof the
                        most exciting API chefs...
                      </p>
                      <p style={{ color: "var(--primary-color)" }}>
                        April 30, 2024
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 ">
                    <div className="verticle_container_discoverMore">
                      <div className="smaller_container_discoverMore">
                        <img src={discoverbg1} alt="discoverbg1" />
                        <div className="heading_discoverMore">
                          <h6>
                            How to have the best time at the East Bay’s only
                            two-…
                          </h6>
                          <p style={{ color: "var(--primary-color)" }}>
                            April 30, 2024
                          </p>
                          <hr />
                        </div>
                      </div>
                      <div className="smaller_container_discoverMore">
                        <img src={discoverbg2} alt="discoverbg1" />
                        <div className="heading_discoverMore">
                          <h6>
                            12 quintessential date-night restaurants in San
                            Francisco
                          </h6>
                          <p style={{ color: "var(--primary-color)" }}>
                            January 9, 2024
                          </p>
                          <hr />
                        </div>
                      </div>
                      <div className="smaller_container_discoverMore">
                        <img src={discoverbg3} alt="discoverbg1" />
                        <div className="heading_discoverMore">
                          <h6>
                            OpenTable restaurants to save for your 2024 dining
                            wishlist
                          </h6>
                          <p style={{ color: "var(--primary-color)" }}>
                            December 15, 2023
                          </p>
                          <hr />
                        </div>
                      </div>
                      <div className="smaller_container_discoverMore">
                        <img src={discoverbg4} alt="discoverbg1" />
                        <div className="heading_discoverMore">
                          <h6>
                            How to have the best time at the East Bay’s only
                            two-…
                          </h6>
                          <p style={{ color: "var(--primary-color)" }}>
                            February 9, 2024
                          </p>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* how it works  */}
          <section className="howitworks_section">
            <div className="howitworks_cards_heading">
              <h3>How it Works</h3>
            </div>
            <div className="howitworks_cards_section">
              {isDesktop ? (
                <Slider {...settings2}>
                  {cardsData.map((card, index) => (
                    <div className="mobileSizeCarausel">
                      <div key={index} className={`card${index + 1} crdd`}>
                        <div className="cententCarausel">
                          <img src={card.img} alt={card.title} />
                          <h6>{card.title}</h6>
                          <p>{card.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="cardContainer">
                  <div className="smartcArds">
                    <div className="cart1">
                      <img src={howitworks1} alt="productIcon"></img>
                      <h6 className="font14"> Discover & Shortlist Venues</h6>
                      <p>
                        Input your requirements & see our recommendations &
                        prices.
                      </p>
                    </div>
                    <div className="cart1">
                      <img src={howitworks2} alt="shopingIcon"></img>
                      <h6 className="font14"> Guided Visits</h6>
                      <p>Visit venues on your own or with our venue expert.</p>
                    </div>
                    <div className="cart1">
                      <img src={howitworks3} alt="androidIcon"></img>
                      <h6 className="font14"> Book Venue</h6>
                      <p>
                        Get final quotes (upto 30% off) and book your venue.
                      </p>
                    </div>
                    <div className="cart1">
                      <img src={howitworks4} alt="analyticIcon"></img>
                      <h6 className="font14"> Book Vendors</h6>
                      <p>
                        Meet our trusted vendors and book them at your ease.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
