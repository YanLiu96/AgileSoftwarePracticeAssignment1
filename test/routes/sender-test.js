let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let sender = require("../../models/senders");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Senders", function () {
    beforeEach((done) => { //Before each test we empty the database
        sender.deleteMany({}, (err) => {
        });
        //add the test case to test
        sender.insertMany([
            {
                _id: 10001,
                senderMethod: "UPS",
                sendersName: "Yan Liu",
                senderPhoneNumber: "08338401313",
                senderAddress: "ireland",
                postcode: "X42 YX36",
                sendDate: "2018-3-19"
            },
            {
                _id: 10002,
                senderMethod: "FedEx",
                sendersName: "Yin Wu Jiu Ge",
                senderPhoneNumber: "798668668",
                senderAddress: "china",
                postcode: "X12 XX56",
                sendDate: "2018-3-20"
            },
            {
                _id: 10003,
                senderMethod: "EMS",
                sendersName: "Bao Jie",
                senderPhoneNumber: "110",
                senderAddress: "Waterford",
                postcode: "X78 TU677",
                sentDate: "2018-9-12"
            },
            {
                _id: 10004,
                senderMethod: "TNT ",
                sendersName: "Hellen",
                senderPhoneNumber: "11012121",
                senderAddress: "Waterford",
                postcode: "JX67 FSF7",
                sendDate: "2018-7-5"
            },
            {
                _id: 10005,
                senderMethod: "UPS",
                sendersName: "Yan Liu",
                senderPhoneNumber: "15261820009",
                senderAddress: "BeiJing",
                postcode: "YD9 FSF6",
                sendDate: "2018-9-11"
            }
        ], (err) => {
            done();
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
                        return {_id: sender._id,sendersName:sender.sendersName};
                    });
                    expect(result).to.include({_id: 10001,sendersName:"Yan Liu"});
                    expect(result).to.include({_id: 10002,sendersName:"Yin Wu Jiu Ge"});
                    expect(result).to.include({_id: 10003,sendersName:"Bao Jie"});
                    expect(result).to.include({_id: 10004,sendersName:"Hellen"});
                    expect(result).to.include({_id: 10005,sendersName:"Yan Liu"});
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
                        return {_id: senders._id,sendersName:senders.sendersName};
                    });
                    expect(result).to.include({_id:10001,sendersName:"Yan Liu"});
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

    describe("POST /senders", function () {
        it("should return confirmation message", function (done) {
            let sender = {
                _id: "131313",
                sendersName: "testName",
                senderMethod:"EMS",
                senderPhoneNumber: "test12334",
                senderAddress: "testLocation",
                postcode:"TESTCODE",
                sendDate:"2018-10-21"
            };
            chai.request(server)
                .post("/senders")
                .send(sender)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Sender Successfully Added!");
                    done();
                });
        });
        after(function (done) {
            chai.request(server)
                .get("/senders")
                .end(function(err, res) {
                    let result = _.map(res.body, (sender) => {
                        return { _id: sender._id,sendersName:sender.sendersName};
                    }  );
                    expect(res.body.length).to.equal(6);
                    expect(result).to.include({_id: 131313,sendersName:"testName"});
                    done();
                });
        });
        
    });
    describe("POST /senders", function () {
        it("should return error message when the sender not add to the database", function (done) {
            let sender = {};
            chai.request(server)
                .post("/senders")
                .send(sender)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Sender NOT Added!");
                    done();
                });
        });
    });

    describe("GET /senders/findCount/:senderName", () => {
        it("should count one sender send how much goods ", function (done) {
            chai.request(server)
                .get("/senders/findCount/Bao Jie")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (sender) => {
                        return {_id: sender._id};
                    });
                    expect(result).to.include({_id:"Bao Jie"});

                    done();
                });
        });

        it("should return bad search when senderName does not existence (boundary test)", function (done) {
            chai.request(server)
                .get("/senders/findCount/erere")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("NO Information!" );
                    done();
                });
        });

    });

    describe("DELETE /senders/:id",()=>{
        it("should return delete confirmation message ", function(done) {
            chai.request(server)
                .delete("/senders/10005")
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message").equal("Sender Successfully Deleted!" );
                    done();
                });
        });
        after(function (done) {
            chai.request(server)
                .get("/senders")
                .end(function(err, res) {
                    let result = _.map(res.body, (sender) => {
                        return { _id: sender._id,sendersName:sender.sendersName};
                    }  );
                    expect(res.body.length).to.equal(4);
                    expect(result).to.not.include({_id: 10005,sendersName:"Yan Liu"});
                    done();
                });
        });
    });
    describe("DELETE /senders/:id",()=>{
        it("should return an error message when an invalid ID is given", function(done) {
            chai.request(server)
                .delete("/senders/dsdsd")
                .end( (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.include("Sender NOT DELETED!" ) ;
                    done();
                });
        });
    });

});
