import axios from "axios";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const appauth_key = "logoacedamy@2029";
let APL_LINK = "http://192.168.1.30:8000";
// let Website_URL = "https://www.logoacademy.co/";
let local_server_link_react = APL_LINK + "/api/web_link/";

const retrievedAdminId = retrieveData("admin_id");
//get apis
const get_home_one_webapp = local_server_link_react + "get_home_one_webapp/";
const get_enquiry_now = local_server_link_react + "get_enquiry_now/";
const save_enquiry_now = local_server_link_react + "save_enquiry_now/";
const get_home_web = local_server_link_react + "get_home_web/";
const get_venue_details_url =
  local_server_link_react + "get_venue_details_url/";
const get_blog_details_url = local_server_link_react + "get_blog_details_url/";
const get_blog_data_website =
  local_server_link_react + "get_blog_data_website/";
const get_venue_catagory_data_url =
  local_server_link_react + "get_venue_catagory_data_url/";
//save apis

const save_favourite = local_server_link_react + "save_favourite/";
const save_venueowner = local_server_link_react + "save_venueowner/";

const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  if (form_data === null) {
    form_data = new FormData();
  }
  form_data.append("appauth_key", appauth_key);
  if (form_data.get("data_call") !== null) {
    form_data.append("call_id", retrievedAdminId);
  }
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
};
