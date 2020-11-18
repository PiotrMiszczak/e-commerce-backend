import jwt from 'jsonwebtoken';
import config from './server/config'

const getToken = (user) =>{
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn:'24h'
    })


}

export default getToken;