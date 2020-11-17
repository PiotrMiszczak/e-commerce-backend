import express from 'express'
import User from '../models/userModel'

const router = express.Router();

router.get("/createadmin", async (req, res)=>{
    try {
        const user = new User({
          name: 'Piotr',
          email: 'miszpiotr@wp.pl',
          password: '1234',
          isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
      }
    catch(error){
        console.log('err')
    }
})

router.post("/signin", async (req, res)=>{
    try {
        const user = User.findOne({
            email: req.body.email,
            password: req.body.password
        }
        )
        if(user){
        res.send({
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            token: getToken(user)
        });
        }
      }
    catch(error){
        console.log('err')
    }
})

export default router