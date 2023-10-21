import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js"; //authenciation import

//configs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( {policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//set up file storage
//multer will let us upload images into mongo
const storage = multer.diskStorage({
    //saving file from wesbite locally 
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

//authentication and authorization
//authentication is when u register
//authorization is making sure someone is logged in to perform certain operations
app.post("/auth/register", upload.single("picture"), register);//middleware function + controller (logic of the endpoint)
app.post("/posts", verifyToken, upload.single("picture"), createPost);


//routes
//using our api endpoints
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// mongoose set up: ports set up
const PORT = process.env.PORT || 6001;//6001 is a back up port number
mongoose.connect(process.env.URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
//after we connect to mongo we must set up the port
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
//the error caught is the specific error being displayed
.catch((error) =>console(`${error} did not connect`));
