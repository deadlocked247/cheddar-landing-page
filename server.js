// import required libs
express = require('express');
http = require('http');
mcapi = require('./node_modules/mailchimp-api/mailchimp');
var bodyParser = require("body-parser");


// functions
var socket = require('./func/socket.js');
var mc = new mcapi.Mailchimp('fe7001072a5b49f2c6a0ba004eac30c8-us12');
var route = require('./func/route.js');
var environment = require('./func/environment.js');

// create express app
app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// set all environment variables
environment.set();

// initialize the routes
route.init();

// server is going up, hold tight!
var server = http.createServer(app);

app.use('/', express.static(__dirname + '/app'));

app.get('/tos', function(req, res) {
  res.sendfile(__dirname + '/app/tos.html');
});

app.post('/lists/subscribe', function(req, res){

  mc.lists.subscribe(
    {
      id: '66f2229460',
      email: {
        email:req.query.email
      },
      merge_vars: {
        "MMERGE3": req.query.school
      },
      double_optin: false
    },
    function(data) {
      res.send(200);
    },
    function(error) {
      console.log(error);
      if (error.code == 214) {
        res.send(200);
      } else {
        res.send(500);
      }

    });
  });


// No longer using appfog
// Decides which port to use
// AppFog port env. variable: process.env.VCAP_APP_PORT
// var port = parseInt(process.env.VCAP_APP_PORT) || app.get('port');

// Use OpenShift default port
var port    = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');

server.listen(port, function(){

    console.log('Express server listening on port ' + port);

    // now server is up, it is time to install sockjs handlers
    socket.init(server);

});
