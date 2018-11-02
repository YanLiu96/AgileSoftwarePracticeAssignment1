let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let Books = require("../../models/goods")
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("Goods", function () {
    beforeEach((done) => { //Before each test we empty the database
        Books.remove({}, (err) => {
            done();
        });
        //add the test case to test
        Books.create({
            _id: 10001,
            goodsName: "Iphone X",
            goodsKind: "expensive",
            freight: 12.5,
            deliveryman: {
                deliverymanName: "d1",
                phoneNumber: "15261820009"
            },
            goodsLocation: "at waterford"
        });
        Books.create({
            _id: 10002,
            goodsName: "Mac Pro",
            goodsKind: "expensive",
            freight: 28.4,
            deliveryman: {
                deliverymanName: "d2",
                phoneNumber: "18761356166"
            },
            goodsLocation: "In the transfer station"
        });
        Books.create({
            _id: 10003,
            goodsName: "AJ 1",
            goodsKind: "soft",
            freight: 12.6,
            deliveryman: {
                deliverymanName: "d3",
                phoneNumber: "689860480"
            },
            goodsLocation: "In the pass station"
        });
        Books.create({
            _id: 10004,
            goodsName: "Superme",
            goodsKind: "clothes",
            freight: 12.8,
            deliveryman: {
                deliverymanName: "d4",
                phoneNumber: "110119118"
            },
            goodsLocation: "still not send"
        });
        Books.create({
            _id: 10005,
            goodsName: "Car",
            goodsKind: "expensive",
            freight: 2120,
            deliveryman: {
                deliverymanName: "d5",
                phoneNumber: "777777777"
            },
            goodsLocation: "arriving at aim city"
        });

    });
    describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            chai.request(server)
                .get("/goods")
                .end((err, res) => {
                    //expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id};
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

});
