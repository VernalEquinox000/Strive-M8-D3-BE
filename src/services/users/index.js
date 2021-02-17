const express = require("express")
const { authenticate } = require("../auth/tools")

const { authorize } = require("../auth/middleware")

const UserModel = require("./schema")

const usersRouter = express.Router()

usersRouter.post("/signup", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
        
        res.status(201).send(_id)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

usersRouter.get("/", authorize, async (req, res, next) => {
    try {
        console.log(req.user) 
        const users = await UserModel.find()
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
})

module.exports= usersRouter