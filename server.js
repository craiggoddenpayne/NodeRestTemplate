var restify = require('restify');
var server = restify.createServer({ name: 'TripleTriadApi' });
var apiModule = require('./Api.js');
var api = new apiModule.Api();

server.get('/:controller/:action', function (request, response) {
    if (api[request.params.controller] == undefined || api[request.params.controller]["Get" + request.params.action] == undefined) {
        response.setHeader('content-type', 'application/json');
        response.send(404, "Content does not exist");
    }else {
        api[request.params.controller]["Get" + request.params.action](request, response);
    }
});
server.post('/:controller/:action', function (request, response) {
    if (api[request.params.controller] == undefined || api[request.params.controller]["Post" + request.params.action] == undefined) {
        response.setHeader('content-type', 'application/json');
        response.send(404, "Content does not exist");
    } else {
        api[request.params.controller]["Post" + request.params.action](request, response);
    }
});

server.use(restify.fullResponse()).use(restify.bodyParser());
server.listen(8081, function () {
    console.log('%s listening at %s', server.name, server.url);
});