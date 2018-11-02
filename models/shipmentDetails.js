let mongoose = require("mongoose");
let GoodSchema = new mongoose.Schema({
    _id:Number,
    numberOfPackage: Number,
    totalWeightInKg:Number,
    dimensionsInCM:{
        length:Number,
        width:Number,
        height:Number
    },
},{versionKey:false},
{ collection: "shipmentDetails" });

module.exports = mongoose.model("shipmentDetails", GoodSchema);
