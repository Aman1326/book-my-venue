import axios from "axios";
const appauth_key = "bookmyvenue@2029";
// let APL_LINK = "http://192.168.1.14:8000/";
let APL_LINK = "https://backend.bookmyvenue.ai/";
let local_server_link_react = APL_LINK + "api/web_link/";
//get apis
const get_home_one_webapp = local_server_link_react + "get_home_one_webapp/";
const get_enquiry_now = local_server_link_react + "get_enquiry_now/";
const save_enquiry_now = local_server_link_react + "save_enquiry_now/";
const get_home_web = local_server_link_react + "get_home_web/";
const get_profile = local_server_link_react + "get_profile/";
const get_all_faq = local_server_link_react + "get_all_faq/";
const get_like = local_server_link_react + "get_like/";
const get_myenquiry = local_server_link_react + "get_myenquiry/";
const get_venue_details_url =
  local_server_link_react + "get_venue_details_url/";
const get_blog_details_url = local_server_link_react + "get_blog_details_url/";
const get_favourite = local_server_link_react + "get_favourite/";
const get_all_website_list = local_server_link_react + "get_all_website_list/";
const get_blog_data_website =
  local_server_link_react + "get_blog_data_website/";
const get_venue_catagory_data_url =
  local_server_link_react + "get_venue_catagory_data_url/";
const get_filter_data = local_server_link_react + "get_filter_data/";
//save apis

const save_favourite = local_server_link_react + "save_favourite/";
const save_venueowner = local_server_link_react + "save_venueowner/";
const update_profile = local_server_link_react + "update_profile/";
const customer_login = local_server_link_react + "customer_login/";
const save_like = local_server_link_react + "save_like/";
const get_search_bar = local_server_link_react + "get_search_bar/";
const save_review = local_server_link_react + "save_review/";
const get_seo_data_website = local_server_link_react + "get_seo_data_website/";
const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  if (form_data === null) {
    form_data = new FormData();
  }
  form_data.append("appauth_key", appauth_key);
  return axios.post(url_for, form_data);
};

export {
  APL_LINK,
  // Website_URL,
  appauth_key,
  server_post_data,
  get_home_one_webapp,
  get_home_web,
  get_blog_data_website,
  get_blog_details_url,
  get_venue_details_url,
  save_venueowner,
  get_venue_catagory_data_url,
  save_enquiry_now,
  get_enquiry_now,
  save_favourite,
  update_profile,
  get_profile,
  get_favourite,
  get_all_faq,
  get_all_website_list,
  customer_login,
  get_like,
  save_like,
  get_search_bar,
  get_filter_data,
  get_myenquiry,
  save_review,
  get_seo_data_website,
};
