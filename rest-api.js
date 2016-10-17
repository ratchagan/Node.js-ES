//dependencies
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

//configuring express to use body-parser as a middle-ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//express

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
app.get('/get/:flow',function(req,res){
    client.indices.get({
        index:req.params.flow },function(err,resp,status){
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
app.post('/create',function(req,res){
    client.create(req.body,function(err,resp,status){
        if(err){
            console.log(err);
        }else{
            res.send(resp);
            console.log("Created a flow-document successfuly")
        }
    });
});

//deletes a flow with the given index name,type,id
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




