//require mongodb
const { MongoClient} = require("mongodb");
require('dotenv').config({path: '.env'});

const connectionString = process.env.ATLAS_URI

//Client Object requires a connection string
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

//module.exports are the instructions that tell Node.js which bits of code
//to export from a given file, to allow other files 
module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            //if we encounter an error or there is no db
            if (err || !db) {
                return callback(err)
            }

            //connect to the "gym-buddy" database
            dbConnection = db.db("gym-buddy")
            console.log("Succesfully connected to MongoDB");

            return callback();
        });
    }, 
    getDb: () => dbConnection,
}