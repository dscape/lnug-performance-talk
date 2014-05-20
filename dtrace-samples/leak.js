var dnsd = require('dnsd')
var leaks = []

function LeakingClass() {}

dnsd.createServer(function handle(req, res) {
  setInterval(function() { leaks.push(new LeakingClass) }, 100)
  res.end('1.2.3.4')
}).listen(5354, '127.0.0.1')

console.log('Server running on 5354')

// dig @localhost -p 5354 foo.example A
