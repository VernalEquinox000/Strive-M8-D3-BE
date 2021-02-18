const jwt = require("jsonwebtoken")
const AuthorModel = require("../authors/schema")
const { verifyJWT } = require("./tools")

const authorize = async (req, res, next) => {
    try {

        const token = req.header("Authorization").replace("Bearer ", "")

        const decoded = await verifyJWT(token)

        const user = await AuthorModel.findOne({ token_id: decoded._id })

        if (!user) {
            throw new Error(error)
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        const err= new Error("Autenticaaaacazzooo!")
        err.httpStatusCode = 401
        next(err)
    }
}

module.exports = {authorize}