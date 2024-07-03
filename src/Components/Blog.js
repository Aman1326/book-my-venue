import React, { useState, useEffect } from "react";
import "./Css/Blog.css";
import "../Components/Css/Blog.css";
import blog1 from "../Assets/blogImg1.png";
import blog2 from "../Assets/blogImg2.png";
import blog3 from "../Assets/blogImg3.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import {
  server_post_data,
  get_home_web,
} from "../ServiceConnection/serviceconnection";
import { inputdateformateChange } from "../CommonJquery/CommonJquery";
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as needed
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [blogs, setBlogs] = useState(false);
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

  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    console.log("master_data_get");
    setshowLoaderAdmin(true);
    const fd = new FormData();
    await server_post_data(get_home_web, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message);
          setBlogs(Response.data.message.blog_active_data);
        }
        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
        console.log(error);
      });
  };

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="container-lg">
          <div className="blogHeading">
            {" "}
            <h3>Read more logo posts on our blog</h3>
          </div>
        </div>
        <div className="container-lg">
          <div className="blog_wrapper">
            <div>
              <div className="row m-0">
                {currentItems.map((card, index) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <Link
                      to="/blogs_details"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div className="card blog_content_section">
                        <img src={card.image_name} alt="Blog" />
                        <div className="card-body ">
                          <h5 className="card-title">{card.title_name}</h5>
                          <p className="card-text mb-4">{card.tag_line}</p>
                          <div className="blog_text_author">
                            <small className="text-muted">
                              By {card.author}
                            </small>
                            <small>|</small>
                            <small className="text-muted">
                              {inputdateformateChange(card.entry_date)}
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
            <div className="d-flex justify-content-center  paginationBlogs">
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
      </section>
      <Footer />
    </>
  );
};

export default Blog;
