import React from "react";
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
function Home() {
  const venueCategories = [
    { image: venue1, description: "Venue 1 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue2, description: "Venue 2 " },
    { image: venue3, description: "Venue 3 " },
    { image: venue3, description: "Venue 3 " },
    { image: venue4, description: "Venue 4 " },
    { image: venue5, description: "Venue 5 " },
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
        </div>
      </div>
    </div>
  );
}

export default Home;
