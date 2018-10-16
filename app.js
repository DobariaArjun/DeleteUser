const admin = require('firebase-admin');
const express = require('express'),
    bodyParser = require('body-parser');
const app = express(),
    port = process.env.PORT || 3000;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var serviceAccount = require('./petra-corp-firebase-adminsdk-l0mlh-00fbe365d1.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://petra-corp.firebaseio.com"
});

app.get('/',(req,res)=>{
    res.send("Server Running... :) ");
})

app.get('/stop',(req,res) => {
    return res.status(200).send({"status" : "false"});
})

app.post('/deleteUser',jsonParser,(req,res) => {
    if (!req.body.uid)
    {
        return res.status(400).send({"status" : "Bad Request"});
    }
    else {
        var uid = req.body.uid;
        console.log(uid);
        admin.auth().deleteUser(uid)
            .then(function() {
                return res.status(200).send({"status" : "Success"});

            })
            .catch(function(error) {
                return res.status(200).send({"status" : "error"});

            });
    }

})

app.listen(port);
