import jsonwebtoken from 'jsonwebtoken';
export const generalAccessToken = (payload) => {
    const accessToken = jsonwebtoken.sign({
        payload,
    },'acess_token',{ expiresIn:'1h'})
    return accessToken;
}

export const generalRefreshToken = (payload) => {
    const accessToken = jsonwebtoken.sign({
        payload,
    },'refresh_token',{ expiresIn:'365d'})
    return accessToken;
}

export const refreshToken = token => {
    return new Promise((resolve, reject) => {
        try{
            jsonwebtoken.verify(token, 'refresh_token', async (err, user) => {
                console.log(err);
                if(err){
                    resolve({
                        status: 'ERROR',
                        message: 'The authenticated user'
                    })
                }
                const {payload} = user;
                const acess_token = await generalAccessToken({
                    id:payload?.id,
                    isAdmin: payload?.isAdmin,
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    acess_token
                })
            })
        }catch(err){
            reject(err);
        }
        
    })
}