import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Components/Home";
import GetHelp from "./Components/GetHelp";
import RegistermyVenue from "./Components/RegistermyVenue";
import Venue from "./Components/Venue";
import DetailedVenue from "./Components/DetailedVenue";
import AboutUs from "./Components/AboutUs";
import TermsOfuse from "./Components/TermsOfUse";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import ProfilePage from "./Components/ProfilePage";
import FavouriteVenue from "./Components/FavouriteVenue";
import EnquiryVenue from "./Components/EnquiryVenue";
import Blog from "./Components/Blog";
import Blog2 from "./Components/Blog2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getHelp" element={<GetHelp />} />
          <Route path="/registerMyVenue" element={<RegistermyVenue />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/termsOfUse" element={<TermsOfuse />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favouriteVenues" element={<FavouriteVenue />} />
          <Route path="/venueEnquiry" element={<EnquiryVenue />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/catagory/catagory_detail/:id" element={<Venue />} />
          <Route path="/blog/blog_detail/:id" element={<Blog2 />} />
          <Route path="/venue/venue_detail/:id" element={<DetailedVenue />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
