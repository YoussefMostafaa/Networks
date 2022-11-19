var express = require('express');
var path = require('path');
const { MongoClient } = require('mongodb');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));








app.post('/register',function(req,res){



    
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err ;

    const users = client.db('new').collection('collection1');

    users.findOne(req.body,function(error,user){

      if(!user) {console.log('User not found'); users.insertOne(req.body);  }

      if(user) console.log('User found');
      

    });

      
    });

    res.render('register');



});









app.get('/',function(req,res){
  res.render('login');
});

app.post('/',function(req,res){
  res.render('home');
});






app.get('/annapurna',function(req,res){
  res.render('annapurna');
});

app.get('/bali',function(req,res){
  res.render('bali');
});

app.get('/cities',function(req,res){
  res.render('cities');
});

app.get('/error',function(req,res){
  res.render('error');
});

app.get('/hiking',function(req,res){
  res.render('hiking');
});

app.get('/home',function(req,res){
  res.render('home');
});

app.get('/inca',function(req,res){
  res.render('inca');
});

app.get('/islands',function(req,res){
  res.render('islands');
});

app.get('/paris',function(req,res){
  res.render('paris');
});

app.get('/registration',function(req,res){
  res.render('registration');
});

app.get('/rome',function(req,res){
  res.render('rome');
});

app.get('/santorini',function(req,res){
  res.render('santorini');
});

app.get('/searchresults',function(req,res){
  res.render('searchresults');
});

app.get('/wanttogo',function(req,res){
  res.render('wanttogo');
});



if(process.env.PORT){
  app.listen(process.env.PORT,function() {console.log('server started')});
}
else{
  app.listen(3000,function(){console.log('server started on port 3000')});
}


