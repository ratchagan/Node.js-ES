//dependencies
var express = require('express');
var elasticsearch = require('elasticsearch');
var bodyParser = require('body-parser');

//elastic search
//elasticsearch.connect('elasticsearch://localhost:9200/get_flow');

var client = new elasticsearch.Client({
	host: 'localhost:9200',
  	log: 'trace'
});

client.indices.get({
	index: 'flow-records-table'
},function(err,resp,status){
if(err){
	console.log(err);
}else{
	console.log("GET",resp)
}
});
//client.indices.create({
//	index: 'newflow'
//},function(err,resp,status){
//if(err){
//	console.log(err);
//}else{
//	console.log("create",resp)
//}
//});
// express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//routes
//app.use('/api',require('./routes/api'));



//start server
app.listen(8080, function(){
	
	console.log("Express server is running on port 8080");
});
