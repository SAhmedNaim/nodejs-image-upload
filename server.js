const express	= require("express")
const multer	= require('multer')
const app	    = express()
const PORT      = 3000

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Success");
});

app.listen(PORT, function(){
    console.log(`Server is runnign on the port http://localhost/${PORT}`);
});