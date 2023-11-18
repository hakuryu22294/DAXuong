import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
    name: {type:String, required: true},
    email: {type:String, required: true},
    password : {type:String, required: true},
    isAdmin :{type:Boolean,default:false, required: true},
    phone: {type:Number,required: true},
    acess_token :{type:String, required: false},
    refresh_token: {type:String, required: false}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
export {User}