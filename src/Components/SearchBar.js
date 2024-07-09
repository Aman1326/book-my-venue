import React, { useState, useEffect } from "react";
import searchIcon from "../Assets/searchIcon.svg";
import locationIcon from "../Assets/locationIcon.svg";
import Select from "react-select";
import "./Css/SearchBar.css";
import line from "../Assets/line.svg";
import {
  server_post_data,
  get_search_bar,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
import {
  handleError,
  handleIaphabetnumberChange,
  handleLinkClick,
} from "../CommonJquery/CommonJquery.js";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const locations = [
    { value: "Use my location", label: "Use my Location" },
    { value: "Chennai", label: "Chennai" },
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Bhopal", label: "Bhopal" },
    // Add more locations as needed
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: "var(--text-grey)",
      fontSize: "14px",
      border: "none",
      boxShadow: "none",
      minHeight: "initial",
      width: "max-content",
      height: "38px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "1",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      borderRadius: "8px",
      width: "max-content",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary-color)"
        : state.isFocused
        ? "#f2f2f2"
        : "white",
      color: state.isSelected ? "white" : "black",
      padding: "8px 30px",
      cursor: "pointer",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      width: "fit-content",
      border: "none",
      borderRadius: "8px",
      color: "var(--text-grey)",
      fontSize: "15px",
    }),
  };

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations122, seLocation] = useState([]);
  const [isSearchActive, setisSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [newproducts, setnewproducts] = useState([]);
  const [productpath, setproductpath] = useState("");
  const [SEOloop, setSEOloop] = useState([]);

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

  useEffect(() => {
    get_all_search_data(0);
  }, []);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const newTimeout = setTimeout(() => {
      if (searchText.trim().length > 2) {
        get_all_search_data(1);
      } else {
        setisSearchActive(false);
      }
    }, 500);
    setSearchTimeout(newTimeout);
    return () => {
      if (newTimeout) {
        clearTimeout(newTimeout);
      }
    };
  }, [searchText]);

  const get_all_search_data = async (flag) => {
    let Data = new FormData();
    Data.append("search_data", searchText);
    Data.append("city_name", selectedLocation);
    await server_post_data(get_search_bar, Data)
      .then(async (Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setSEOloop(Response.data.message.seo_loop);
          if (flag === 0) {
            seLocation(Response.data.message.location_loop);
          } else {
            setnewproducts(Response.data.message.search_fields);
            setproductpath(APL_LINK + Response.data.message.data_admin_image);
            setisSearchActive(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        handleError("Something Went Wrong");
      });
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  return (
    <>
      <div className="searchBar_wrapper">
        <div className="searchBar_container">
          <div className="locationSection_searchbar">
            <img src={locationIcon} alt="loaction" />
            <Select
              id="selectLocation"
              options={locations}
              onChange={handleLocationChange}
              placeholder="Location"
              styles={customStyles}
            />
            <img src={line} alt="line" />
          </div>
          <div className="seachVenue_section_searchbar">
            <img src={searchIcon} alt="search icon" />
            <input
              className="form-control"
              placeholder="Search for Venue, events"
              aria-label="Search for Venue, events"
              type="text"
              maxLength={30}
              onInput={handleIaphabetnumberChange}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {isSearchActive && (
            <div className="searchItems">
              {newproducts.map((item, index) => {
                return (
                  <Link
                    onClick={() =>
                      handleLinkClick(
                        match_and_return_seo_link(item.primary_id)
                      )
                    }
                    key={index}
                  >
                    <div className="itemSearch">
                      <img
                        src={`${productpath}${item.venue_images}`}
                        alt={item.venue_name}
                      />
                      <div>
                        <h6>{item.venue_name}</h6>
                        <p>{item.map_address}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="itemSearch center_justify">
                <div>
                  <h6>No Data Found</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
