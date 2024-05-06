import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

function getUsers(name, job) {
let query = {};
if (name && job) {
    query = { $and: [{ name: name }, { job: job }] };
} else if (name) {
    query = { name: name };
} else if (job) {
    query = { job: job };
}
return userModel.find(query);
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
  }
  
  

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise.then((newUser) => newUser.toObject());
}




function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};