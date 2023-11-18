import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    console.log(token);
    jsonwebtoken.verify(token, 'acess_token' , function (err, user) {
        console.log(user);
        // const {payload} = user
        if(err){
            console.log(err);
            return res.status(404).json({
                message: ' The authemtiacation',
                status:"ERROR"
            })
        }
        const {payload} = user
        if(payload.isAdmin){
            next();
        }else{
            return res.status(404).json({
                message: ' The authemtiacation',
                status:"ERROR"
            })
        }
        console.log(user)
    })
    
}

export const autUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userID = req.params.id
    console.log(token);
    jsonwebtoken.verify(token, 'acess_token' , function (err, user) {
        console.log(user);
        // const {payload} = user
        if(err){
            console.log(err);
            return res.status(404).json({
                message: ' The authemtiacation',
                status:"ERROR"
            })
        }
        const {payload} = user
        if(payload?.isAdmin || payload?.id === userID){
            next();
        }else{
            return res.status(404).json({
                message: ' The authemtiacation',
                status:"ERROR"
            })
        }
        console.log(user)
    })
    
}