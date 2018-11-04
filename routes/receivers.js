let receivers = require("../models/receivers");
let express = require("express");
let router = express.Router();


router.findAllReceivers = (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    receivers.find(function(err, receivers) {
        res.send(JSON.stringify(receivers,null,5));
    }).sort({_id:1});
};

router.findOneReceiver = (req, res) => {

    res.setHeader("Content-Type", "application/json");

    receivers.find({ "_id" : req.params.id },function(err, receivers) {
        if(receivers.length==0)
            res.json({ message: "Receiver NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(receivers,null,5));
    });
};

router.addReceiver = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var receiver = new receivers();
    receiver._id = req.body._id;
    receiver.receiverName = req.body.receiverName;
    receiver.receiverPhoneNumber = req.body.receiverPhoneNumber;
    receiver.receiverAddress =req.body.receiverAddress;
    receiver.receiverCountry =req.body.receiverCountry;
    receiver.postcode =req.body.postcode;
    receiver.save(function(err) {
        if (err)
            res.json({ message: "receiver NOT Added!", errmsg : err } );
        else
            res.json({ message: "receiver Successfully Added!", data: receiver });
    });
};

router.deleteReceiver = (req, res) => {
    receivers.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "Receiver NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "Receiver Successfully Deleted!"});
    });
};

router.changeReceiverPhoneNumber = (req, res) => {
    receivers.findById(req.params.id, function(err,receivers) {
        if (err){
            res.json({ message: "Receiver NOT Found!", errmsg : err } );
        }
        else {
            receivers.receiverPhoneNumber = req.params.phoneNumber;
            receivers.save(function (err) {
                if (err)
                    res.json({ message: "NOT change!", errmsg : err } );
                else
                    res.json({ message: "receiver phone number change!", data: receivers });
            });
        }
    });
};

router.changeReceiverAddress = (req, res) => {
    receivers.findById(req.params.id, function(err,receivers) {
        if (err)
            res.json({ message: "Receiver NOT Found!", errmsg : err } );
        else {
            receivers.receiverAddress = req.params.address;
            receivers.save(function (err) {
                if (err){
                    res.json({ message: "NOT change!", errmsg : err } );
                }
                else
                    res.json({ message: "receiver phone number change!", data: receivers });
            });
        }
    });
};
module.exports = router;
