var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

var port = 8000;

var options = {
    // put certificate and private key in subfolder 'ssl'
    // if certificate and private key is same file, change to be same name
    key: fs.readFileSync('./ssl/privatekey.pem'),
    cert: fs.readFileSync('./ssl/certificate.cer'),
};

var app = express();

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.get('/', function (req, res) {
    res.writeHead(200);
    if (req.secure) {
        res.end("secured with certificate\n");
    } else {
        res.end("not secured with certificate\n");
    }
});
