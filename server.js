var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get("/", function(req,res){
  res.render("index.html");
});

var port = Number(process.env.PORT || 8000)

app.listen(port,function(){
  console.log("Ready on port 8000 | To close press CTRL+C, do not press CTRL+Z!");
});
