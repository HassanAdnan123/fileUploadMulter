var express = require('express')
var cors = require('cors')
var multer  = require('multer')


var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }
    }
);

var upload = multer({storage: storage});

var app = express()

var corsConfig = {
    origin: "http://localhost:8888"
};

app.use(cors(corsConfig));

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {

      res.send("<p><span style=\"border: solid 2px sandybrown;margin: 20px;padding: 10px;font-family: sans-serif;\"> Upload successful! </span> </p>") ; 
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})