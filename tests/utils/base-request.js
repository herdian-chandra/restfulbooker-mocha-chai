require("dotenv").config({ path: ".env.production" });
const request = require("supertest");
const BASE_URL = process.env.BASE_URL_RESTFULBOOKER;

// Wrapper to include default headers and base URL
const baseRequest = (method, path) => {
  const req = request(BASE_URL)[method](path);
  return req
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
};

// Export standard HTTP methods
module.exports = {
  get: (path) => baseRequest("get", path),
  post: (path) => baseRequest("post", path),
  put: (path) => baseRequest("put", path),
  delete: (path) => baseRequest("delete", path),
};
