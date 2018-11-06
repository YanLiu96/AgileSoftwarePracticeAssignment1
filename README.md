# Agile Software Practice Assignment1
## Yan Liu 
## 20082245
## GitHub url is :https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1
## My GitHub repo is private. But I have already invited you to access my repo.You can click on the url below and Accept my invitation。Then you can review my assignment.
## The invite url isS : https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/invitations
### 1. Tools and  technique
##### This project uses git to control version.The structure is (If you can't load it,click on the image to view):
![image](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/gitStructure.png)
##### It uses Mocha, Chai, superTest,etc. to test the resource code. All of the test code are stored in the transportation/test/routes folder
##### It uses mlab database to store data and for test.
##### It uses ESLint to analyse code quality for potential errors and fix the errors.
##### It uses GCOV to test the code coverage and generate coverage report at transportation/coverage/lcov-report/index.html.



### 2. Some Score point
##### It contains 54 test cases(print npm test in the terminal，and all of them will run test):
![image1](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/passing1.png)
![image2](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/passing2.png)
![image3](https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1/tree/master/picturesForReadme/passing3.png)
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
    describe("GET /goods", () => {
        it("should return all the goods in an array", function (done) {
            chai.request(server)
                .get("/goods")
                .end((err, res) => {
                    expect(res).to.have.status(200);
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
```
##### ②Get/ID test
###### I test get one method by test the return req.body's length is one and whether include property and value it should has.
```javascript
   describe("GET /goods/:id", () => {
           it("should return good which id is test_id:10001", function (done) {
               chai.request(server)
                   .get("/goods/10001")
                   .end((err, res) => {
                       expect(res).to.have.status(200);
                       expect(res.body.length).to.equal(1);
                       let result = _.map(res.body, (goods) => {
                           return {_id: goods._id,goodsName:goods.goodsName,goodsKind:goods.goodsKind};
                       });
                       expect(result).to.include({_id: 10001,goodsName:"Iphone X",goodsKind:"expensive"});
                       done();
                   });
           });
           it("should return good not found when ID not existence", function (done) {
               chai.request(server)
                   .get("/goods/555")
                   .end((err, res) => {
                       expect(res).to.have.status(200);
                       expect(res.body.length).to.equal(undefined);
                       expect(res.body).to.have.property("message").equal("Good NOT Found!" );
                       done();
                   });
           });
       });
```
##### ③Post test
##### I test post method by create a new data and send to post.Then check whether it return message that add successfully.I also use after hook to test the size od database which should add one.
```javascript
  describe("POST /goods", ()=> {
         it("should return confirmation message and database changes", function (done) {
             let good = {
                 _id: "131313",
                 goodsName: "testname",
                 goodsKind: "testKind",
                 freight:111,
                 deliveryman: {
                     deliverymanName:"liuyan",
                     phoneNumber:"110",
                 },
                 goodsLocation: "testlocation",
 
             };
             chai.request(server)
                 .post("/goods")
                 .send(good)
                 .end(function (err, res) {
                     expect(res).to.have.status(200);
                     expect(res.body).to.have.property("message").equal("Good Successfully Added!");
                     done();
                 });
         });
         after(function(done) {
             chai.request(server)
                 .get("/goods")
                 .end(function(err, res) {
                     let result = _.map(res.body, (good) => {
                         return { _id: good._id};
                     }  );
                     expect(res.body.length).to.equal(6);
                     expect(result).to.include({_id: 131313});
                     done();
                 });
         });
     });
```
#### ④Put test 
##### I test put method by change the value of one property,then check it whether be updated in the database.
##### I also test 404 error.For example
```javascript
  describe("PUT /goods/:id/changeLocation/:location", () => {
          it("should change th good location to testLocation", function (done) {
              chai.request(server)
                  .put("/goods/10001/changeLocation/testLocation")
                  .end(function (err, res) {
                      expect(res).to.have.status(200);
                      let good = res.body.data;
                      expect(good).to.include({goodsLocation: "testLocation"});
                      done();
                  });
          });
          it("should return a 404 error for invalid good id", function(done) {
              chai.request(server)
                  .put("/goods/1100001/changeLocation")
                  .end(function(err, res) {
                      expect(res).to.have.status(404);
                      done();
                  });
          });
          
      });
```   
#### ⑤Delete test
##### I test delete method by delete one by it's ID then use after block to search it in the database.It should not include.
```javascript 
  describe("DELETE /goods/:id",()=>{
         it("should return delete confirmation message and database changes ", function(done) {
             chai.request(server)
                 .delete("/goods/10005")
                 .end(function(err, res) {
                     expect(res).to.have.status(200);
                     expect(res.body).to.have.property("message").equal("Good Successfully Deleted!" );
                     done();
                 });
         });
         after(function(done) {
             chai.request(server)
                 .get("/goods")
                 .end(function(err, res) {
                     let result = _.map(res.body, (good) => {
                         return { _id: good._id};
                     }  );
                     expect(res.body.length).to.equal(4);
                     expect(result).to.not.include({_id: 10005});
                     done();
                 });
         });
 
     });
     describe("DELETE /goods/:id",()=>{
         it("should return an error message when an invalid ID is given", function(done) {
             chai.request(server)
                 .delete("/goods/dsdsd")
                 .end( (err, res) => {
                     expect(res).to.have.status(200);
                     expect(res.body.message).to.include("GOOD NOT DELETED!" ) ;
                     done();
                 });
         });
     });
```
### More in-depth details you can check out my test code in test/routes folder.

## Thank you for reading my assignment 1.
