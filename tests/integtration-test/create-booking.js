const request = require("supertest");
const expect = require("chai").expect;

const URL = "https://restful-booker.herokuapp.com";
const endpoint = "/booking";

let payload = {
  firstname: "Jim",
  lastname: "Brown",
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Breakfast",
};

let withoutTotalPricePayload = {
  firstname: "Jim",
  lastname: "Brown",
  depositpaid: true,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Breakfast",
};

let withoutDepositpaidPayload = {
  firstname: "Jim",
  lastname: "Brown",
  totalprice: 111,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Breakfast",
};

describe("Restful booker create booking", function () {
  it("Ensure API Create Booking successfully sends the request", async function () {
    this.timeout(60000);
    const response = await request(URL)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("bookingid");
    expect(response.body).to.have.property("booking");
  });

  it("Ensure api Create Booking can not send the request without Totalprice", async function () {
    this.timeout(60000);
    const response = await request(URL)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(withoutTotalPricePayload);
    expect(response.statusCode).to.equal(500);
  });

  it("Ensure api Create Booking can not send the request without Depostpaid", async function () {
    this.timeout(60000);
    const response = await request(URL)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(withoutDepositpaidPayload);
    expect(response.statusCode).to.equal(500);
  });
});
