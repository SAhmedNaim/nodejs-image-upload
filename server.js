const express	= require("express")
const multer	= require('multer')

const router    = express.Router()
const app	    = express()
const PORT      = 3000
const TOTAL_PHOTO_TO_BE_UPLOADED_AT_A_TIME = 3

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

app.get("/", (req, res) => {
    res.send("Server run successfully!!!");
});

const storage	= multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

// Allowed MIME Type: JPEG or PNG
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage     : storage,
    fileFilter  : fileFilter
}).array('photo', TOTAL_PHOTO_TO_BE_UPLOADED_AT_A_TIME);

app.post('/api/photo', (req, res) => {    
	upload(req, res, (err) => {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(PORT, function(){
    console.log(`Server is runnign on the port http://localhost/${PORT}`);
});