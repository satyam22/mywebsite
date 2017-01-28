var express=require('express');
var fs=require('fs');
var handlebars=require('express-handlebars').create({defaultLayout:'main'});
var app=express();
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT||3000);
app.listen(app.get('port'),function(){
  console.log('Express started on http://localhost:'+app.get('port')+
';press Ctrl-C to terminate');
});
app.get('/',function(req,res){
res.render('home');
});
var fortunes=require(__dirname+'/public/fortunes.json').fortune;
console.log(JSON.stringify(fortunes));
app.get('/about',function(req,res){
  var randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)];
res.render('about',{fortune:randomFortune});
});
app.use(express.static(__dirname+'/public'));
app.use(function(req,res){
  res.status(404);
res.render('404');
});
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
res.render('500');
});
