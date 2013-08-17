NodeRestTemplate
================

NodeResrTemplate is everything you need to start writing an ApiService in seconds.
Build on top of restify, it handles all the routing leaving you to only need to code up your methods.

Adding actions and controllers onto the node rest template are done by extending MvcApi to include your own methods.
The controller name is not restricted, although the action should be the name of the HttpMethod, followed by an action
name if you widh to use one.

You can do this by appening to prototype or adding to the created api object. Here is one way of doing this, 
although there are many ways to extend on the object


MvcApi.prototype.controller = {
  GetAction: function(request, response){
    response.send("Action on Controller Called");
  }
  Get: function(request, response){
    response.send("There is one method on this Controller called 'Action'");
  }
};



When the app starts up, the endpoints available should now be:
http://localhost:8081/api/Controller/
http://localhost:8081/api/Controller/Action

You can add as many controllers and actions as you like, using any of the http methods you want.
You can also override the "controller not found" and "action not found" methods to customise however you like.

If you like this kind of thing, please share!!

