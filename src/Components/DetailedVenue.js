import React, { useState } from "react";
import "./Css/DetailedVenue.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import img1 from "../Assets/imageGallery3.png";
import img2 from "../Assets/imageGallery1.png";
import img3 from "../Assets/imageGallery2.png";
import img4 from "../Assets/view_more_image.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const DetailedVenue = () => {
  const Venue_tags = [
    "Wedding ",
    "Engagement",
    "Corporate Event",
    "Birthday Party",
  ];
  // react tabs:
  const [activeTab, setActiveTab] = useState("about");
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
              <div className="tab-content">
                {activeTab === "about" && (
                  <div className="tab-pane">
                    <h2>About</h2>
                    <p>This is the about section content.</p>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="tab-pane">
                    <h2>Reviews</h2>
                    <p>This is the reviews section content.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailedVenue;
