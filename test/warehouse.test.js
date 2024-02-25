const app = require("../app");
const request = require("supertest");

describe("Warehouse", () => {
  test("create warehouse", (done) => {
    request(app)
      .post("/api/warehouses/create")
      .send({
        name: "Test Warehouse",
        city: "Test City",
        address: "123 Test Street",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("city");
        expect(res.body).toHaveProperty("address");
        done();
      })
      .catch(done);
  });
  test("get all warehouse", (done) => {
    request(app)
      .get("/api/warehouses")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        done();
      })
      .catch(done);
  });
  test("get warehouse by id", (done) => {
    request(app)
      .get("/api/warehouses/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        done();
      })
      .catch(done);
  })
  test("update warehouse", (done) => {
    request(app)
      .put("/api/warehouses/1")
      .send({
        name: "Test newWarehouse",
        city: "Test newCity",
        address: "123 Test newStreet",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("city");
        expect(res.body).toHaveProperty("address");
        done();
      })
      .catch(done);
  })
  test("delete warehouse", (done) => {
    request(app)
      .delete("/api/warehouses/2")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        done();
      })
      .catch(done);
  })
});
