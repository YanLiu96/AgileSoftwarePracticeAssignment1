let mongoose = require("mongoose");
let SenderSchema = new mongoose.Schema({
    senderMethod:String,
    sendersName: String,
    senderPhoneNumber: String,
    senderAddress: String,
    postcode:String,
    sendDate:String
},{versionKey:false},{unique:false},
{ collection: "senders" });
SenderSchema.set("autoIndex", false);
module.exports = mongoose.model("senders", SenderSchema);
