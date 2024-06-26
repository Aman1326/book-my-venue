import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Home";
import GetHelp from "./Components/GetHelp";
import RegistermyVenue from "./Components/RegistermyVenue";
import Venue from "./Components/Venue";
import DetailedVenue from "./Components/DetailedVenue";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getHelp" element={<GetHelp />} />
          <Route path="/register" element={<RegistermyVenue />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/detailedVenue" element={<DetailedVenue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
