
const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
        },
/*         firstName: {
            type: String,
            
        },
        lastName: {
            type: String,
            
        },
        role: {
            type: String,
            enum: ["user", "admin"]
        }, */
    },
        {timestamps: true}
)

UserSchema.pre("save", async function (next) {
    const user = this // 
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    /*     bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    }); */
    }
    next()
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.__v

    return userObj
}

UserSchema.statics.findByCredentials = async function (username, password) {
    console.log(username,password)
    const user = await this.findOne({ username })
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) return user
        else return ("password not valid")
    }
    else return ("user not found!")
    }


module.exports = model("User", UserSchema)