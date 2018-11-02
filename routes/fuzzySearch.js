let fuzzySearch = require("../models/goods");
let express = require("express");
let router = express.Router();
router.FuzzySearchGoodOrSenderOrReceiverName = (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    var keyword = req.params.keyword;
    fuzzySearch.aggregate([
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
            }},
        {
            $project:{
                "senders._id":0,
                "receivers._id":0
            }},
        {
            $match:{
                $or: [
                    {goodsName:{$regex:keyword,$options: "$i"}},
                    {senders:{ $elemMatch:{sendersName:{$regex:keyword,$options: "$i"}}}},
                    {receivers:{ $elemMatch:{receiverName:{$regex:keyword,$options: "$i"}}}}
                ]}}
    ],function (err,details) {
        if(details.length==0)
            res.json({ message: "NO Information!"} );
        else
            res.send(JSON.stringify(details,null,5));
    });
};
module.exports = router;
