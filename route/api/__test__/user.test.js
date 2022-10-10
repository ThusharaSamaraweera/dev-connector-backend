const request = require("supertest");
const { app } = require("../../../app");

// const auth = "/api/users";
const auth = "/api/auth";

it("login with correct credentials", async () => {
  const res = await request(app)
    .post(auth+ "/sign-up")
    .send({
      name: "test",
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);

  await request(app)
    .post(auth + "/sign-in")
    .send({
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);
});

it("login with wrong email", async () => {
  await request(app)
    .post(auth + "/sign-up")
    .send({
      name: "test",
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);

  const res = await request(app)
    .post(auth + "/sign-in")
    .send({
      email: "test1@gmail.com",
      password: "123456",
    })
    .expect(400);
    
  expect(res.body.errors[0].msg).toEqual("This user is not exist");
});

it("login with wrong password", async () => {
  await request(app)
    .post(auth + "/sign-up")
    .send({
      name: "test",
      email: "test@gmail.com",
      password: "123456",
    })
    .expect(200);

  const res = await request(app)
    .post(auth + "/sign-in")
    .send({
      email: "test@gmail.com",
      password: "123456a",
    })
    .expect(400);
  
  expect(res.body.errors[0].msg).toEqual("wrong Password");
});
