const request = require("supertest");
const URL = "https://restful-booker.herokuapp.com";

const restfulBooker = {
  createToken: (data) =>
    request(URL)
      .post("/auth")
      .set("Content-Type", "application/json")
      .send(data),

  createBooking: (data) =>
    request(URL)
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(data),

  getBookingById: (param) =>
    request(URL)
      .get("/booking/" + param)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json"),

  updateBooking: (param, token, data) =>
    request(URL)
      .put("/booking/" + param)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Cookie", "token=" + token)
      .send(data),

  deleteBooking: (token, param) =>
    request(URL)
      .delete("/booking/" + param)
      .set("Cookie", "token=" + token),
};

module.exports = restfulBooker;
