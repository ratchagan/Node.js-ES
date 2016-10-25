//dependencies
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

//configuring express to use body-parser as a middle-ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//node running on 8080
app.get('/',function (req,res) {
  res.send('Node.js is up and running');
});
app.listen(8080,function () {
  console.log("Express server is running on port 8080");
});

//elasticsearch
var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

//Will return if index exists or will create a new index
client.indices.get({index:'flow-index'},function(err,resp,status){
    if(err){
        console.log(err);
        client.indices.create({index:'flow-index'},function(err,resp,status){
            if(err){
                console.log(err);}
            else{
                console.log("create",resp)}
        });
    }
    else{
            console.log("get",resp);
        }
});


// POST : http://127.0.0.1:8080/get/source
// {"sourceIP":"10.0.0.1"}
// POST : http://127.0.0.1:8080/get/destination
// {"destinationIP":"10.0.0.1"}
// POST : http://127.0.0.1:8080/get/srcdes
// {"sourceIP":"10.0.0.1",
//  "destinationIP": "10.0.0.2"}

app.post('/get/:ip',function(req,res) {
        if (req.params.ip == "source") {
            var srcip = req.body.sourceIP;
            client.search({
                index: 'flow-index',
                body: {
                    query: {
                        match: {
                            sourceIP: srcip
                        }
                    }
                }
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("GET", resp);
                    res.send(resp);
                }
            });
        }
        else if (req.params.ip == "destination") {
            var srcip = req.body.destinationIP;
            client.search({
                index: 'flow-index',
                body: {
                    query: {
                        match: {
                            sourceIP: srcip
                        }
                    }
                }
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("GET", resp);
                    res.send(resp);
                }
            });
        }
        else {
            var srcip = req.body.sourceIP;
            var desip = req.body.destinationIP;
            client.search({
                index: 'flow-index',
                body: {
                    query: {
                        match: {
                            sourceIP: srcip
                        },
                        match:{
                            destinationIP: desip
                        }
                    }
                }
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("GET", resp);
                    res.send(resp);
                }
            });
        }
    }
);

//creates a document with the given details
//we can retrive each document in an index with the combination of index+type+id
//id is represented using count to add & retrive multiple documents
//index can be create ahead or a new index will be created

app.post('/create',function(req,res){
    client.index({
            index: 'flow-index',
            type: 'document',
            body: req.body
        }
        ,function(err,resp,status) {
            if (err) {
                console.log(err);
            } else {
                res.send(resp);
                console.log("Created a flow-document successfuly")
            }
        });
});


//delete a document based on the document id
app.delete('/delete/',function(req,res){
    client.delete(req.body,function(err,resp,status){
        if(err){
            console.log(err);
        }else{
            res.send(resp);
            console.log("Deleted a flow successfully");
        }
    });
});




