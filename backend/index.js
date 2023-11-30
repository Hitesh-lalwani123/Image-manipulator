const express = require('express')
const app = express();
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,"Images");
    },
    filename:(req,file,cb)=>{
        return cb(null,`Image_${Date.now()}_${path.extname(file.originalname)}`)
    }

})

const upload = multer({
    storage: storage
})

app.post('/uploads',upload.single('image'),async(req,res)=>{
    // let data = await req.body;
    console.log('image uploaded')

})

app.listen(5000);
console.log("server running...")