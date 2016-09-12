var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var acpiclient = require('acpiclient');
var consolidate = require('consolidate');

//This is to tell express where your static assets like JavaScripts, images, CSS files are. 
//So when you load them in your HTML file, the paths need to be relative to this folder
app.use(express.static('./public'));

//This tells your express program in which folder do your HTML files lie?
app.set('views', 'templates');

//This is to set the template engine. We are using underscore           
app.set('view engine', 'html');
app.engine('html', consolidate.underscore);

//This allows Cross Origin Requests
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//A GET request to '/' will render an html file named 'nework.html'
app.get('/', function(req, res) {
    res.render("nework")
});


//A GET request to '/cputemp', will return the temperature of the CPU
app.get('/cputemp', function(req, res) {
    acpiclient(function(error, data) {
        if (error) {
            throw error;
        } else {
            var temp = data.thermal["0"].temp;
            var bat = data.batteries["0"];
            res.json({
                temperature: temp,
                battery: bat,
            });
        }

    });
});

//This will run the web server in the specified port
var portNumber = 3000;

http.listen(portNumber, function() {
    console.log('listening on port ' + portNumber);
});