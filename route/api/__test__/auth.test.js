const request = require("supertest");
const { app } = require("../../../app");

it("check", async () => {
  const res = await request(app).get("/api").send();

  expect(res.status).toBe(200);
});
