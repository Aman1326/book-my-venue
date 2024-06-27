import React from "react";
import mainLogo from "../Assets/mainLogo.png";
import "./Css/Footer.css";
import logo1 from "../Assets/fb_logo.svg";
import logo2 from "../Assets/twitter_logo.svg";
import logo3 from "../Assets/yt_link.svg";
import logo4 from "../Assets/ig_logo.svg";
import logo5 from "../Assets/linkedIn_logo.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer_section">
      <div className="container">
        <div className="row row_footer">
          <div className="col-lg-3">
            <div className="left_section_footer">
              <img src={mainLogo} alt="mainlogo" />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="footer_about_my_venue">
              <strong>
                <p className="heading_text_footerlinks">About Book My Venue</p>
              </strong>

              <ul>
                <li>Contact </li>
                <li>Blog </li>
                <li>Are you a Venue Owner? </li>
                <li>Frequently asked Question </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="footer_learn_more">
              <strong>
                <p className="heading_text_footerlinks"> Learn More</p>
              </strong>
              <ul>
                <li>Terms of Use</li>
                <li>Privacy and Cookies statement</li>
                <li>Cookie consent</li>
              </ul>
              <strong>Social links</strong>
              <ul className="social_links">
                <li>
                  <Link>
                    <img src={logo1} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    {" "}
                    <img src={logo2} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={logo3} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    {" "}
                    <img src={logo4} alt="logo1" />
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src={logo5} alt="logo1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="col-lg-10 post_footer_text">
            <p>
              Promotional offers are subject to conditions displayed on the
              restaurant’s page. Offers on alcoholic beverages are strictly
              reserved for adults. Alcohol abuse is dangerous for your health.
              Drink with moderation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
