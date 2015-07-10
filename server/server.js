var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404(response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.write('Error 404: resource not found');
    response.end();
}

function serveStatic(response, absPath) {
    fs.exists(absPath, function (exists) {
        if (exists) {
            fs.readFile(absPath, function (err, data) {
                if (err) {
                    send404(response);
                } else {
                    // disable cache for now cache[absPath] = data;
                    sendFile(response, absPath, data);
                }
            });
        } else {
            send404(response);
        }
    });
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        'Content-Type': mime.lookup(path.basename(filePath))
    });
    response.write(fileContents);
    response.end();
}

var server = http.createServer(function (request, response) {
    if (request.method = 'POST') {
        var dataObj = new Object();
        var cType = request.headers["content-type"];
        var fullBody = "";


        var filePath = false;
        if (request.url == '/') {
            filePath = 'app/index.html';
        } else {
            filePath = 'app' + request.url;
        }
        var absPath = './' + filePath;

        console.log('requesting ' + absPath);

        serveStatic(response, absPath);
    }
});

server.listen(3000, function () {
    console.log('Server listening on port 3000.');
})
