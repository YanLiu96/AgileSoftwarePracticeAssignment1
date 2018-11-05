var request = require('supertest');
let chai = require('chai');
let _ = require("lodash" );
let expect = chai.expect;
var app = require('../../app');
let good = require("../../models/goods");

describe("Super Test:Goods", function () {
    beforeEach((done) => { //Before each test we empty the database
        good.deleteMany({}, (err) => {
        });
        //add the test case to test
        good.insertMany([
            {
                _id: 10001,
                goodsName: "Iphone X",
                goodsKind: "expensive",
                freight: 12.5,
                deliveryman: {
                    deliverymanName: "d1",
                    phoneNumber: "15261820009"
                },
                goodsLocation: "at waterford"
            },
            {
                _id: 10002,
                goodsName: "Mac Pro",
                goodsKind: "expensive",
                freight: 28.4,
                deliveryman: {
                    deliverymanName: "d2",
                    phoneNumber: "18761356166"
                },
                goodsLocation: "In the transfer station"
            },
            {
                _id: 10003,
                goodsName: "AJ 1",
                goodsKind: "soft",
                freight: 12.6,
                deliveryman: {
                    deliverymanName: "d3",
                    phoneNumber: "689860480"
                },
                goodsLocation: "In the pass station"
            },
            {
                _id: 10004,
                goodsName: "Superme",
                goodsKind: "clothes",
                freight: 12.8,
                deliveryman: {
                    deliverymanName: "d4",
                    phoneNumber: "110119118"
                },
                goodsLocation: "still not send"
            },
            {
                _id: 10005,
                goodsName: "Car",
                goodsKind: "expensive",
                freight: 2120,
                deliveryman: {
                    deliverymanName: "d5",
                    phoneNumber: "777777777"
                },
                goodsLocation: "arriving at aim city"
            }
        ], (err) => {
            done();
        });
    });

    describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            request(app)
                .get("/goods")
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id,goodsName:goods.goodsName,goodsKind:goods.goodsKind};
                    });
                    expect(result).to.include({_id: 10001,goodsName:"Iphone X",goodsKind:"expensive"});
                    expect(result).to.include({_id: 10002,goodsName:"Mac Pro",goodsKind:"expensive"});
                    expect(result).to.include({_id: 10003,goodsName:"AJ 1",goodsKind:"soft"});
                    expect(result).to.include({_id: 10004,goodsName:"Superme",goodsKind:"clothes"});
                    expect(result).to.include({_id: 10005,goodsName:"Car",goodsKind:"expensive"});
                    done();
                });
        });

    });
    describe("GET /goods/:id", () => {
        it("should return good which id is test_id:10001", function (done) {
            request(app)
                .get("/goods/10001")
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id,goodsName:goods.goodsName,goodsKind:goods.goodsKind};
                    });
                    expect(result).to.include({_id: 10001,goodsName:"Iphone X",goodsKind:"expensive"});
                    done();
                });
        });
        it("should return good not found when ID not existence", function (done) {
            request(app)
                .get("/goods/555")
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(200);
                    expect(res.body.length).to.equal(undefined);
                    expect(res.body).to.have.property("message").equal("Good NOT Found!" );
                    done();
                });
        });
    });
});
