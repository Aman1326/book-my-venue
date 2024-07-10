import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Css/Reviews.css";
import profile from "../Assets/userReviewProfilImg.svg";
import like from "../Assets/like.svg";
import likeRed from "../Assets/likeRed.svg";
import flag from "../Assets/flag.svg";
import star from "../Assets/star2.svg";
import { Modal, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { retrieveData, storeData } from "../LocalConnection/LocalConnection.js";
import {
  inputdateformateChange,
  handleError,
  check_vaild_save,
  combiled_form_data,
  handleIaphabetnumberChange,
  handleSuccess,
  empty_form,
} from "../CommonJquery/CommonJquery";
import {
  server_post_data,
  save_like,
  save_review,
} from "../ServiceConnection/serviceconnection.js";
let customer_id = "0";
let customer_name = "0";
const Reviews = ({ tabOpen, review, venuedata, reviews_like_get_data }) => {
  customer_id = retrieveData("customer_id");
  customer_name = retrieveData("customer_name");
  const tanOpen = tabOpen;
  const value = 6.6;
  const normalizedValue = value / 10;
  // console.log(reviews);
  const [reviews, setreviews] = useState(review);
  const [progress1, setProgress1] = useState(1);
  const [progress2, setProgress2] = useState(2);
  const [progress3, setProgress3] = useState(3);
  const [progress4, setProgress4] = useState(4);
  const [progress5, setProgress5] = useState(5);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);

  const getProgressPercentage = (progress) => {
    return (progress / 5) * 100;
  };

  // // load more reviews:
  const initialReviewsToShow = 3;
  const incrementAmount = 5;
  const [reviewsToShow, setReviewsToShow] = useState(initialReviewsToShow);

  const handleLoadMore = () => {
    setReviewsToShow(reviewsToShow + incrementAmount);
  };

  // reviews modal
  // rating system
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState([0, 0, 0, 0]);
  const [reviewText, setReviewText] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const handleClose = () => setShowModal(false);

  const handleRating = (rate, index) => {
    const newRatings = [...ratings];
    newRatings[index] = rate;
    setRatings(newRatings);
  };
  useEffect(() => {
    const allRatingsFilled = ratings.every((rating) => rating > 0);
    const textFilled = reviewText.trim() !== "";
    console.log(allRatingsFilled);
    setIsFormComplete(allRatingsFilled && textFilled);
  }, [ratings, reviewText, tanOpen]);

  const handleSaveChangesdynamic = async (form_data, save_venueowner) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);
      ratings.map((item, index) => {
        fd_from.append(`ratings${index}`, item);
      });
      fd_from.append("comment_show", reviewText);
      fd_from.append("customer_name", customer_name);
      fd_from.append("customer_id", customer_id);
      fd_from.append("venue_id", venuedata.primary_id);
      await server_post_data(save_venueowner, fd_from)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            handleClose();
            handleSuccess(Response.data.message);
            empty_form(form_data);
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    }
  };
  const like_save = async (primary_id, index) => {
    // seterror_show("");
    const fd_from = new FormData();
    setshowLoaderAdmin(true);
    fd_from.append("review_id", primary_id);
    fd_from.append("customer_id", customer_id);
    fd_from.append("venue_id", venuedata.primary_id);
    await server_post_data(save_like, fd_from)
      .then((Response) => {
        setshowLoaderAdmin(false);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          const updatedIndexes = [...selectedIndexes];
          const selectedIndex = updatedIndexes.indexOf(index);
          if (selectedIndex === -1) {
            updatedIndexes.push(index);
          } else {
            updatedIndexes.splice(selectedIndex, 1);
          }
          setSelectedIndexes(updatedIndexes);
        }
      })
      .catch((error) => {
        console.log(error);
        setshowLoaderAdmin(false);
      });
  };

  const check_login_or_not = (primary_id, index, click_type) => {
    if (customer_id !== "0") {
      if (click_type === "0") {
        like_save(primary_id, index);
      } else {
        setShowModal(true);
      }
    } else {
      var event = new CustomEvent("customEvent");
      document.getElementById("login_check_jquery").dispatchEvent(event);
    }
  };

  return (
    <>
      <section className="reviews_section">
        <div className="container">
          <h3>Reviews</h3>
          <div className="review_wrapper mt-5 row">
            <div
              className="col-md-6 left_section_circularProgressBar"
              style={{
                borderRight: "1px solid black",
                padding: "0rem",
              }}
            >
              <div className="circular_review_wrapper">
                <div className="Circualr_progressBar_section">
                  <CircularProgressbar
                    value={normalizedValue}
                    maxValue={1}
                    text={`${venuedata.rating}/5.0`}
                    width={"120px"}
                  />
                  <span className="no_reviews">
                    <h6>Fabulous</h6>
                    <p>{venuedata.total_reviews} reviews</p>
                  </span>
                </div>
                <div className="text_rating_sectin">
                  <span>
                    <p>{venuedata.total_location_rating_sum}/5.0</p>
                    <p>Location</p>
                  </span>
                  <div
                    className="vr"
                    style={{
                      width: "1px",
                      background: "transparent",
                      border: "1px solid black",
                      padding: "0rem",
                      marginRight: "0.2rem",
                    }}
                  ></div>
                  <span>
                    <p>{venuedata.total_service_rating_sum}/5.0</p>
                    <p>Service</p>
                  </span>
                  <div
                    className="vr"
                    style={{
                      width: "1px",
                      background: "transparent",
                      border: "1px solid black",
                      padding: "0rem",
                      marginRight: "0.2rem",
                    }}
                  ></div>
                  <span>
                    <p>{venuedata.total_ambience_rating_sum}/5.0</p>
                    <p>Ambience</p>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="linear_progressBar_section">
                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress1)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>{progress1}</span>
                    <img src={star} alt="Star" />
                  </div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress2)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>{progress2}</span>
                    <img src={star} alt="Star" />
                  </div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress3)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>{progress3}</span>
                    <img src={star} alt="Star" />
                  </div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress4)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>{progress4}</span>
                    <img src={star} alt="Star" />
                  </div>
                </div>

                <div className="progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress5)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>{progress5}</span>
                    <img src={star} alt="Star" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {reviews &&
            reviews.length > 0 &&
            reviews.slice(0, reviewsToShow).map((review, index) => (
              <div key={index} className="user_review_container">
                <div className="user_review_wrapper">
                  <div>
                    <img src={profile} alt="profile" />
                  </div>
                  <div className="user_review_rowcontainer">
                    <div className="">
                      <div className="user_review_rowcontainer_name">
                        <h6>{review.customer_name}</h6>
                        <desc>{review.no_of_reviews}</desc>
                      </div>
                      <div className="user_review_rowcontainer_date">
                        {inputdateformateChange(review.entry_date)}
                      </div>
                    </div>
                    <div>{review.rating}/5.0</div>
                  </div>
                </div>
                <div className="user_review_description">
                  <p>{review.comment}</p>
                </div>
                <div className="user_review_like_report_section">
                  <span className="user_review_like">
                    <button
                      className="d-flex align-items-center"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() =>
                        check_login_or_not(review.primary_id, index, "0")
                      }
                      type="button"
                    >
                      {(() => {
                        let value_like = false;
                        let fsdfsdf = selectedIndexes[index];

                        reviews_like_get_data.forEach((item) => {
                          if (review.primary_id === item.review_id) {
                            value_like = true;
                          }
                        });

                        return !value_like || !fsdfsdf ? (
                          <>
                            <img src={like} alt="like" />
                            <p style={{ marginLeft: "4px" }}>like</p>
                          </>
                        ) : (
                          <>
                            <img
                              src={likeRed}
                              alt="likeRed"
                              className="LikeImgg"
                            />
                            <p style={{ marginLeft: "4px" }}>Unlike</p>
                          </>
                        );
                      })()}
                    </button>
                  </span>
                  {/* <span className="user_review_like">
                    <img src={flag} alt="flag" />
                    <p>Report</p>
                  </span> */}
                </div>
                <hr />
              </div>
            ))}
          {tanOpen == "reviews" && (
            <>
              {reviews.length > reviewsToShow && (
                <div className="write_review_button">
                  <button id="load_more_button" onClick={handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
          <div
            className="write_review_button"
            onClick={() => check_login_or_not("0", "0", "1")}
          >
            <button>Write a Review</button>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "var(--primary-color)",
              fontWeight: "600",
              fontFamily: "Roboto",
            }}
          >
            {venuedata.venue_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user_detail_section">
            <div className="user_image">
              <img src={profile} alt="profile" />
            </div>
            <div className="user_details">
              <h6>{customer_name} </h6>
              <p>Posting Publicly </p>
            </div>
          </div>
          <form className="venue-registration-form" id="vanueregistration">
            <div className="stars_rating_section">
              {["Overall", "Location ", "Service", "Ambience"].map(
                (label, index) => (
                  <div key={index} className="mb-3 stars_text_wrapper">
                    <label>{label}</label>
                    <Rating
                      onClick={(rate) => handleRating(rate, index)}
                      ratingValue={ratings[index]}
                      size={30}
                      label
                      transition
                      fillColor="var(--primary-color)"
                      emptyColor="gray"
                    />
                  </div>
                )
              )}
            </div>
            <div className="mb-3">
              <textarea
                rows={3}
                maxLength={300}
                id="comment"
                name="comment"
                onChange={(e) => setReviewText(e.target.value)}
                className="form-control trio_mandatory"
                placeholder="Share details of your own experience at this place"
                onInput={handleIaphabetnumberChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "grey" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleSaveChangesdynamic("vanueregistration", save_review)
            }
            style={{
              backgroundColor: isFormComplete ? "var(--primary-color)" : "grey",
              outline: "none",
              border: "none",
              color: "var(--white)",
              padding: "0.43rem 1rem",
            }}
            disabled={!isFormComplete}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reviews;
