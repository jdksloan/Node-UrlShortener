import request from "supertest";
import { repository } from "../src/memory/LinkSingleton";
import Server from "../src/http/Server";

const app = new Server().app;

describe("POST /shortlink", () => {
  it("Creates a short link", async () => {
    const { body } = await request(app).post("/api/v1/shortlink").send({
      url: "http://test.com",
    });

    expect(body).toMatchObject({
      status: "success",
      response: `127.0.0.1:8081/a`,
    });
  });

  it("Creates a short link with a specified shortlink", async () => {
    const { body } = await request(app).post("/api/v1/shortlink").send({
      url: "http://testtwo.com",
      short: "b",
    });

    expect(body).toMatchObject({
      status: "success",
      response: "127.0.0.1:8081/b",
    });
  });

  it("Creates a short link with a specified shortlink without http", async () => {
    const { body } = await request(app).post("/api/v1/shortlink").send({
      url: "testtwo.com",
      short: "b",
    });

    expect(body).toMatchObject({
      status: "success",
      response: "127.0.0.1:8081/b",
    });
  });

  it("Creates a short link with a specified shortlink but not the specified because that is in use already", async () => {
    const { body } = await request(app).post("/api/v1/shortlink").send({
      url: "http://testthree.com",
      short: "a",
    });

    expect(body).toMatchObject({
      status: "success",
      response: "127.0.0.1:8081/c",
    });
  });

  it("Throws a 400 error becase the URL is invalid", async () => {
    await request(app)
      .post("/api/v1/shortlink")
      .send({
        url: "testfour",
      })
      .expect(400);
  });
});

describe("GET /:shortlink", () => {
  it("Redirects to a specific URL and increases the visit count", async () => {
    await request(app)
      .get("/a")
      .expect(302)
      .expect("Location", "http://test.com");
    const link = repository.query((x) => x && x.shortened === "a");
    expect(link).not.toBeUndefined();
    expect(link!.getVisit(new Date(Date.now()))).toEqual(1);
  });

  it("Redirects to a specific URL that didn't start with http", async () => {
    await request(app)
      .get("/b")
      .expect(302)
      .expect("Location", "http://testtwo.com");
  });
});

describe("GET /api/v1/shortlink/:link/stats", () => {
  it("Redirects to a specific URL that didn't start with http", async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const dayBefore = new Date();
    dayBefore.setDate(today.getDate() - 2);

    const link = repository.query((x) => x && x.shortened === "b");
    expect(link).not.toBeUndefined();
    link!.addVisit(yesterday);
    link!.addVisit(dayBefore);
    const visits: { [key: string]: number } = {};
    visits[today.toISOString().split("T")[0]] = 1;
    visits[yesterday.toISOString().split("T")[0]] = 1;
    visits[dayBefore.toISOString().split("T")[0]] = 1;
    const { body } = await request(app).get("/api/v1/shortlink/b/stats");

    expect(body).toMatchObject({
      status: "success",
      response: {
        original: "http://testtwo.com",
        shortened: "127.0.0.1:8081/b",
        visits,
      },
    });
  });
});
