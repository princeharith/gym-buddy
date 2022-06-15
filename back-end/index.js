//require statement
const express = require('express');

//create the app and PORT
const app = express();
const PORT = 3000;


//create an express router
const router = express.Router();

//takes in url endpoint, and request/result
router.get('/hello', (req, res, next) => {
    console.log("Hello there");
    res.end();
})

router.get('/mustang', (req, res, next) => {
    console.log("V8 Baby. Real American Muscle.")
    res.end();
})

router.get('/jonsky', (req, res) => {
    console.log("Tren setter");
    res.end();
})

//tell the app to use the router
app.use(router);

//takes in a port and error function
app.listen(PORT, err => {
    if(err) console.error(err)
    console.log("Listening on PORT:", PORT)
})