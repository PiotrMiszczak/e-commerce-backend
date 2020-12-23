import express from 'express'
import multer from 'multer'

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({storage})
uploadRouter.post('/', upload.single('image'), (req,res)=>
res.send(`/${req.file.path}`)
 )

 export default uploadRouter;