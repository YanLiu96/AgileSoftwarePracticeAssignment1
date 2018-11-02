let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let sender = require("../../models/senders")
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Senders", function () {
    beforeEach((done) => { //Before each test we empty the database
        sender.deleteMany({}, (err) => {
            done();
        });
        //add the test case to test
        sender.create({
            _id: 10001,
            senderMethod: "UPS",
            sendersName: "Yan Liu",
            senderPhoneNumber: "08338401313",
            senderAddress: "ireland",
            postcode: "X42 YX36",
            sendDate: "2018-3-19"
        });
        sender.create({
            _id: 10002,
            senderMethod: "FedEx",
            sendersName: "Yin Wu Jiu Ge",
            senderPhoneNumber: "798668668",
            senderAddress: "china",
            postcode: "X12 XX56",
            sendDate: "2018-3-20"
        });
        sender.create({
            _id: 10003,
            senderMethod: "EMS",
            sendersName: "Bao Jie",
            senderPhoneNumber: "110",
            senderAddress: "Waterford",
            postcode: "X78 TU677",
            sentDate: "2018-9-12"
        });
        sender.create({
            _id: 10004,
            senderMethod: "TNT ",
            sendersName: "Hellen",
            senderPhoneNumber: "11012121",
            senderAddress: "Waterford",
            postcode: "JX67 FSF7",
            sendDate: "2018-7-5"
        });
        sender.create({
            _id: 10005,
            senderMethod: "UPS",
            sendersName: "Yan Liu",
            senderPhoneNumber: "15261820009",
            senderAddress: "BeiJing",
            postcode: "YD9 FSF6",
            sendDate: "2018-9-11"
        });

    });
    describe("GET /senders", () => {
        it("should return all the senders", function (done) {
            chai.request(server)
                .get("/senders")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (sender) => {
                        return {_id: sender._id};
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
    describe("GET /senders/:id", () => {
        it("should return sender which id is test_id:10001", function (done) {
            chai.request(server)
                .get("/senders/10001")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (senders) => {
                        return {_id: senders._id};
                    });
                    expect(result).to.include({_id: 10001});
                    done();
                });
        });
        it("should return sender not found when ID not existence", function (done) {
            chai.request(server)
                .get("/senders/555")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("Sender NOT Found!" );
                    done();
                });
        });
    });


});
