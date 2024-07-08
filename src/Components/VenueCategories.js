import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/VenueCategories.css";
import { handleError, handleLinkClick } from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  APL_LINK,
  get_home_web,
} from "../ServiceConnection/serviceconnection.js";
const VenueCategories = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [SEOloop, setSEOloop] = useState([]);

  const [GetCatagorie, SetCatagorie] = useState();
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
          handleError(Response.data.message);
        } else {
          SetCatagorie(Response.data.message.catagory_active_data);
          setSEOloop(Response.data.message.venue_seo);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/catagory/catagory_detail/" + v_id;
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
                        <Link
                          onClick={() =>
                            handleLinkClick(
                              match_and_return_seo_link(venue.primary_id)
                            )
                          }
                        >
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
