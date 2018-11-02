let mongoose = require("mongoose");
let ReceiverSchema = new mongoose.Schema({
    _id:Number,
    receiverName: String,
    receiverPhoneNumber: String,
    receiverCountry:String,
    receiverAddress:String,
    postcode:String
},{versionKey:false},
{ collection: "receivers" });

module.exports = mongoose.model("receivers", ReceiverSchema);
