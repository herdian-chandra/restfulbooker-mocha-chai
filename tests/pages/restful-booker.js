const baseRequest = require("../utils/base-request");

const restfulBooker = {
  createToken: (data) => baseRequest.post("/auth").send(data),
  createBooking: (data) => baseRequest.post("/booking").send(data),
  getBookingById: (param) => baseRequest.get("/booking/" + param),
  udpateBookoing: (param, token, data) =>
    baseRequest
      .put("/booking/" + param)
      .set("Cookie", "token=" + token)
      .send(data),
  deleteBooking: (token, param) =>
    baseRequest.delete("/booking/" + param).set("Cookie", "token=" + token),
};

module.exports = restfulBooker;
