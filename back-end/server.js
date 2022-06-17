//require statements
require('dotenv').config({path: './config.env'});
const express = require('express');
const { Db } = require('mongodb');
const bodyParser = require('body-parser');

//create the app and PORT
const app = express();
const PORT = 3000;

//get MongoDB driver connection
const dbo = require('./db');



//create an express router
const router = express.Router();

//takes in url endpoint, and callback (takes in request/result)
router.get('/hello', (req, res, next) => {
    res.send("Hello there");
})

router.get('/mustang', (req, res, next) => {
    res.json("V8 Baby. Real American Muscle.")
})

router.get('/jonsky', (req, res) => {
    res.json("Tren setter");
})

router.route('/test').get(async function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection('listingsAndReviews')
        .find({})
        .limit(50)
        .toArray((err, _res) => {
            if (err) {
                res.status(400).send('Error fetching listings!')
            } else {
                res.json(_res)
            }
        })
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.route('/test-create').post((req, res) => {
    const dbConnect = dbo.getDb();
    const exerciseDocument = {
        exercise: req.body.exercise,
        intensity: req.body.intensity
    };


    dbConnect
        .collection("exercises")
        .insertOne(exerciseDocument, (err, result) => {
            if (err) {
                res.status(400).send("Error inserting exercise");
            } else {
                console.log(result);
                console.log(`Added a new exercise: ${exerciseDocument.exercise}`)
                res.status(204).send();
            }
        });
});

//tell the app to use the router
app.use(router);

//global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke.')
})

dbo.connectToServer((err) => {
    if(err){
        console.error(err);
        process.exit();
    }
})

//takes in a port and error function
app.listen(PORT, err => {
    if(err) console.error(err)
    console.log("Listening on PORT:", PORT)
})

