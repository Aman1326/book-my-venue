const express = require("express");
const app = express();
const port = 7993;
const path = require("path");
const fs = require("fs");
const axios = require("axios");

let seoData_final = {
  title_seo: "BookMyVenues.ai - Your Ultimate Venue Booking Platform for Weddings, Corporate Events, and More",
  description_seo:
    "Discover Bookmyvenues.ai, the ultimate platform for booking venues for weddings, corporate events, photoshoots, and more. Enjoy detailed listings, user reviews, and advanced search filters to find the perfect space effortlessly.",
  keyword_seo:
    "venue booking, online venue booking, wedding venues, corporate event venues, photoshoot locations, yoga session venues, bookmyvenues, BMV.AI, venue search, venue listings, event planning, venue rental, seamless booking, user reviews, advanced search filters",
  image_seo: "https://www.bookmyvenue.ai/logo192.png",
  url_seo: "https://www.bookmyvenue.ai",
};

let seo_callink = "https://backend.bookmyvenue.ai/api/admin_link/get_seo_by_url";

app.get("/", async function (request, response) {
  const filePath = path.resolve(__dirname, "", "index.html");
  let url_got = request.originalUrl;
  let seoData = seoData_final;
  try {
    const apiResponse = await axios.post(
      seo_callink,
      { current_url: url_got },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const seoDataFromApi = apiResponse.data.message;
    console.log(seoDataFromApi)
    if (seoDataFromApi.seo_list.length > 0) {
      seoData = {
        title_seo: seoDataFromApi.seo_list[0].title_name,
        description_seo: seoDataFromApi.seo_list[0].description,
        keyword_seo: seoDataFromApi.seo_list[0].keywords,
        image_seo: seoDataFromApi.seo_list[0].favicon,
        url_seo: seoDataFromApi.seo_list[0].canonical_url,
      };
    }
  } catch (error) {
    ///err
  }

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, seoData.title_seo);
    data = data.replace(/\$OG_DESCRIPTION/g, seoData.description_seo);
    data = data.replace(/\$OG_Keyword/g, seoData.keyword_seo);
    data = data.replace(/\$OG_URL/g, seoData.url_seo);
    const result = data.replace(/\$OG_IMAGE/g, seoData.image_seo);
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, "")));
app.get("*", async function (request, response) {
  const filePath = path.resolve(__dirname, "", "index.html");
  let url_got = request.originalUrl;
  let seoData = seoData_final;
  try {
    const apiResponse = await axios.post(
      seo_callink,
      { current_url: url_got },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const seoDataFromApi = apiResponse.data.message;
    console.log(seoDataFromApi)
    if (seoDataFromApi.seo_list.length > 0) {
      seoData = {
        title_seo: seoDataFromApi.seo_list[0].title_name,
        description_seo: seoDataFromApi.seo_list[0].description,
        keyword_seo: seoDataFromApi.seo_list[0].keywords,
        image_seo: seoDataFromApi.seo_list[0].favicon,
        url_seo: seoDataFromApi.seo_list[0].canonical_url,
      };
    }
  } catch (error) {
    console.log(error);
    ///err
  }

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, seoData.title_seo);
    data = data.replace(/\$OG_DESCRIPTION/g, seoData.description_seo);
    data = data.replace(/\$OG_Keyword/g, seoData.keyword_seo);
    data = data.replace(/\$OG_URL/g, seoData.url_seo);
    const result = data.replace(/\$OG_IMAGE/g, seoData.image_seo);
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
