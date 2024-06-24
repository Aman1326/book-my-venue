import React from "react";
import mainLogo from "../Assets/mainLogo.png";
import "./Css/Footer.css";
import logo1 from "../Assets/fb_logo.svg";
import logo2 from "../Assets/twitter_logo.svg";
import logo3 from "../Assets/yt_link.svg";
import logo4 from "../Assets/ig_logo.svg";
import logo5 from "../Assets/linkedIn_logo.svg";
const Footer = () => {
  return (
    <div className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
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
              <p>
                <strong>About Book My Venue</strong>
              </p>
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
              <strong>Learn More</strong>
              <ul>
                <li>Terms of Use</li>
                <li>Privacy and Cookies statement</li>
                <li>Cookie consent</li>
              </ul>
              <strong>Social links</strong>
              <ul className="social_links">
                <li>
                  <img src={logo1} alt="logo1" />
                </li>
                <li>
                  <img src={logo2} alt="logo1" />
                </li>
                <li>
                  <img src={logo3} alt="logo1" />
                </li>
                <li>
                  <img src={logo4} alt="logo1" />
                </li>
                <li>
                  <img src={logo5} alt="logo1" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
