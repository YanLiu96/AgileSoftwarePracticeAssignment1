let mongoose = require("mongoose");
let ShipmentSchema = new mongoose.Schema({
    _id:Number,
    numberOfPackage: Number,
    totalWeightInKg:Number,
    dimensionsInCM:{
        length:Number,
        width:Number,
        height:Number
    },
},{versionKey:false},{unique:false},
{ collection: "shipmentDetails" });
ShipmentSchema.set('autoIndex', false);
module.exports = mongoose.model("shipmentDetails", ShipmentSchema);
