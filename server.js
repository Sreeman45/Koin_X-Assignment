import express from 'express';
import mongoose from 'mongoose';
import {fetchApi,insertintoDatabase,updateDatabase,Router as statsrouter} from './routers/stats.js';
const app =express();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("there was an error",err))
setInterval(updateDatabase, 2 * 60 * 60 * 1000);
app.use('/stats',statsrouter)
app.listen(3000,()=>console.log("running..."))
