var documents = require('./flow');

var express = require('express');
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/flow', documents);

app.get('/',function (req,res) {
    res.send('Node.js is up and running');
});
app.listen(8080,function () {
    console.log("Express server is running on port 8080");
});

app.post('/create',function(req,res)
{ var src = req.body.sourceIP;
    var des = req.body.destinationIP;
    var sprt = req.body.srcport;
    var dprt = req.body.desport;
    var prot = req.body.protocol;

    var elastic = require('./elasticsearch');
    elastic.indexExists().then(function (exists) {
        if (exists) {
            return elastic.deleteIndex();
        }
    }).then(function () {
        return elastic.createIndex().then(elastic.indexMapping).then(function () {
            var promises = [src, des, sprt, dprt, prot].map(function (src, des, sprt, dprt, prot) {
                return elastic.addDocument({
                    sourceIP: src,
                    destinationIP: des,
                    srcport: sprt,
                    desport: dprt,
                    protocol: prot
                });
            });
            return Promise.all(promises);
        });
    },function(err,resp,status){
        if(err){
            console.log(err);
        }else{
            res.send(resp);
            console.log("Created a flow-document successfuly")
        }
    });

});
