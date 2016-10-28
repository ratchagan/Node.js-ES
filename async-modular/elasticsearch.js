/**
 * Created by ranjitha on 10/27/16.
 */

var elasticsearch = require('elasticsearch');

//creating a client
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

function getIndex(){
    return client.indices.get({
        index:'flow-index'
    });
}
exports.getIndex = getIndex;

function createIndex(){
    return client.indices.create({
        index: 'flow-index',
        type: 'document',
        body: {
            properties: {
                sourceIP: {type: 'ip'},
                destinationIP: {type: 'ip'},
                sourceport: {type: 'string'},
                detinationport: {type: 'string'},
                protocol: {type: 'string'}
            }
        }
    });
}
exports.createIndex = createIndex;

function addDocument(doc){
    return client.index({
        index: 'flow-index',
        type: 'document',
        body: doc
    });
}
exports.addDocument = addDocument;

function searchSrcIP(srcip){
    return client.search({
        index: 'flow-index',
        body: {
            query: {
                match: {
                    sourceIP: srcip
                }
            }
        }
    });
}
exports.searchSrcIP = searchSrcIP;

function searchDesIP(desip){
    return client.search({
        index: 'flow-index',
        body: {
            query: {
                match: {
                    destinationIP: desip
                }
            }
        }
    });
}
exports.searchDesIP = searchDesIP;

function searchSrcDesIP(srcip,desip){
    return client.search({
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
    });
}
exports.searchSrcDesIP = searchSrcDesIP;

function deleteSrcIP(input,srcip){
    return client.delete({
        index: 'flow-index',
        type: 'document',
        id: '_query',
        body: {
            query: {
                match: {
                    sourceIP: srcip
                }
            }
        }
    });
}
exports.deleteSrcIP = deleteSrcIP;

function deleteDesIP(desip){
    return client.delete({
        index: 'flow-index',
        type: 'document',
        id: '_query',
        body: {
            query: {
                match: {
                    destinationIP: desip
                }
            }
        }
    });
}
exports.deleteDesIP = deleteDesIP;

function deleteSrcDesIP(srcip,desip){
    return client.delete({
        index: 'flow-index',
        type: 'document',
        id: '_query',
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
    });
}
exports.deleteSrcDesIP = deleteSrcDesIP;

