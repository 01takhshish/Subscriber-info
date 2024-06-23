const chai = require("chai");

const chaiHttp = require("chai-http");

const app = require("./app.js");

const mongoose = require("mongoose");

chai.use(chaiHttp);
chai.should();

describe("API Tests", () => {
  before((done) => {
    // Connect to a test database before running tests
    mongoose.connect(
      "mongodb://localhost/subscribers",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after((done) => {
    // Disconnect from the test database after running tests
    mongoose.connection.close(() => {
      done();
    });
  });

  describe("GET /subscribers", () => {
    it("it should GET all the subscribers", (done) => {
      chai
        .request(app)
        .get("/subscribers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3); // Assuming you have 3 subscribers in your sample data
          done();
        });
    });
  });

  describe("GET /subscribers/names", () => {
    it("it should GET names and subscribed channels of all subscribers", (done) => {
      chai
        .request(app)
        .get("/subscribers/names")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3); // Assuming you have 3 subscribers in your sample data
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("subscribedChannel");
          done();
        });
    });
  });

  describe("GET /subscribers/:id", () => {
    it("it should GET details of a subscriber by ID", (done) => {
      chai
        .request(app)
        .get("/subscribers/65ffd147eb5bce0920d93afb") // Replace with an existing subscriber ID from your sample data
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("subscribedChannel");
          res.body.should.have.property("subscribedDate");
          done();
        });
    });
  });
});