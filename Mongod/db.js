import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  name : String,
  email : String,
  password : String
});

const todoSchema = new Schema({
  userId :ObjectId,
  title : String,
  done : Boolean
});


const UserModel = mongoose.model("users",userSchema);
const todoModel = mongoose.model("todos",todoSchema);


export {UserModel,todoModel};