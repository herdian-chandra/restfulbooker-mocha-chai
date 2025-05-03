const request = require("supertest");
const expect = require("chai");

describe("Restful booker auth management", async () => {
  it("Ensure api Create Token successfully send the request", async () => {
    const response = await request("https://restful-booker.herokuapp.com")
      .post("/auth")
      .send({
        username: "admin",
        password: "password123",
      });
    console.log(response.body);
  });
});
