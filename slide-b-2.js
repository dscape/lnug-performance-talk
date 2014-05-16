var http = require('http')
var l = []

function LeakingClass() {}

http.createServer(function handle(req, res) {
  setInterval(function() { l.push(new LeakingClass) }, 100)
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080)

console.log('http://localhost:8080')
