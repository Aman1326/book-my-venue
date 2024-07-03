import { useState, useEffect } from "react";
import venue1 from "../Assets/Ellipse-1-_6_.webp";
import venue2 from "../Assets/Ellipse-1-_2__1.webp";
import venue3 from "../Assets/Ellipse-1-_3__1.webp";
import venue8 from "../Assets/xyz1.svg";
import venue6 from "../Assets/xyz2.svg";
import venue7 from "../Assets/xyz3.svg";
import venue9 from "../Assets/xyz4.svg";
import venue4 from "../Assets/venue4.webp";
import venue5 from "../Assets/venue5.webp";
import { Link } from "react-router-dom";
import "./Css/VenueCategories.css";
import { handleError } from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_home_web,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
const VenueCategories = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  const [GetCatagorie, SetCatagorie] = useState();
  useEffect(() => {
    const flag = "1";
    const call_id = "0";
    master_data_get(flag, call_id);
  }, []);

  //get data
  const master_data_get = async (flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("flag", flag);
    fd.append("call_id", call_id);
    await server_post_data(get_home_web, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message.title_name);
        } else {
          SetCatagorie(Response.data.message.catagory_active_data);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  return (
    <>
      {/* venue categories section */}
      <section>
        <div className="venueCategor_section">
          <div className="container-lg">
            <div className="venueCategories">
              <div className="venue-row">
                {!GetCatagorie
                  ? []
                  : GetCatagorie.map((venue, index) => (
                      <div key={index} className="venue-item">
                        <Link to="/venue">
                          <img
                            className="venue-image"
                            src={
                              APL_LINK +
                              "/assets/" +
                              venue.category_master_image
                            }
                            alt={`Venue ${index + 1}`}
                          />
                        </Link>
                        <div className="venue-description">
                          {venue.category_master_name}
                        </div>
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
