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

//gets the flow id from the url and displays the specific flow
//get method changed to retrive each documents based on id
app.get('/get/:id',function(req,res){
    client.get({
        index:'index-flow',
        type:'flow-type',
        id: req.params.id
        },function(err,resp,status){
            if(err){
                console.log(err);
            }else{
                console.log("GET",resp);
                res.send(resp);
            }
    });
    }

);

//creates a document with the given details
//we can retrive each document in an index with the combination of index+type+id
//id is represented using count to add & retrive multiple documents
//index can be create ahead or a new index will be created
var count=0;
app.post('/create',function(req,res){

    client.index(
        {
            index: 'index-flow',
            type: 'flow-type',
            id: count++,
            body: req.body
        }
        ,function(err,resp,status){
        if(err){
            console.log(err);
        }else{
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


