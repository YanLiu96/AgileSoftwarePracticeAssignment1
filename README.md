# Assignment 2 - Web API - Automated development process.

Name: Yan Liu 

Student No.: 20082245

## Overview.

This express-transportation Web API is used for the vue client. It mainly about how to manage goods, senders and receivers and let people search express (in there called goods). It adopts Node.js + Express + mongodb etc. structure to build API.


## API endpoints.

Goods

 + GET /goods - Get all express (goods) information.
 + Get /goods/:id - Get one good information by ID.
 + GET /goods/findTotalVotes/ - Get the sum of votes for a deliveryman.
 + POT /goods/ - Post a good information
 + put /goods/:id - Edit a good information
 + PUT /goods/:id/changeLocation/:location - Change good location
 + put /goods/:id/voteForDeliveryman - Upvote for deliveryman
 + Delete /goods/:id - Delete a good information

Senders

+ Get /senders - Get all senders information.
+ Get /senders/:id - Get one sender information by ID
+ POT /senders/ - Post a good information
+ Delete /senders/:id - Delete a sender information

Receivers

+ Get /receivers - Get all receivers information.
+ Get /receivers/:id - Get one receiver information by ID
+ POT /receivers/ - Post a good information
+ Delete /receivers/:id - Delete a sender information
+ Put /receivers/:id/changePhoneNumber/:phoneNumber - Change the phone number of receiver
+ Put /receivers/:id/changeAddress/:address - Change the address of receiver

FuzzySearch

+ Get /fuzzySearch/:keyword - Fuzzy search record by keyword in goods or senders or receivers information.

## Continuous Integration and Test results.

+ URL of github of this webAPI

  https://github.com/YanLiu96/AgileSoftwarePracticeAssignment1

+ URL of the Travis build page for web API.

  https://travis-ci.org/YanLiu96/AgileSoftwarePracticeAssignment1


+ URL of published test coverage results on Coveralls.  

  https://coveralls.io/github/YanLiu96/AgileSoftwarePracticeAssignment1

## Extra features.

### 1. Build automation and Continuous Integration 

I use git branch called development connect with travis. In this branch i use npm scripts to perform transpilitation, linting, watching, etc.You can see my pack,json in development branch in github above. Just like below.

```javascipt
"scripts": {
    "server": "cross-env NODE_ENV=dev PORT=3000 node lib/bin/www",
    "start": "npm-run-all test build server",
    "postbuild": "npm run server",
    "prebuild": "npm-run-all test clean",
    "lint": "esw  ./test ./routes ./models/ app.js",
    "lint:watch": "npm run lint -- --watch",
    "build": "babel ./ --out-dir lib/ --ignore ./node_modules,./.babelrc,./package.json,./package-lock.json,./test --copy-files",
    "test": "cross-env NODE_ENV=test mocha --compilers js:babel-core/register test/routes/*.js",
    "coverage": "cross-env NODE_ENV=test PORT=4000 nyc mocha test/routes/*.js",
    "publish-coverage": "nyc report --reporter=text-lcov | coveralls",
    "test:watch": "npm run test -- --watch",
    "clean": "rimraf ./lib && mkdir lib",
    "server:watch": "cross-env NODE_ENV=dev nodemon --exec babel-node bin/www"
  },
```

### 2. Auto-Deploying

I deploy my server to heroku by using github connection. You can see the environments section in my github above. It will show `Deployed to express-transportation-server`. In the heroku deploy section. I choose `Wait for CI to pass before deploy`, which base on Continuous Integration service configured on my project.

### 3. My effort

I use passport to realize login with facebook google github in the API, but it not good idea to use in the Client. I use firebase  to let user login in the client. And the cilent id and clientSecrect and callbackURL can not be used at two project. So i delete auth passport in this API. I think it is a study process which should be evaluated.