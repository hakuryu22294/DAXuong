import {createUserService, loginUserService, updateUserService, deleteUserService, getAllUserService, getDetailsUserService} from '../service/UserService.js';
import {refreshToken} from '../service/JwtService.js'
export const createUserController = async (req, res) => {
    try{
        console.log(req.body)

        const {name, email, password, confirmPassword, phone} = req.body;
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = re.test(email);
        if(!name || !email || !password || !confirmPassword || !phone) return res.status(404).json({
            status: 'ERR',
            message:'Input is require'
        })
        if(!isCheckEmail) return res.status(404).json({
            status: 'ERR',
            message:'The input is email'
        })
        if(password !== confirmPassword) return res.status(404).json({
            status: 'ERR',
            message:'The password is equal confirm password'
        })
        const respon = await createUserService(req.body);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

export const loginUser = async (req, res) => {
    try{
        console.log(req.body)

        const {name, email, password, confirmPassword, phone} = req.body;
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = re.test(email);
        if(!name || !email || !password || !confirmPassword || !phone) return res.status(404).json({
            status: 'ERR',
            message:'Input is require'
        })
        if(!isCheckEmail) return res.status(404).json({
            status: 'ERR',
            message:'The input is email'
        })
        if(password !== confirmPassword) return res.status(404).json({
            status: 'ERR',
            message:'The password is equal confirm password'
        })
        const respon = await loginUserService(req.body);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

export const updateUserController = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(404).json({
                status: 'ERR',
                message:"The user is incorrect"
            })
        }
        const respon = await updateUserService(userId, data);
        console.log(respon)
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}

export const deleteUserController = async (req, res) => {
    try{
        const userId = req.params.id
        const token = req.headers
        console.log(token)
        if(!userId){
            return res.status(404).json({
                status: 'ERR',
                message:"The user is incorrect"
            })
        }
        // await deleteUserService(userId);
        return res.status(200).json({
            message: "delete successfully"
        });
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}

export const getAllUserController = async (req, res) => {
    try{
        const response = await getAllUserService()
        return res.status(200).json(response);
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}

export const getDetailsUserController = async (req, res) => {
    try{
        const response = await getDetailsUserService(req.params.id)
        return res.status(200).json(response);
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}

export const refreshTokenController = async (req, res) => {
    try{
        const token = req.headers.token.split(' ')[1];
        console.log(token)
        if(!token){
            return res.status(404).json({
                status:"ERROR",
                message: e.message
            })
        }
        const response = await refreshToken(token)
        return res.status(200).json(response);
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}







