import { asyncHandler } from "../utiles/asyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../modules/user.model.js";
import { uploadeOnCloudinary } from "../utiles/cloudinary.js";
import { ApiResponse } from "../utiles/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) =>{
    const {username, email, fullname, password} = req.body 
    if(
        [username, email, fullname, password].some((feilds)=> feilds?.trim() === '')
    ){
        throw new ApiError(400, 'All feilds is required')
    }
    const exitsUser = User.find({
        $or: [{username}, {email}]
    })
    if(exitsUser){
        throw new ApiError(409, 'username and email already exists')
    }
    const avatarLocalPath = req.file?.avatar[0]?.path
    const coverImageLocalPath = req.file?.coverimage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, 'avatar is required')
    }
    const avatar= await uploadeOnCloudinary(avatarLocalPath)
    const coverImage = await uploadeOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, 'avatar is required')
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverImage?.url || '',
        email,
        username: username.toLowerCase(),

    })
    const createdUser = await User.findById(user._id).select(
        '-password -refreshtoken'
    )
    if(!createdUser){
        throw new ApiError(500, 'something went wrong')
    }
    return res.status(201).jason(
        new ApiResponse(200, createdUser, "user register succesful")
    )
})

export {registerUser}