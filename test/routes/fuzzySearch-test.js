let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let expect = chai.expect;
chai.use(require("chai-things"));
chai.use(chaiHttp);
let _ = require("lodash" );

describe("FuzzySearch", function () {
    describe("GET /fuzzySearch/:keyword", () => {
        it("should return the details which contains keyword:yan", function (done) {
            chai.request(server)
                .get("/fuzzySearch/yan")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (fuzzyResult) => {
                        return {_id: fuzzyResult._id};
                    });
                    expect(result).to.include({_id: 10001});
                    done();
                });
        });

    });

});
