const express = require("express");
const router = express.Router();
const {Account} = require("../db");
const { authmiddleware } = require("../middleware");
const mongoose  = require("mongoose");
router.get("/balance",authmiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    });
    res.json({
        balance:account.balance
    })

});
router.post("/transfer",authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount , to} = req.body;
    const account = await Account.findOne({userId:req.userId}).session(session);
    if(!account || account.balance <amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"insufficient balance"
        });
    }
    const toAccount = await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }
    await account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    });
});
module.exports = router;