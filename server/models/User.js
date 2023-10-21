import mongoose from "mongoose";

//user json schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true, //no duplicate emails
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    //saving photos locally so we need the path to find the image
    picturePath: {
      type: String,
      default: "",
    },
    //array of other users
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  //automatic dates
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;