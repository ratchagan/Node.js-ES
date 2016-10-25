var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "flow-index";

function deleteIndex(){
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

function createIndex(){
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.createIndex = createIndex;

function indexExists(){
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;


function indexMapping(){
    return elasticClient.indicies.putMapping({
       index: indexName,
        type:"document",
        body: {
           properties: {
               sourceIP: {type:"IP"},
                DestinationIP : {type:"IP"},
                sourceport : {type:"string"},
                destinationport : {type:"string"},
                protocol : {type:"string"}
           }
        }
    });
}

function addDocument(document) {
    return elasticClient.Index({
        index : indexName,
        type : "document",
        body: {
            sourceIP: document.sourceIP,
            DestinationIP: document.DestinationIP,
            sourceport: document.sourceport,
            destinationport: document.destinationport,
            protocol : document.protocol
        }
    });
}
exports.addDocument = addDocument;
