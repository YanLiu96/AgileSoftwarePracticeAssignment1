let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let receiver = require("../../models/receivers")
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Receiver", function () {
    beforeEach((done) => {
        receiver.deleteMany({}, (err) => {

        });
        //add the test case to test
        receiver.create({
            _id: 10001,
            receiverName: "ads",
            receiverPhoneNumber: "11111111",
            receiverCountry: "French",
            receiverAddress: "dsdasda",
            postcode: "X78 DADA"
        });
        receiver.create({
            _id: 10002,
            receiverName: "woshinidie",
            receiverPhoneNumber: "2222222",
            receiverCountry: "Chnia",
            receiverAddress: "dsdasda",
            postcode: "SDA 1111"
        });
        receiver.create({
            _id: 10003,
            receiverName: "shabi",
            receiverPhoneNumber: "33333333",
            receiverCountry: "South Korea",
            receiverAddress: "dsdasda",
            postcode: "3231323"
        });
        receiver.create({
            _id: 10004,
            receiverName: "Xu Yue",
            receiverPhoneNumber: "6666666",
            receiverCountry: "Norway",
            receiverAddress: "dunblin",
            postcode: "FSDFFS"
        });
        receiver.create({
            _id: 10005,
            receiverName: "David",
            receiverPhoneNumber: "434234235",
            receiverCountry: "Ireland",
            receiverAddress: "dsdasda",
            postcode: "X91HXT3"
        });
        done();

    });

    describe("GET /receivers", () => {
        it("should return all the receivers", function (done) {
            chai.request(server)
                .get("/receivers")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (receiver) => {
                        return {_id: receiver._id};
                    });
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    expect(result).to.include({_id: 10005});
                    done();
                });
        });

    });

    describe("GET /receivers/:id", () => {
        it("should return sender which id is test_id:10001", function (done) {
            chai.request(server)
                .get("/receivers/10001")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (receiver) => {
                        return {_id: receiver._id};
                    });
                    expect(result).to.include({_id: 10001});
                    done();
                });
        });
        it("should return receiver not found when ID not existence", function (done) {
            chai.request(server)
                .get("/receivers/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("Receiver NOT Found!" );
                    done();
                });
        });
    });
    describe("POST /receivers", function () {
        it("should return confirmation message", function (done) {
            let receiver = {
                _id: "131313",
                receiverName: "tsetReceiverName",
                receiverPhoneNumber: "test43535",
                receiverCountry:"testCountry",
                receiverAddress:"testAddress",
                postcode:"testcode"
            };
            chai.request(server)
                .post("/receivers")
                .send(receiver)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("receiver Successfully Added!");
                    done();
                });
        });
        it("should return error message when the receivers not add to the database", function (done) {
            let receiver = {};
            chai.request(server)
                .post("/receivers")
                .send(receiver)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("receiver NOT Added!");
                    done();
                });
        });
    });

    describe("PUT /receivers/:id/changePhoneNumber/:phoneNumber", () => {
        it("should change th receiver phone number to 11223344", function (done) {
            chai.request(server)
                .put("/receivers/10005/changePhoneNumber/11223344")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let receiver = res.body.data;
                    expect(receiver).to.include({receiverPhoneNumber: "11223344"});
                    done();
                });
        });
    });
    describe("PUT /receivers/:id/changeAddress/:address", () => {
        it("should change th receiver address  to testaddress", function (done) {
            chai.request(server)
                .put("/receivers/10001/changeAddress/testaddress")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let receiver = res.body.data;
                    expect(receiver).to.include({receiverAddress: "testaddress"});
                    done();
                });
        });
    });
    describe("DELETE /receivers/:id",()=>{
        it("should return delete confirmation message ", function() {
            chai.request(server)
                .delete("/receivers/10005")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Receiver Successfully Deleted!" );
                });
        });
        after(function  (done) {
            chai.request(server)
                .get("/receivers")
                .end(function(err, res) {
                    let result = _.map(res.body, (receiver) => {
                        return { _id: receiver._id};
                    }  );
                    expect(res.body.length).to.equal(4);
                    expect(result).to.not.include({_id: 10005});
                });
                    done();
        });
        it('should return an error message when an invalid ID is given', function(done) {
            chai.request(server)
                .delete('/receivers/dsdsd')
                .end( (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.include('Receiver NOT DELETED!' ) ;
                    done();
                });
        });
    });
});
