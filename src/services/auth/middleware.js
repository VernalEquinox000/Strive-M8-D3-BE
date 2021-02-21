const jwt = require("jsonwebtoken")
const AuthorModel = require("../authors/schema")
const { verifyJWT } = require("./tools")

const authorize = async (req, res, next) => {
    try {

        const token = req.header("Authorization").replace("Bearer ", "")

        const decoded = await verifyJWT(token)

        const author = await AuthorModel.findOne({ _id: decoded._id })
        console.log(decoded._id)

        if (!author) {
            throw new Error("Error!")
        }

        req.token = token
        req.author = author
        next()
    } catch (error) {
        /* const err = new Error("Autenticaaaa!")
        err.httpStatusCode = 401 */
        console.log(error)
        next(error)
    }
}

module.exports = {authorize}