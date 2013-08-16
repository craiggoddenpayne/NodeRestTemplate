var restify = require('restify');
var server = restify.createServer({ name: 'TripleTriadApi' });
var testController = require("./Controllers/Test.js");

var api = new MvcApi();
function MvcApi() {
    this.testController = new testController.TestController();
}

function controllerNotFound(req, res) {
    res.send("Controller Not Found!");
}
function actionNotFound(req, res) {
    res.send("Action Not Found!");
}

Setup(controllerNotFound, actionNotFound);
function Setup(notFoundControllerHandler, notFoundActionHandler) {
    
    server.get("/api/:controller/:action", getResponseHandler);
    server.post("/api/:controller/:action", postResponseHandler);
    server.put("/api/:controller/:action", putResponseHandler);
    server.del("/api/:controller/:action", deleteResponseHandler);

    function getResponseHandler(req, res) {responseHandler(req, res, "get");}
    function postResponseHandler(req, res) { responseHandler(req, res, "post"); }
    function putResponseHandler(req, res) { responseHandler(req, res, "put"); }    
    function deleteResponseHandler(req, res) { responseHandler(req, res, "delete"); }

    function responseHandler(request, response, method) {
        var handle = {};
        try {
            handle = api.FindRoute(request.params.controller, request.params.action, method);
        } catch (exception) {
            if (exception == "Controller not found") {
                notFoundControllerHandler(request, response);
            } else if (exception == "Action not found") {
                notFoundActionHandler(request, response);
            } else {
                throw "Unknown Error";
            }
        }
        handle(request, response);
    };
    
}

MvcApi.prototype.FindRoute = function (controllerName, actionName, method) {
    //find matching controller and action (without case sensitivity)
    for (var controller in api) {
        if (controller.toLowerCase() === controllerName.toLowerCase()) {
            for (var action in api[controller]) {
                if (action.toLowerCase() === method + actionName.toLowerCase()) {
                    return api[controller][action];
                }
            }
            throw "Action not found";
        }
    }
    throw "Controller not found";
};

server.use(restify.fullResponse()).use(restify.bodyParser());
server.listen(8081, function () { console.log('%s listening at %s', server.name, server.url); });