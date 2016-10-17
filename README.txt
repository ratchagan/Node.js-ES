README

The following dependencies must be installed

1-->npm install elasticsearch body-parser

Node.js | express.js | elasticsearch must be started in the background

Start ES : elasticsearch-2.4.1/bin/elasticsearch

STEP 1: POST to the restapi

http://127.0.0.1:8080/create

{
	"index": "flow-records-table",
	"type": "mytype",
  	"id": "1",
    "body":
  	{
 		"Source IP":"10.0.0.1",
 		"destination IP":"10.0.0.2",
 		"source port":"eth0",
 		"destination port":"eth1" ,
 		"protocol":"ipv4" 

 	}
}

STEP 2: GET request to restapi to display the created flow

http://127.0.0.1:8080/get/flow-records-table

STEP 3: DELETE a flow [Note: can delete only by specfic index based on ID]
https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete

http://127.0.0.1:8080/delete/

{
	"index": "flow-records-table2",
	"type": "mytype",
  	"id": "1"
    
}

Notes: WebStorm IDE 