var express = require('express');
var app = express()

app.use(express.static('src'))
app.use(express.static('build'))

app.get('/', function(request, response){
  response.sendFile('main.html', {"root": "src"});
});

var port = process.argv[2] || 3000;
app.listen(port);
console.log('app listening on port ' + port);
