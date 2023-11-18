import { User } from "../models/UserModels.js";
import bcrypt from 'bcrypt';
import { generalAccessToken, generalRefreshToken } from "./JwtService.js";

export const createUserService = (newUser) => {
   return new Promise(async (res,rej) => {
    const {name, email, password, confirmPassword, phone} = newUser;
    try{
      const checkUser = await User.findOne({email: email});
      if(checkUser !== null){
        res({
          status: "OK",
          message: "The email is already"
        })
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name, 
        email, 
        password : hashPassword, 
        phone
      });
      if(createdUser){
        res({
          status: "OK",
          message: 'Successfully created',
          datas : createdUser
        })
      }
      
    }catch(e){
        rej(e);
    }
   }) 
}

export const loginUserService = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const {name, email, password, confirmPassword, phone} = userLogin;
    try{
      const checkUser = await User.findOne({
        email: email,
      })
      if(checkUser===null){
        resolve({
          status: "ERR",
          message:"The user is not defined"
        })
      }
      const comparePassword = bcrypt.compare(password, checkUser.password);
      if(!comparePassword){
        resolve({
          status: "ERR",
          message:"Password or user incorrect"
        })
      }
      const accessToken = await generalAccessToken({
        id:checkUser.id,
        isAdmin : checkUser.isAdmin,

      })
      const refreshToken = await generalRefreshToken({
        id:checkUser.id,
        isAdmin : checkUser.isAdmin,
      })
      console.log(accessToken)
      resolve({
        status: "OK",
        message:"SUCCESS",
        accessToken,
        refreshToken
      })
    }catch(err){
      reject(err);
    }
  })
}

export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try{
      const checkUser = await User.findById(id);
      if(checkUser===null){
        resolve({
          status: "ERR",
          message:"The user is not defined"
        })
      }
     const updateUser = await User.findByIdAndUpdate(id, data, {new: true});
     console.log(data)
      resolve({
        status: "OK",
        message:"SUCCESS",
        data:updateUser
      })
    }catch(err){
      reject(err);
    }
  })
}

export const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try{
      const checkUser = await User.findById(id);
      if(checkUser===null){
        resolve({
          status: "ERR",
          message:"The user is not defined"
        })
      }
      // await User.findByIdAndDelete(id);
     console.log(data)
      resolve({
        status: "OK",
        message:"SUCCESS",
      })
    }catch(err){
      reject(err);
    }
  })
}

export const getAllUserService = () => {
  return new Promise(async (resolve, reject) => {
    try{
      const allUser = await User.find()
      resolve({
        status: "OK",
        message:"SUCCESS",
        data: allUser
      })
    }catch(err){
      reject(err);
    }
  })
}

export const getDetailsUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try{
      const checkUser = await User.findOne({
        _id:id
      });
      if(checkUser === null) resolve({
        status: "OK",
        message:"user is not defined"
      })
      resolve({
        status: "OK",
        message:"SUCCESS",
        data: checkUser
      })
    }catch(err){
      reject(err);
    }
  })
}

