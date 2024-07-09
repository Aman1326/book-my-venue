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
} from "../CommonJquery/CommonJquery";
import {
  server_post_data,
  get_like,
  save_like,
  APL_LINK,
} from "../ServiceConnection/serviceconnection.js";
let customer_id = "0";
const Reviews = ({ tabOpen, review }) => {
  customer_id = retrieveData("customer_id");
  const tanOpen = tabOpen;
  const reviews = review;
  const value = 6.6;
  const normalizedValue = value / 10;
  // console.log(reviews);

  const avgRating =
    reviews && reviews.length > 0 && reviews.map((item) => item.rating);
  const totalRating =
    reviews &&
    reviews.length > 0 &&
    avgRating.reduce((sum, rating) => sum + rating, 0);
  const averageRating =
    reviews &&
    reviews.length > 0 &&
    (totalRating / avgRating.length).toFixed(2);
  console.log(averageRating);
  //linear progressbar
  const [progress1, setProgress1] = useState(4);
  const [progress2, setProgress2] = useState(5);
  const [progress3, setProgress3] = useState(6);
  const [progress4, setProgress4] = useState(3);
  const [progress5, setProgress5] = useState(9);
  const [getlikes, setlikes] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const incrementProgress = (setProgress) => {
    setProgress((prevProgress) => (prevProgress >= 10 ? 0 : prevProgress + 1));
  };

  const getProgressPercentage = (progress) => {
    return (progress / 10) * 100;
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
  const [reviewPosted, setReviewPosted] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRating = (rate, index) => {
    const newRatings = [...ratings];
    newRatings[index] = rate;
    setRatings(newRatings);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    setReviewPosted(true);
    handleClose();
  };
  useEffect(() => {
    const allRatingsFilled = ratings.every((rating) => rating > 0);
    const textFilled = reviewText.trim() !== "";
    setIsFormComplete(allRatingsFilled && textFilled);
  }, [ratings, reviewText, tanOpen]);
  useEffect(() => {
    master_data_get();
  }, []);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const handleSaveChangesdynamic = async (form_data, save_like) => {
    // seterror_show("");
    const fd_from = new FormData();
    setshowLoaderAdmin(true);

    fd_from.append("main_id", editorDataMainID);
    fd_from.append("review_id", "1");
    fd_from.append("customer_id", "1");
    await server_post_data(save_like, fd_from)
      .then((Response) => {
        console.log(Response);
        setshowLoaderAdmin(false);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          // handleSuccessSession(Response.data.message, "/admin_news");
        }
      })
      .catch((error) => {
        console.log(error);
        setshowLoaderAdmin(false);
      });
  };
  const master_data_get = async () => {
    // setshowLoaderAdmin(true);
    try {
      const fd = new FormData();

      const response = await server_post_data(get_like, fd);
      console.log(response.data.message);
      if (response.data.error) {
        handleError(response.data.message);
      } else {
        setlikes(response.data.message);
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      // setshowLoaderAdmin(false);
    }
  };
  const handleLikeClick = async (index, id) => {
    handleSaveChangesdynamic(id);
    const updatedIndexes = [...selectedIndexes];
    const selectedIndex = updatedIndexes.indexOf(index);
    if (selectedIndex === -1) {
      updatedIndexes.push(index);
    } else {
      updatedIndexes.splice(selectedIndex, 1);
    }
    setSelectedIndexes(updatedIndexes);
  };
  console.log(getlikes);
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
                    text={`${averageRating}/5.0`}
                    width={"120px"}
                  />
                  <span className="no_reviews">
                    <h6>Fabulous</h6>
                    <p>6166 reviews</p>
                  </span>
                </div>
                <div className="text_rating_sectin">
                  <span>
                    <p>9/5.0</p>
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
                    <p>9/5.0</p>
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
                    <p>9/5.0</p>
                    <p>Ambience</p>
                  </span>
                </div>
              </div>
            </div>
            {/* <div
              className="vr"
              style={{
                width: "1px",
                background: "transparent",
                border: "1px solid black",
                padding: "0rem",
                marginRight: "0.2rem",
              }}
            ></div> */}
            <div className=" col-md-6 d-flex">
              <div className="linear_progressBar_section">
                <div className=" progressbar_text_wrapper">
                  <div className="progress_container">
                    <div
                      className="progress_bar"
                      style={{ width: `${getProgressPercentage(progress1)}%` }}
                    ></div>
                  </div>
                  <div className="progress_text">
                    <span>5</span>
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
                    <span>4</span>
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
                    <span>3</span>
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
                    <span>2</span>
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
                    <span>1</span>
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
                      onClick={() => handleLikeClick(index)}
                      type="submit"
                    >
                      <img
                        src={selectedIndexes.includes(index) ? likeRed : like}
                        alt="like"
                      />
                      <p style={{ marginLeft: "4px" }}>Like</p>
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
          <div className="write_review_button" onClick={handleShow}>
            <button>{reviewPosted ? "Edit Review" : "Write a Review"}</button>
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
            XYZ venue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user_detail_section">
            <div className="user_image">
              <img src={profile} alt="profile" />
            </div>
            <div className="user_details">
              <h6>Username </h6>
              <p>Posting Publicly </p>
            </div>
          </div>
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
              className="form-control"
              rows={3}
              value={reviewText}
              placeholder="Share details of your own experience at this place"
              onChange={handleReviewTextChange}
            />
          </div>
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
            onClick={handleSubmit}
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
