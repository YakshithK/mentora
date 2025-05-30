// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var vector_query_pb = require('./vector_query_pb.js');

function serialize_vectorquery_QueryRequest(arg) {
  if (!(arg instanceof vector_query_pb.QueryRequest)) {
    throw new Error('Expected argument of type vectorquery.QueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vectorquery_QueryRequest(buffer_arg) {
  return vector_query_pb.QueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vectorquery_QueryResponse(arg) {
  if (!(arg instanceof vector_query_pb.QueryResponse)) {
    throw new Error('Expected argument of type vectorquery.QueryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vectorquery_QueryResponse(buffer_arg) {
  return vector_query_pb.QueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service definition
var VectorQueryServiceService = exports.VectorQueryServiceService = {
  fetchAndQuery: {
    path: '/vectorquery.VectorQueryService/FetchAndQuery',
    requestStream: false,
    responseStream: false,
    requestType: vector_query_pb.QueryRequest,
    responseType: vector_query_pb.QueryResponse,
    requestSerialize: serialize_vectorquery_QueryRequest,
    requestDeserialize: deserialize_vectorquery_QueryRequest,
    responseSerialize: serialize_vectorquery_QueryResponse,
    responseDeserialize: deserialize_vectorquery_QueryResponse,
  },
};

exports.VectorQueryServiceClient = grpc.makeGenericClientConstructor(VectorQueryServiceService, 'VectorQueryService');
