const request = require("supertest");
const expect = require("chai").expect;

const URL = "https://restful-booker.herokuapp.com";
const endpoint = "/auth";
let payload = {
  username: "admin",
  password: "password123",
};

describe("Restful booker auth management", async () => {
  it("Ensure api Create Token successfully send the request", async () => {
    const response = await request(URL).post(endpoint).send(payload);
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("token");
  });

  it("Ensure api Create Token can not send the request with invalid credentials", async () => {
    let invalidPayload = { ...payload };
    invalidPayload.password = "password12345";
    const response = await request(URL).post(endpoint).send(invalidPayload);
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("reason");
    expect(response.body.reason).to.have.string("Bad credentials");
  });

  it("Ensure api Create Token can not send the request without Username", async () => {
    let withoutUsernamePayload = { ...payload };
    withoutUsernamePayload.username = "";
    const response = await request(URL)
      .post(endpoint)
      .send(withoutUsernamePayload);
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("reason");
    expect(response.body.reason).to.have.string("Bad credentials");
  });

  it("Ensure api Create Token can not send the request without Password", async () => {
    let withoutPasswordPayload = { ...payload };
    withoutPasswordPayload.password = "";
    const response = await request(URL)
      .post(endpoint)
      .send(withoutPasswordPayload);
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.have.property("reason");
    expect(response.body.reason).to.have.string("Bad credentials");
  });
});
