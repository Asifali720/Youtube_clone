import mongoose,{Schema} from 'mongoose '
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
     username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
     },
     email: {
        type: String,
        required: true,
        lowercase: true,
     },
     fullname: {
        type: String,
        required: true,
        trim: true,
     },
     avatar: {
        type: String,
        required: true
     },
     coverimage: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    refreshtoken:{
        type: String
    },
    watched:{
        type: Schema.Types.objectId,
        ref: 'Video'
    }
},
{
    timeStamps: true
}
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRETS,
    {
        expiresIn: process.env.ACESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model('User', userSchema)