STEP 1: To create a document, use the POST method with the following URL  in the REST Client and the JSON data in the payload[Id for each document will be generated in the node.js script]

http://127.0.0.1:8080/create
 {
 	"Source IP":"10.0.0.1",
 	"destination IP":"10.0.0.2",
 	"source port":"eth0",
 	"destination port":"eth1" ,
 	"protocol":"ipv4" 

 }


STEP 2: Use GET method in REST Client with the following url, specify the document id you want to retrieve. 

[http://127.0.0.1:8080/get/id]

http://127.0.0.1:8080/get/1

STEP 3: Use DELETE method in REST Client with the following URL and json data in the payload

http://127.0.0.1:8080/delete
{
 	"index": "index-flow",
 	"type": "flow-type",
	"id": "1"

 }
