let goods = require("../models/goods");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

var mongodbUri = "mongodb://YanLiu96:LY19961222..@ds251332.mlab.com:51332/yanliu";
mongoose.connect(mongodbUri,{useNewUrlParser:true});
let db = mongoose.connection;
db.on("error", function (err) {
    console.log("Unable to Connect to [ " + db.name + " ]", err);
});

db.once("open", function () {
    console.log("Successfully Connected to transportation database");
});

router.findAllGoods = (req,res)=> {
    res.setHeader("Content-Type", "application/json");
    goods.find(function(err, goods) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(goods,null,5));
    }).sort({_id:1});

};

router.findOneGood = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    goods.find({ "_id" : req.params.id },function(err, goods) {
        if(goods.length==0)
            res.json({ message: "Good NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(goods,null,5));
    });
};

router.addGood = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var good = new goods();
    good._id = req.body._id;
    good.goodsName = req.body.goodsName;
    good.deliveryman = req.body.deliveryman;
    good.goodsLocation =req.body.goodsLocation;
    good.save(function(err) {
        if (err)
            res.json({ message: "Good NOT Added!", errmsg : err } );
        else
            res.json({ message: "Good Successfully Added!", data: good });
    });
};

router.deleteGood = (req, res) => {
    goods.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "GOOD NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "Good Successfully Deleted!"});
    });
};

router.changeGoodLocation = (req, res) => {
    goods.findById(req.params.id, function(err,goods) {
        if (err)
            res.json({ message: "Good NOT Found!", errmsg : err } );
        else {
            goods.goodsLocation = req.params.location;
            goods.save(function (err) {
                if (err)
                    res.json({ message: "Good Location NOT Change!", errmsg : err } );
                else
                    res.json({ message: "Good Location Successfully Change!", data: goods });
            });
        }
    });
};

router.changeDeliveryman = (req, res) => {
    goods.findById(req.params.id, function(err,goods) {
        if (err)
            res.json({ message: " NO found!", errmsg : err } );
        else {
            goods.deliveryman.deliverymanName = req.params.name;
            goods.deliveryman.phoneNumbere = req.params.phoneNumber;
            goods.save(function (err) {
                if (err)
                    res.json({ message: "NOT change!", errmsg : err } );
                else
                    res.json({ message: "Delivery man name and phone number change!", data: goods });
            });
        }
    });
};
module.exports = router;
