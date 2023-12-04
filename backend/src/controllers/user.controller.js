import { asyncHandler } from "../utiles/asyncHandler.js";


const registerUser = asyncHandler(async (res, req, next) =>{
   res.status(200).json({
        message: 'ok'
    })
})

export {registerUser}