exports.Api = Api;

function Api() { }
Api.prototype.controller = new Controller();
function Controller() {}
Controller.prototype.GetAction = function(request, response) {
    response.setHeader('content-type', 'application/json');
    response.send(500, "This is a reserved method, please call the method using a controller name and a action rather than what you just did.");
};
Controller.prototype.PostAction = function (request, response) {
    response.setHeader('content-type', 'application/json');
    response.send(500, "This is a reserved method, please call the method using a controller name and a action rather than what you just did.");
};