/**
 * Created by ranjitha on 10/27/16.
 */

//dependencies
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var elasticsearch = require('./elasticsearch.js');

//configuring express to use body-parser as a middle-ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000,function () {
    console.log("Express server is running on port 3000");
});

//create index
elasticsearch.getIndex().then(function(exits){
    if(exits){
        console.log("Index exits");
    }
}).then(elasticsearch.createIndex());


//insert flow-documents
app.post('/create',function(req,res){
    var doc = req.body;
    elasticsearch.addDocument(doc)
        .then(function (data){
            res.send(data);
    }, function(err){
        console.trace(err.message);
    });
});

//GET flows based on src-ip/des-ip/ser-des-ip
app.post('/get/:ip',function(req,res,next) {
    if (req.params.ip == "source") {
        var srcip = req.body.sourceIP;
        elasticsearch.searchSrcIP(srcip)
            .then(function (data) {
                res.send(data);
            }, function (err) {
                console.trace(err.message);
            });
    }
    else if (req.params.ip == "destination") {
        var desip = req.body.destinationIP;
        elasticsearch.searchDesIP(desip)
            .then(function (data) {
                res.send(data);
            }, function (err) {
                console.trace(err.message);
            });
    }
    else{
        var srcip = req.body.sourceIP;
        var desip = req.body.destinationIP;
        elasticsearch.searchSrcDesIP(srcip,desip)
            .then(function(data){
                res.send(data);
            },function(err){
                console.trace(err.message);
            })

    }
});

//delete a flow-document based src-ip/des-ip/ser-des-ip
app.delete('/delete/:ip',function(req,res) {
    if (req.params.ip == "source") {
        var srcip = req.body.sourceIP;
        elasticsearch.deleteSrcIP(srcip)
            .then(function (data) {
                res.send(data);
            }, function (err) {
                console.trace(err.message);
            });
    }
    else if (req.params.ip == "destination") {
        var desip = req.body.destinationIP;
        elasticsearch.deleteDesIP(desip)
            .then(function (data) {
                res.send(data);
            }, function (err) {
                console.trace(err.message);
            });
    }
    else{
        var srcip = req.body.sourceIP;
        var desip = req.body.destinationIP;
        elasticsearch.deleteSrcDesIP(srcip,desip)
            .then(function(data){
                res.send(data);
            },function(err){
                console.trace(err.message);
            })

    }
});

