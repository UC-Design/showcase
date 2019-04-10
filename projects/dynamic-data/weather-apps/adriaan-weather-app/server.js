var express = require('express')
var path = require('path')
var morgan = require('morgan')

var app = express();

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen('3000');
console.log('Running on port 3000');