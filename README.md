# Agile Software Practice Assignment1
## Yan Liu 
## 20082245
### 1. Tools and  technique
##### This project uses git to control version.The structure is :
![image](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/gitStructure.gif)
##### It uses Mocha, Chai, superTest,etc. to test the resource code. All of the test code are stored in the transportation/test/routes folder
##### It uses mlab database to store data and for test.
##### It uses ESLint to analyse code quality for potential errors and fix the errors.
##### It uses GCOV to test the code coverage and generate coverage report at transportation/coverage/lcov-report/index.html.



### 2. Some Score point
##### It contains 54 test cases:
![image](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/testPassing.gif)
##### I use gitignore when the git was initialized.
##### I use Git – Branch-Edit-Merge workflow when i write test code or fix errors.
##### The silent principle is realized.
##### To make sure `test case isolation, I using beforeEach block in which i empty the database, then create some test case in mlab.`
```javascript
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
                {. . . . . . . . .}
             ], (err) => {
                        done();
                    });
        });
```
##### The test also contains Normal, Boundary (in sender/findCount) and Error(404) cases.
##### It contains many Before/After hooks when it need post or delete, for example in goods-test(post and delete).
##### I try to use super test for goods.The super test file called goods-superTest.js:
```javascript
var request = require("supertest");
let chai = require("chai");
let _ = require("lodash" );
let expect = chai.expect;
var app = require("../../app");
let good = require("../../models/goods");
describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            request(app)
                .get("/goods")
                .set("Accept", "application/json")
                .end((err, res) => {
                    expect(200);
                    expect(res.body.length).to.equal(5);
                    . . . . . .
});
```

### 3.	Description of functionality to be tested
#### 3.1.	Goods
##### ①Get all the goods information.
##### ②Get one good information by it’s ID
##### ③Add one goods 
##### ④Change the `goods status:goodlocation`🌟
##### ⑤Change the `goods deliveryman information` 🌟
##### ⑥Delete one good by ID. 


#### 3.2.	Senders
##### ①Get all the senders information.
##### ②Get one sender information by it's ID
##### ③Add one sender
##### ④Find `one sender send how many goods`🌟
##### ⑤delete one sender by it’s ID.


#### 3.3.	Receivers
##### ①Get all receivers information
##### ②Get one receivers by it’s ID
##### ③Change one receiver's phone number🌟
##### ④Change one receiver's address🌟
##### ⑤Delete one receiver


#### 3.4.	ShipmentsDetails
##### ①Get all shipmentDetails information
##### ②Get one shipmentDetails by it’s ID
##### ③Get `the combination of Good and shipmentDetails` by ID🌟🌟
##### ④Change one receiver's address🌟
##### ⑤Delete one receiver


#### 3.5.	Details🌟🌟🌟
##### ①Get `the combination of Goods,Senders,Receivers information`
##### ②Get` Details of good,sender and receiver by it’s ID`


#### 3.6.	FuzzySearch🌟🌟🌟🌟
##### ①`input keyword it will find the good or sender or receivers name whic contain keyword no matter upcase and return the combination details`	

#### 4. Test Details(some typical test)
##### The routes-test can be divided into mainly five types. The error test can be divided into 404 error and  no found error.
##### ①Get test
###### I test get method by test the length of return whether equal to the size in database.
###### I also test the return result whether includes the property and value it should has. For example: 
```javascript
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
```
##### ②Get/ID test
###### I test get one method by test the return req.body's length is one and whether include property and value it should has.

##### ③Post test
##### I test post method by create a new data and send to post.Then check whether it return message that add successfully.I also use after hook to test the size od database which should add one.

#### ④Put test 
##### I test put method by change the value of one property,then check it whether be updated in the database.
##### I also test 404 error.For example
```javascript
       it("should return a 404 error for invalid good id", function(done) {
            chai.request(server)
                .put("/goods/1100001/changeLocation")
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });
```   
#### ⑤Delete test
##### I test delete method by delete one by it's ID then use after block to search it in the database.It should not include.

#### More in-depth details you can check out my test code in test/routes folder.

## Thank you for reading my assignment 1.
