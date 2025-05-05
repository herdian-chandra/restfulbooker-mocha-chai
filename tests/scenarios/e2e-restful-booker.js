const expect = require("chai").expect;
const restfulBooker = require("../pages/restful-booker");

const dataToken = require("../data/e2e/create-token.json");
const dataBooking = require("../data/e2e/create-booking.json");
const updateBooking = require("../data/e2e/update-booking.json");

let token = "";
let bookingId = "";

describe("E2E Test Restful Booker", async function () {
  /**
   * hit API create token
   */
  it("Ensure api Create Token successfully send the request", async function () {
    //send the request
    this.timeout(60000);
    const response = await restfulBooker.createToken(dataToken);
    //assertion
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("token");
    //store the token into variable
    token = response.body.token;
  });

  /**
   * create booking
   */
  it("Ensure api Create Booking successfully send the request", async function () {
    //send the request
    this.timeout(60000);
    const response = await restfulBooker.createBooking(dataBooking);
    //assertion
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("bookingid");
    expect(response.body.booking.firstname).to.eql(dataBooking.firstname);
    expect(response.body.booking.lastname).to.eql(dataBooking.lastname);
    expect(response.body.booking.totalprice).to.eql(dataBooking.totalprice);
    expect(response.body.booking.additionalneeds).to.eql(
      dataBooking.additionalneeds
    );
    //store the bookingId into variable
    bookingId = response.body.bookingid;
  });

  /**
   * get booking by Id
   */
  it("Ensure api Get Booking By Id sucessfully send the request with Id", async function () {
    //send the request
    this.timeout(60000);
    const response = await restfulBooker.getBookingById(bookingId);
    //assertion
    expect(response.statusCode).to.eql(200);
  });

  /**
   * update booking by Id
   */
  it("Ensure api Update Booking successfully send the request", async function () {
    //send the request
    this.timeout(60000);
    const response = await restfulBooker.udpateBookoing(
      bookingId,
      token,
      updateBooking
    );
    //assertion
    expect(response.statusCode).to.eql(200);
    expect(response.body.firstname).to.eql(updateBooking.firstname);
    expect(response.body.lastname).to.eql(updateBooking.lastname);
    expect(response.body.additionalneeds).to.eql(updateBooking.additionalneeds);
  });

  /**
   * delete booking by Id
   */
  it("Ensure api Delete Booking successfully send the request", async function () {
    //send the request
    this.timeout(60000);
    const response = await restfulBooker.deleteBooking(token, bookingId);

    //assertion
    expect(response.statusCode).to.eql(201);
  });
});
