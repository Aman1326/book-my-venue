import React from "react";
import venue1 from "../Assets/Ellipse-1-_6_.webp";
import venue2 from "../Assets/Ellipse-1-_2__1.webp";
import venue3 from "../Assets/Ellipse-1-_3__1.webp";
import venue4 from "../Assets/venue4.webp";
import venue5 from "../Assets/venue5.webp";
import { Link } from "react-router-dom";
import "./Css/VenueCategories.css";
const VenueCategories = () => {
  const venueCategories = [
    { image: venue1, description: "WEDDING" },
    { image: venue1, description: "ENGAGEMENT " },
    { image: venue2, description: "BIRTHDAY" },
    { image: venue2, description: "CORPORATE EVENT" },
    { image: venue2, description: "PHOTOSHOOT" },
    { image: venue3, description: "YOGA SESSION" },
    { image: venue3, description: "MEETING" },
    { image: venue4, description: "FILM SHOOT" },
  ];
  return (
    <>
      {/* venue categories section */}
      <section>
        <div className="venueCategor_section">
          <div className="container-lg">
            <div className="venueCategories">
              <div className="venue-row">
                {venueCategories.map((venue, index) => (
                  <div key={index} className="venue-item">
                    <Link to="/venue">
                      <img
                        className="venue-image"
                        src={venue.image}
                        alt={`Venue ${index + 1}`}
                      />
                    </Link>
                    <div className="venue-description">{venue.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VenueCategories;
