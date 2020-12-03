import jwt from 'jsonwebtoken';
import config from './server/config'

const getToken = (user) =>{
    return jwt.sign({id: user._id, isAdmin:user.isAdmin}, config.JWT_SECRET, {
        expiresIn: 1200000
    })


}

const isAuth = (req,res,next) =>{
    const token = req.headers.authorization
    if(token){
        const onlyToken = token.slice(7,token.length)
        jwt.verify(onlyToken, config.JWT_SECRET, (err,decode)=>{
            if(err){
                res.status(401).send({msg:'invalid token'});
                console.log('tutaj1')
            }
            req.user = decode;
            next()
            return
        })
    }
    else{
    return console.log('tutaj2')//res.status(401).send({msg: 'token is not supplied'})
}}

const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        return next();
        
    }
    else{
    return console.log('tutaj3') //res.status(401).send({msg:'Not adming'})

}}

export {getToken, isAdmin, isAuth }