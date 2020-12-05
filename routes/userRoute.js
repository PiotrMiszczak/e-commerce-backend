import express from 'express'
import User from '../models/userModel'
import {getToken} from '../util'
import bcrypt from 'bcrypt'

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
   
    
        
        const user = await User.findOne({
          email: req.body.email,
               })

        if(user && bcrypt.compareSync(req.body.password, user.password)==true){
        res.send({
          id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email:user.email,
           token: getToken(user)
        });
        }
      
    else{
      res.status(401).send({ message: 'Invalid User Data.' });
    }
})

router.post("/register", async (req, res)=>{
 
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      });
      const newUser = await user.save();
      if (newUser) {
        res.send({
          id:newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(user)
          
        });
      } else {
        res.status(401).send({ message: 'Invalid User Data.' });
      }
    
  
})


export default router