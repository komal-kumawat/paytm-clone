// routes/user.js
const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}  = require( "../config");
const {User,Account} = require("../db");
const {authmiddleware} = require("../middleware");
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.post("/signup", async(req, res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "email already exists / incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        return res.status(411).json({
            message: "email already exists / incorrect inputs"
        })
    }
    const dbUser = await User.create(body);
    await Account.create({
        userId:dbUser._id,
        balance:1+Math.random()*10000
    })
    const token = jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)
    res.json({
        message:"User created successfully",
        token:token
    });
})

router.post("/signin",async(req,res)=>{
    const { success } = signinBody.safeParse(req.body);
    const user = await User.findOne({
        username: req.body.username,
        password:req.body.password
    });
    
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)
        return  res.status(200).json({
            token:token
        })
    }
    return res.status(411).json({
        message:"user not found"
    });
})

router.put("/",authmiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},req.body);
     return res.status(200).json({
        message:"updated successfully"
    })

})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter ||"";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;

