const jwt = require('jsonwebtoken')
const UserSchema = require("../users/schema")

const authenticate = async user => {
    try {
        const accessToken = await generateJWT({ _id: user._id })
        
        return accessToken
        
    } catch (error) {
        console.log(error)

        throw new Error(error)
    }
}

const generateJWT = payload =>
    new Promise((res, rej) => 
        jwt.sign(payload.process.env.JWT.SECRET),
        { expiresIn: "12 hours" }, (error, token) => {
            if (error) rej(error)
            res(token)

    })
        

const verifyJWT = token => 
    new Promise((res, rej) => {
        jwt.verify(token, process.env.JWT.SECRET, (err, decoded) => {
            if (error) rej(error)
            res(decoded)
    })
})