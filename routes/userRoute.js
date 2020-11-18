import express from 'express'
import User from '../models/userModel'
import getToken from '../util'

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
        
        const user = await User.findOne({
          password: req.body.password,
          email: req.body.email,
               })
        if(user){
            
        res.send({
            name: user.name,
            isAdmin: user.isAdmin,
            email:user.email,
           // token: getToken(user)
        });
        }
      }
    catch(error){
        console.log('invalid')
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

          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          
        });
      } else {
        res.status(401).send({ message: 'Invalid User Data.' });
      }
    
  
})


export default router