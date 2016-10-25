Note: Index will be created in the node.js client

STEP 1: To create a document, use the POST method with the following URL  in the REST Client and the JSON data in the payload[Id for each document will be generated in the node.js script]

http://127.0.0.1:8080/create
 {
 	"sourceIP":"10.0.0.1",
 	"destinationIP":"10.0.0.2",
 	"source port":"eth0",
 	"destination port":"eth1" ,
 	"protocol":"ipv4" 

 }


STEP 2: Use POST method in REST Client with the following url

To retrive flows with respect to sourceip
 POST : http://127.0.0.1:8080/get/source
 {"sourceIP":"10.0.0.1"}
 

To retrive flows with respect to destinationip
 POST : http://127.0.0.1:8080/get/destination
 {"destinationIP":"10.0.0.1"}
 

To retrive flows with respect to sourceip & destinationip
 POST : http://127.0.0.1:8080/get/srcdes
 {"sourceIP":"10.0.0.1",
 "destinationIP": "10.0.0.2"}

STEP 3: DELETE
 //TO DO
