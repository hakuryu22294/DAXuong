import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import  {routes} from "./routes/index.js";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => console.log("Connect is successful"))
.catch(err => console.log(err));

app.listen(port,  () => console.log('listening on port ' + port));