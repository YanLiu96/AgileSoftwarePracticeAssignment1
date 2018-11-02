let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );
describe("Details", function () {
    describe("GET /details", () => {
        it("should return the details which combine with sender,receiver,good collection", function (done) {
            chai.request(server)
                .get("/details")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(4);
                    let result = _.map(res.body, (goods) => {
                        return {_id: goods._id};
                    });
                    expect(result).to.include({_id: 10001});
                    expect(result).to.include({_id: 10002});
                    expect(result).to.include({_id: 10003});
                    expect(result).to.include({_id: 10004});
                    done();
                });
        });
    });
});
