const e = require('express');
var express = require('express');
var path = require('path');
const  MongoClient  = require('mongodb').MongoClient;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



MongoClient.connect("mongodb+srv://Youssef:youssef12@cluster0.rtyfifa.mongodb.net/test", function (err, client) {
    if (err) throw err ;

    const db = client.db('new') ;
    const collection = db.collection('collection1');
    app.locals.collection = collection ; } ) 



//user registration
app.post('/register',function(req,res){
    
  const Collection = req.app.locals.collection ;  
  
  const userid  = req.body.username ;
  const userpass = req.body.password ;

  //check if user already exists
  Collection.findOne({username : userid},function(error,user){

    if(userid == "" || userpass == "" ){ return res.render('registration',{error : "Missing Cridientials"});   }

    if(user){ return res.render('registration',{error : "Sorry, Username already exists, please choose another Username"});   }
    Collection.insertOne(req.body);
    res.render('login', {error : "Account Created Successfully, you can login now"});
    });     
    });





app.get('/',function(req,res){
  res.render('login',{error:""});
});

//user login
app.post('/login',function(req,res){

  const Collection = req.app.locals.collection ;  
  
  const userid  = req.body.username ;
  const userpass = req.body.password ;

  Collection.findOne({username : userid},function(error,user){
    //missing info
    if(userid=="" || userpass==""){ return res.render('login',{error : "Missing Cridientials"});   }
    
    //username not found in db
    if(!user){ return res.render('login',{error : "Sorry, Username was not found, please create a new account"});   }
    //incorrect password
    if(user.password !== userpass){return res.render('login',{error : "Incorrect Password, please try again"});    }
    //correct info
    app.locals.user = user ;
    res.render('home',{user});

    });  
  
});




app.post('/baligo',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "bali" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "bali" } });
      res.render('bali', { user,error: "Alf mabrook hateb2a troo7 bali 7ader" });}
    if(user2){
    res.render('bali', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/incago',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "inca" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "inca" } });
      res.render('inca', { user,error: "Alf mabrook hateb2a troo7 inca 7ader" });}
    if(user2){
    res.render('inca', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/parisgo',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "paris" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "paris" } });
      res.render('paris', { user,error: "Alf mabrook hateb2a troo7 paris 7ader" });}
    if(user2){
    res.render('paris', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/santorinigo',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "santorini" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "santorini" } });
      res.render('santorini', { user,error: "Alf mabrook hateb2a troo7 santorini 7ader" });}
    if(user2){
    res.render('santorini', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/romego',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "rome" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "rome" } });
      res.render('rome', { user,error: "Alf mabrook hateb2a troo7 rome 7ader" });}
    if(user2){
    res.render('rome', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/annapurnago',function(req,res){
  const user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "annapurna" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "annapurna" } });
      res.render('annapurna', { user,error: "Alf mabrook hateb2a troo7 rome 7ader, enta 3aref deh eh aslan" });}
    if(user2){
    res.render('annapurna', { user,error: "manta olt 3ayz tro7ha 5alas 3refna" }); }
    });
});

app.post('/homebutton',function(req,res){
  const user = req.app.locals.user ;
  res.render('home',{user});
});

app.get('/cities',function(req,res){
  const user = req.app.locals.user ;
  res.render('cities',{user});
});

app.get('/error',function(req,res){
  const user = req.app.locals.user ;
  res.render('error',{user});
});

app.get('/hiking',function(req,res){
  const user = req.app.locals.user ;
  res.render('hiking',{user});
});

app.get('/home',function(req,res){
  const user = req.app.locals.user ;
  res.render('home',{user});
});

app.get('/annapurna',function(req,res){
  const user = req.app.locals.user ;
  res.render('annapurna',{user,error:""});
});

app.get('/bali',function(req,res){
  const user = req.app.locals.user ;
  res.render('bali',{user,error:""});
});

app.get('/inca',function(req,res){
  const user = req.app.locals.user ;
  res.render('inca',{user,error:""});
});

app.get('/islands',function(req,res){
  const user = req.app.locals.user ;
  res.render('islands',{user});
});

app.get('/paris',function(req,res){
  const user = req.app.locals.user ;
  res.render('paris',{user,error:""});
});

app.get('/registration',function(req,res){
  const user = req.app.locals.user ;
  res.render('registration',{error:""});
});

app.get('/rome',function(req,res){
  const user = req.app.locals.user ;
  res.render('rome',{user,error:""});

});

app.get('/santorini',function(req,res){
  const user = req.app.locals.user ;
  res.render('santorini',{user,error:""});
});

app.get('/searchresults',function(req,res){
  const user = req.app.locals.user ;
  res.render('searchresults',{user});
});

app.get('/wanttogo',function(req,res){
  const user = req.app.locals.user ;
  res.render('wanttogo',{user});
});



if(process.env.PORT){
  app.listen(process.env.PORT,function() {console.log('server started')});
}
else{
  app.listen(3000,function(){console.log('server started on port 3000')});
} 


