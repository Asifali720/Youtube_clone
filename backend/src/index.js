import { app } from "./app.js";
import connectionDataBase from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})



connectionDataBase()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server connected on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log('MONGODB connection failed !!!', err);
})

/* const app = express()

( async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on('error', (error)=>{
            console.log('ERRoR: ', error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log('Error', error);
        throw error
    }
  })() */