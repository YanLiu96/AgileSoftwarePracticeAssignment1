let shipmentDetails = require("../models/shipmentDetails");
let express = require("express");
let router = express.Router();



router.findAllDetails = (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    shipmentDetails.find(function(err, shipmentDetails) {
        res.send(JSON.stringify(shipmentDetails,null,5));
    });
};

router.findOneDetails = (req, res) => {

    res.setHeader("Content-Type", "application/json");

    shipmentDetails.find({ "_id" : req.params.id },function(err, shipmentDetails) {
        if(shipmentDetails.length==0)
            res.json({ message: "shipmentDetails NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(shipmentDetails,null,5));
    });
};

router.addDetails = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var shipmentDetail = new shipmentDetails();
    shipmentDetail._id = req.body._id;
    shipmentDetail.numberOfPackage =req.body.numberOfPackage;
    shipmentDetail.totalWeightInKg = req.body.totalWeight;
    shipmentDetail.dimensionsInCM = req.body.dimensionsInCM;
    shipmentDetail.save(function(err) {
        if (err)
            res.json({ message: "shipmentDetails NOT Added!", errmsg : err } );
        else
            res.json({ message: "shipmentDetails Successfully Added!", data: shipmentDetail });
    });
};

router.deleteDetails = (req, res) => {
    shipmentDetails.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "shipmentDetails NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "shipmentDetails Successfully Deleted!"});
    });
};

router.findGoodAndShipment = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    shipmentDetails.aggregate([
        {
            $match:{
                "_id":parseInt(req.params.id)
            }},
        {
            $lookup:{
                from:"goods",
                localField: "_id",
                foreignField:"_id",
                as:"goodsInformation",
            }},
        {
            $project:{
                "goodsInformation._id":0,
                "goodsInformation.deliveryman":0,
                "goodsInformation.goodsLocation":0
            }}
    ],function (err,details) {
        if(details.length==0)
            res.json({ message: "NO Information!", errmsg : err } );
        else
            res.send(JSON.stringify(details,null,5));
    });
};
module.exports = router;
