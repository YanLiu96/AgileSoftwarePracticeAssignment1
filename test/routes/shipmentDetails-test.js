let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let Shipment = require("../../models/shipmentDetails");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("ShipmentDetails", function () {
    beforeEach((done) => {
        Shipment.remove({}, (err) => {
            done();
        });
        //add the test case to test
        Shipment.create({
            _id: 10001,
            dimensionsInCM: {
                length: 20,
                width: 10,
                height: 3
            },
            numberOfPackage: "1"
        });
        Shipment.create({
            _id: 10002,
            dimensionsInCM: {
                length: 35,
                width: 49,
                height: 12
            },
            numberOfPackage: "1"
        });
        Shipment.create({
            _id: 10003,
            dimensionsInCM: {
                length: 27,
                width: 11,
                height: 18
            },
            numberOfPackage: "3"
        });
        Shipment.create({
            _id: 10004,
            dimensionsInCM: {
                length: 50,
                width: 40,
                height: 30
            },
            numberOfPackage: "20"
        });
        Shipment.create({
            _id: 10005,
            dimensionsInCM: {
                length: 450,
                width: 222,
                height: 222
            },
            numberOfPackage: "1"
        });

    });
    describe("GET /shipmentDetails", () => {
        it("should return the all shipmentDetails ", function (done) {
            chai.request(server)
                .get("/shipmentDetails")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (shipmentDetails) => {
                        return {_id: shipmentDetails._id};
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
