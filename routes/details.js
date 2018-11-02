let Good = require("../models/goods");
let express = require("express");
let router = express.Router();

router.findDetails = (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    Good.aggregate([
        {
            $lookup:{
                from:"senders",
                localField: "_id",
                foreignField:"_id",
                as:"senders",
            }},
        {
            $lookup:{
                from:"receivers",
                localField: "_id",
                foreignField:"_id",
                as:"receivers",
            }
        },
        {
            $project:{
                "senders._id":0,
                "receivers._id":0
            }}

    ],function (err,details) {
        res.send(JSON.stringify(details,null,5));
    });
};

router.findDetailsByID = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    Good.aggregate([
        {
            $match:{
                "_id":parseInt(req.params.id)
            }},
        {
            $lookup:{
                from:"senders",
                localField: "_id",
                foreignField:"_id",
                as:"Sender",
            }},

        {
            $lookup:{
                from:"receivers",
                localField: "_id",
                foreignField:"_id",
                as:"Receiver",
            }},

        {
            $project:{
                "senders._id":0,
                "receivers._id":0
            }}
    ],function (err,details) {
        if(details.length ==0)
            res.send({ message: "Bad search!"});
        else
            res.send(JSON.stringify(details,null,5));
    });
};

module.exports = router;
