const request = require("supertest");
const expect = require("chai").expect;

const URL = "https://restful-booker.herokuapp.com";
const createTokenEndpoint = "/auth";
const createBookingEndpoint = "/booking";
const getBookingEndpoint = "/booking";
const updateBookingEndpoint = "/booking";
const deleteBookingEndpoint = "/booking";

let header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let token = "";
let bookingId = "";

describe("E2E Test Restful Booker", async function () {
  /**
   * hit API create token
   */
  it("Ensure api Create Token successfully send the request", async () => {
    //send the request
    this.timeout(60000);
    let payload = {
      username: "admin",
      password: "password123",
    };
    const response = await request(URL).post(createTokenEndpoint).send(payload);

    //assertion
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("token");

    //store the token into variable
    token = response.body.token;
  });

  /**
   * create booking
   */
  it("Ensure api Create Booking successfully send the request", async () => {
    //send the request
    this.timeout(60000);
    let payload = {
      firstname: "Herdian",
      lastname: "Chandra",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-01-01",
        checkout: "2025-01-01",
      },
      additionalneeds: "Breakfast",
    };
    const response = await request(URL)
      .post(createBookingEndpoint)
      .set(header)
      .send(payload);

    //assertion
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("bookingid");

    //store the bookingId into variable
    bookingId = response.body.bookingid;
  });

  /**
   * get booking by Id
   */
  it("Ensure api Get Booking By Id sucessfully send the request with Id", async () => {
    //send the request
    this.timeout(60000);
    let newEndpoint = `${getBookingEndpoint}/${bookingId}`;
    const response = await request(URL).get(newEndpoint).set(header);

    //assertion
    expect(response.statusCode).to.eql(200);
  });

  /**
   * update booking by Id
   */
  it("Ensure api Update Booking successfully send the request", async () => {
    //send the request
    this.timeout(60000);
    let payload = {
      firstname: "James",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    };
    let newEndpoint = `${updateBookingEndpoint}/${bookingId}`;
    const response = await request(URL)
      .put(newEndpoint)
      .set(header)
      .set("Cookie", "token=" + token)
      .send(payload);

    //assertion
    expect(response.statusCode).to.eql(200);
  });

  /**
   * delete booking by Id
   */
  it("Ensure api Delete Booking successfully send the request", async () => {
    //send the request
    this.timeout(60000);
    let newEndpoint = `${deleteBookingEndpoint}/${bookingId}`;
    const response = await request(URL)
      .delete(newEndpoint)
      .set("Cookie", "token=" + token);

    //assertion
    expect(response.statusCode).to.eql(201);
  });
});
