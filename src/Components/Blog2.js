import React from "react";
import Header from "./Header";
import "./Css/Blog2.css";
import img1 from "../Assets/imageGallery3.png";
import ListYourVenue from "./ListYourVenue";
import Footer from "./Footer";
const Blog2 = () => {
  return (
    <>
      <Header />
      <div className="blog2_section">
        <div className="container">
          <div className="row blog2_section_heading headingMargin">
            <h1>9 joyous drag brunch restaurants to book this Pride in NYC</h1>
          </div>
          <div className="blog_heading_name_date">
            <p>Person1 name</p>
            <p>|</p>
            <p>2nd January,2022</p>
          </div>
          <div className="main_picture_blog2 col-xl-10 col-lg-10 m-auto">
            <img src={img1} alt="img1" />
          </div>

          <div
            className="col-lg-10 m-auto mt-5"
            style={{ textAlign: "justify" }}
          >
            If you’re thinking of starting a blog of your own, but just don’t
            have a clue on what to blog about, then fear not! In this article, I
            have included a whole load of blog examples from a wide variety of
            different niches, all run on different blogging platforms like
            WordPress, Joomla! and Drupal.
            <br />
            <br /> Since the beginning of the internet, millions and millions
            and millions of blogs have been created. Many have died due to lost
            interest or their owners giving up on the idea, while others have
            thrived and continue to grow, making money and earning their owners
            a steady income. It’s a constant evolution of content that keeps
            people coming back for more, especially if these blogs contact
            highly resourceful material that people find useful and interesting.
            Each example listed in this blog post are all different in some way
            and all bring something unique to their readers & subscribers. I
            want to show you what is possible and how you can take inspiration
            from them and create an awesome blog of your own.
            <br />
            <br /> Some of these blogs make over $100k a month, others are just
            a hobby for their owners, but all have the same purpose at their
            core… the love of writing and sharing information. Some of these
            blogs make over $100k a month, others are just a hobby for their
            owners, but all have the same purpose at their core… the love of
            writing and Some of these blogs make over $100k a month, others are
            just a hobby for their owners, but all have the same purpose at
            their core… the love of writing and sharing information. Some of
            these blogs make over $100k a month, others are just a hobby for
            their owners, but all have the same purpose at their core… the love
            of writing and sharing information.
          </div>
          <div className="col-lg-3 mt-5">
            <h6>Shedrack Eze</h6>
            <p>CEO Team App</p>
          </div>
          <div className="list_your_venue_blog2Page">
            <ListYourVenue />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blog2;
