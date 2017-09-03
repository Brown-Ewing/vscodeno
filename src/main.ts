import http = require("http");
import url  = require("url");
import path = require("path");
import fs   = require("fs");

http.createServer(function (req: any, res:any) {
var pathname = __dirname.replace("build", "client") + url.parse(req.url).pathname;
if (pathname.charAt(pathname.length-1)=="/"){
    pathname+="index.html";
}

fs.exists(pathname,function(exists:any){
    if(exists){
        switch(path.extname(pathname)){
            case ".html":
                res.writeHead(200, {"Content-Type": "text/html"});
                break;
            case ".js":
                res.writeHead(200, {"Content-Type": "text/javascript"});
                break;
            case ".css":
                res.writeHead(200, {"Content-Type": "text/css"});
                break;
            case ".gif":
                res.writeHead(200, {"Content-Type": "image/gif"});
                break;
            case ".jpg":
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                break;
            case ".png":
                res.writeHead(200, {"Content-Type": "image/png"});
                break;
            default:
                res.writeHead(200, {"Content-Type": "application/octet-stream"});
        }
        fs.readFile(pathname,function (err:any,data:any){
            res.end(data);
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 Not Found</h1>");
    }
});
}).listen(8080, "127.0.0.1");
console.log("Server running at http://127.0.0.1:8080/");