const request = require("supertest");
const { app } = require("../../../app");

const url = "/api/profile";

const createProfile = async (token) => {
  return await request(app)
    .post(url)
    .set("x-auth-token", token)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      skills: "test1, test2, test3",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(201);
};
    
it("check if create successfully profile with status and skills", async () => {
  const token = await global.signIn();

  const res = await request(app)
    .post(url)
    .set("x-auth-token", token)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      skills: "test1, test2, test3",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(201);
});

it("check if it throw an error when creating profile without token", async () => {
  const res = await request(app)
    .post(url)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      skills: "test1, test2, test3",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(401);
});

it("check if create successfully profile without skills", async () => {
  const token = await global.signIn();

  const res = await request(app)
    .post(url)
    .set("x-auth-token", token)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(400);
});

it("check if getting existing user profile with token", async () => {
  const token = await global.signIn();

  const res = await request(app)
    .post(url)
    .set("x-auth-token", token)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      skills: "test1, test2, test3",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(201);
  
  const res1 = await request(app)
    .get(url + "/me")
    .set("x-auth-token", token)
    .expect(200);
});

it("check if getting existing user profile without token", async () => {
  const token = await global.signIn();

  const res = await request(app)
    .post(url)
    .set("x-auth-token", token)
    .send({
      company: "test",
      website: "test.com",
      location: "test",
      status: "test",
      skills: "test1, test2, test3",
      githubusername: "test",
      bio: "test",
      twitter: "test",
      facebook: "test",
      linkedin: "test",
      youtube: "test",
      instagram: "test",
    })
    .expect(201);

  const res1 = await request(app)
    .get(url + "/me")
    .expect(401);
});
