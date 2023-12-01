const express = require("express");
const app = express();
const Jimp = require("jimp");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "Images");
  },
  filename: (req, file, cb) => {
    return cb(null, `Image_${Date.now()}_${path.extname(file.originalname)}`);
  },
});
var recentFile = null;
const upload = multer({
  storage: storage,
});

// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json())

// image upload api
app.post("/uploads", upload.single("image"), async (req, res, next) => {
  // let data = await req.body;

  if (req.file) {
    console.log("file uploaded");
    let name = req.file.filename;
    recentFile = name;
    res.send("image uploaded");
  } else {
    res.send("Please select a file");
  }
});

// image resizer api
app.post("/resize", (req, res) => {
  const h = parseInt(req.body.height);
  const w = parseInt(req.body.width);
  // console.log(typeof(h))
  console.log(req.body)
  if (recentFile === null) {
    res.send('Please select a valid file')
  } else {
    Jimp.read(`./Images/${recentFile}`, (err, lenna) => {
      if (err) {
        console.log(err);
      }
      lenna
        .resize(h,w) // resize
        .quality(100)
        .write(`./Resized/Resized_${recentFile}.jpg`); // save
    }).then(() => res.send("resized succesfully"));
  }

  console.log("image resized");
});

// download api

app.get("/download", (req, res) => {
  res.download(`./Resized/Resized_${recentFile}.jpg`,`File.jpg`, (err) => {

    console.log(recentFile)
    if (!err) {
      console.log("file downloaded");
    }
  });
  console.log("downloaded succesfully");
});

app.listen(5000);
console.log("server running...");
