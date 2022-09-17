//require statements
require('dotenv').config({path: './config.env'});
const express = require('express');
const { Db } = require('mongodb');
const bodyParser = require('body-parser');
const User = require("./models/user.js");
const mongoose = require("mongoose");
const cors = require('cors');

//create the app and PORT
const app = express();
const PORT = 3000;

//get MongoDB driver connection
const dbo = require('./db');



//create an express router
const router = express.Router();

//middleware items
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())


router.route('/register').post((req, res) => {
    const dbConnect = dbo.getDb();
    let new_user = new User ({
        username: req.body.username,
        password: req.body.password
    });
    
    new_user.password = new_user.generateHash(new_user.password);
    new_user.save();

    dbConnect
    //choose the "users-test" table
    .collection("users-test")
    //insert a row into the table
    .insertOne(new_user, (err, result) => {
        if (err) {
            res.status(400).send("Error inserting user");
        } else {
            console.log(result);
            console.log(`Added a new user: ${new_user.username}`)
            res.status(204).send();
        }
    });
})


  
  app.post('/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
  
      if (!user.validPassword(req.body.password)) {
        //password did not match
      } else {
        console.log("success");
      }
    });
  });



//api endpoint to create a new exercsie 
router.route('/new-exercise').post((req, res) => {
    //get the database
    const dbConnect = dbo.getDb();
    //this is a "row" in our database
    const exerciseDocument = {
        user: req.body.user,
        muscle_group: req.body.muscle_group,
        exercise: req.body.exercise,
        reps: req.body.reps,
        weight: req.body.weight,
        intensity: req.body.intensity
    };

    dbConnect
        //choose the "exercises" table
        .collection("exercises")
        //insert a row into the table
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

//api endpoint to update reps
router.route('/update-reps').post((req, res) => {
    const dbConnect = dbo.getDb();
    //indicates which entry we are to change
    const to_update = 
    {
        user: req.body.user,
        muscle_group: req.body.muscle_group,
        exercise: req.body.exercise,
        weight: req.body.weight,
        intensity: req.body.intensity
    }
    //must use this to indicate what we are changing in the table
    const update = {
        $set: {
            reps: req.body.reps
        }
    }

    dbConnect
        .collection("exercises")
        .updateOne(to_update, update, (err, result) => {
            if (err) {
                res.status(400).send("Error updating")
            } else {
                console.log('Updated!')
                res.status(204).send()
            }
        })
})


//api endpoint to update the weight
router.route('/update-weight').post((req, res) => {
    const dbConnect = dbo.getDb();
    //indicates which entry we are to change
    const to_update = 
    {
        user: req.body.user,
        muscle_group: req.body.muscle_group,
        exercise: req.body.exercise,
        reps: req.body.reps,
        intensity: req.body.intensity
    }
    //must use this to indicate what we are changing in the table
    const update = {
        $set: {
            weight: req.body.weight
        }
    }

    dbConnect
        .collection("exercises")
        .updateOne(to_update, update, (err, result) => {
            if (err) {
                res.status(400).send("Error updating")
            } else {
                console.log('Updated!')
                res.status(204).send()
            }
        })
})

//tell the app to use the router
app.use(router);

//global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke.')
})

//connect to our database
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

