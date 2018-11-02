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
            done();
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
    
});
