let mongoose = require("mongoose");
let SenderSchema = new mongoose.Schema({
    _id:Number,
    senderMethod:String,
    sendersName: String,
    senderPhoneNumber: String,
    senderAddress: String,
    postcode:String,
    sendDate:String
},{versionKey:false},
{ collection: "senders" });

module.exports = mongoose.model("senders", SenderSchema);
