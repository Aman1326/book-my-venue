import "./Css/Blog.css";
import React, { useState } from "react";
import "../Components/Css/Blog.css";
import blog1 from "../Assets/blogImg1.png";
import blog2 from "../Assets/blogImg2.png";
import blog3 from "../Assets/blogImg3.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as needed
  const cardData = [
    {
      blog_image: blog1,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "2/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
    {
      blog_image: blog2,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "3/January/2024",
    },
    {
      blog_image: blog3,
      blog_title: "What Ever Happened to Steampunk?",
      blog_description:
        "How the iPhone popularized steampunk… and how the iPhone killed it off",
      blog_author_name: "Henry Kane",
      blog_date: "4/January/2024",
    },
  ];

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header />
      <section className="section_wrapper_blog">
        <div className="blog-background">
          <div className="blog-overlay">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 blog_content">
                  <h1>Figma ipsum</h1>
                  <p>
                    Figma ipsum component variant main layer. Ipsum distribute
                    layout invite background auto underline selection text.
                    Stroke slice flows edit underline. Blur auto style plugin
                    select arrow layout create subtract. Scale content align
                    duplicate font flows team. Arrow image underline arrow pen
                    background arrow. Component line pen slice bold style
                    shadow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-12">
              <div className="blog_wrapper">
                <div className="container-sm">
                  <div className="row">
                    {currentItems.map((card, index) => (
                      <div
                        className="col-xl-4 col-lg-4 col-md-6 col-12 g-0"
                        key={index}
                      >
                        <Link
                          to="/blogs_details"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <div
                            className="card blog_content_section"
                            style={{ width: "18rem", margin: "1rem" }}
                          >
                            <img
                              src={card.blog_image}
                              className="card-img-top"
                              alt="Blog"
                            />
                            <div className="card-body ">
                              <h5 className="card-title">{card.blog_title}</h5>
                              <p className="card-text mb-4">
                                {card.blog_description}
                              </p>
                              <div className="blog_text_author">
                                <small className="text-muted">
                                  By {card.blog_author_name}
                                </small>
                                <small>|</small>
                                <small className="text-muted">
                                  {card.blog_date}
                                </small>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pagination controls */}
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      {Array.from({
                        length: Math.ceil(cardData.length / itemsPerPage),
                      }).map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => paginate(index + 1)}
                            className={`page-link pagination-btn ${
                              currentPage === index + 1
                                ? "pagination-btn-orange"
                                : ""
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
