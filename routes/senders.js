let senders = require("../models/senders");
let express = require("express");
let router = express.Router();



router.findAllSenders = (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    senders.find(function(err, goods) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(goods,null,5));
    });
};

router.findOneSender = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    senders.find({ "_id" : req.params.id },function(err, senders) {
        if(senders.length==0)
            res.json({ message: "Sender NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(senders,null,5));
    });
};
router.findCount = (req,res) =>{
    res.setHeader("Content-Type", "application/json");
    var senderName = req.params.senderName;
    senders.aggregate([
        {$match:{sendersName:senderName}},
        {$group:{_id:"$sendersName",count:{$sum:1}}}
    ],function (err,sender) {
        if(sender.length==0)
            res.json({ message: "NO Information!", errmsg : err } );
        else
            res.send(JSON.stringify(sender,null,5));
    });
};
router.addSender = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var sender = new senders();
    sender._id = req.body._id;
    sender.senderMethod =req.body.senderMethod;
    sender.sendersName = req.body.sendersName;
    sender.senderPhoneNumber = req.body.senderPhoneNumber;
    sender.senderAddress =req.body.senderLocation;
    sender.postcode =req.body.postcode;
    sender.sendDate = req.body.sendDate;
    sender.save(function(err) {
        if (err)
            res.json({ message: "Sender NOT Added!", errmsg : err } );
        else
            res.json({ message: "Sender Successfully Added!", data: sender });
    });
};

router.deleteSender = (req, res) => {
    senders.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "Sender NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "Sender Successfully Deleted!"});
    });
};

module.exports = router;
