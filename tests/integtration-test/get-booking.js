const request = require("supertest");
const expect = require("chai").expect;

const URL = "https://restful-booker.herokuapp.com";
const endpoint = "/booking";
const id = "/188"; //still hardcode

describe("Restful booker get booking", function () {
  it("Ensure api Get Booking By Id sucessfully send the request with Id", async function () {
    this.timeout(60000);
    const response = await request(URL)
      .get(endpoint + id)
      .set("Accept", "application/json");
    expect(response.statusCode).to.eql(200);
  });

  it("Ensure api Get Booking By Id can not send the request with wrong Id", async function () {
    this.timeout(60000);
    const response = await request(URL)
      .get(endpoint + "/7534667")
      .set("Accept", "application/json");
    expect(response.statusCode).to.eql(404);
  });
});
