/**
 * Created by ranjitha on 10/27/16.
 */

var elasticsearch = require('elasticsearch');

var Q = require('q');

//creating a client
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

function getIndex(){
    var defer = Q.defer();
    return client.indices.get({
        index:'flow-index'
    });
    return defer.promise;
}
exports.getIndex = getIndex;

function createIndex(){
    var defer = Q.defer();
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
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.createIndex = createIndex;
//use data in .then() to pass data[response] to the http request
function addDocument(doc){
    var defer = Q.defer();
    return client.index({
        index: 'flow-index',
        type: 'document',
        body: doc
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.addDocument = addDocument;

function searchSrcIP(srcip){
    var defer = Q.defer();
    return client.search({
        index: 'flow-index',
        body: {
            query: {
                match: {
                    sourceIP: srcip
                }
            }
        }
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.searchSrcIP = searchSrcIP;

function searchDesIP(desip){
    var defer = Q.defer();
    return client.search({
        index: 'flow-index',
        body: {
            query: {
                match: {
                    destinationIP: desip
                }
            }
        }
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.searchDesIP = searchDesIP;

function searchSrcDesIP(srcip,desip){
    var defer = Q.defer();
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
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.searchSrcDesIP = searchSrcDesIP;

function deleteSrcIP(input,srcip){
    var defer = Q.defer();
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
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.deleteSrcIP = deleteSrcIP;

function deleteDesIP(desip){
    var defer = Q.defer();
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
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.deleteDesIP = deleteDesIP;

function deleteSrcDesIP(srcip,desip){
    var defer = Q.defer();
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
    }).then('data',function(data){
        defer.resolve(data);
    });
    return defer.promise;
}
exports.deleteSrcDesIP = deleteSrcDesIP;

