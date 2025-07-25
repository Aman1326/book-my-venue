import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { handleError, handleLinkClick } from "../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_home_web,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
const BrowseCity = () => {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [GetCitys, SetCitys] = useState();
  const [SEOloop, setSEOloop] = useState([]);
  //browse cities section
  useEffect(() => {
    const flag = "1";
    const call_id = "0";
    master_data_get(flag, call_id);
  }, []);
  const master_data_get = async (flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("flag", "3");
    fd.append("call_id", call_id);
    await server_post_data(get_home_web, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          SetCitys(Response.data.message.city_active_data);
          setSEOloop(Response.data.message.data_seo);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/city/city_detail/" + v_id;
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
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      {/* browse other cities */}
      <section>
        <div className="browse_otherCities_section">
          <div className="container-lg">
            <div className="browse_otherCities_heading">
              <h2>Browse Other Cities </h2>
            </div>
            <div className="cities_mapped ">
              <Slider {...settings}>
                {!GetCitys
                  ? []
                  : GetCitys.map((venue, index) => (
                      <div key={index} className="city-item">
                        <Link
                          onClick={() =>
                            handleLinkClick(
                              match_and_return_seo_link(venue.primary_id)
                            )
                          }
                        >
                          <img
                            className="city-image"
                            src={APL_LINK + "/assets/" + venue.image1}
                            alt={`Venue ${index + 1}`}
                          />
                        </Link>
                        <div className="city-description">{venue.city}</div>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseCity;
