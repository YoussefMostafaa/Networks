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



MongoClient.connect("mongodb+srv://admin:admin@cluster0.rtyfifa.mongodb.net/test", function (err, client) {
    if (err) throw err ;

    const db = client.db('myDB') ;
    const collection = db.collection('myCollection');
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
    Collection.insertOne({username: req.body.username ,password : req.body.password ,want_to_go:[]});
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
  var user = req.app.locals.user ;

  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "bali" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "bali" } });
      app.locals.user.want_to_go.push("bali");
      res.render('bali', { user,error: "Bali Successfully added to Your List" });
 /*      Collection.findOne({username : user.username },function(err,user3){
        app.locals.user = user3 ;
       // user = user3 ;
       console.log(user3);
        console.log(app.locals);
        res.render('bali', { user,error: "Alf mabrook hateb2a troo7 bali 7ader" });
        }); */
}
    if(user2){
    res.render('bali', { user2,error: "Bali already exists in your list !" }); }
    });
});

app.post('/incago',function(req,res){
  var user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "inca" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "inca" } });
      app.locals.user.want_to_go.push("inca");
      res.render('inca', { user,error: "Inca Successfully added to Your List" });
/*       Collection.findOne({username : user.username },function(err,user3){
        app.locals.user= user3 ;
       // user = user3 ;
       console.log(user3);
        console.log(app.locals);
        res.render('inca', { user,error: "Alf mabrook hateb2a troo7 inca 7ader" });
        }); */
}
    if(user2){
    res.render('inca', { user2,error: "Inca already exists in your list !" }); }
    });
});

app.post('/parisgo',function(req,res){
  var user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "paris" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "paris" } });
      app.locals.user.want_to_go.push("paris");
      res.render('paris', { user,error: "Paris Successfully added to Your List" });
/*       Collection.findOne({username : user.username },function(err,user3){
        app.locals.user= user3 ;
       // user = user3 ;
       console.log(user3);
        console.log(app.locals);
        res.render('paris', { user,error: "Alf mabrook hateb2a troo7 paris 7ader" });
        }); */
}
    if(user2){
    res.render('paris', { user2,error: "paris already exists in your list !" }); }
    });
});

app.post('/santorinigo',function(req,res){
  var user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "santorini" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "santorini" } });
      app.locals.user.want_to_go.push("santorini");
      res.render('santorini', { user,error: "Santorini Successfully added to Your List" });
/*       Collection.findOne({username : user.username },function(err,user3){
        app.locals.user= user3 ;
       // user = user3 ;
       console.log(user3);
        console.log(app.locals);
        res.render('santorini', { user3,error: "Alf mabrook hateb2a troo7 santorini 7ader" });
        }); */
}
    if(user2){
      
    res.render('santorini', { user2,error: "Santorini already exists in your list !" }); }
    });
});

app.post('/romego',function(req,res){
  var user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "rome" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "rome" } });
      app.locals.user.want_to_go.push("rome");
      res.render('rome', { user,error: "Rome Successfully added to Your List" });
      /* Collection.findOne({username : user.username },function(err,user3){
        app.locals.user= user3 ;
       // user = user3 ;
       console.log(user3);
        console.log(app.locals);
        res.render('rome', { user,error: "Alf mabrook hateb2a troo7 rome 7ader" });
        }); */
}
    if(user2){
    res.render('rome', { user2,error: "Rome already exists in your list !" }); }
    });
});

app.post('/annapurnago',function(req,res){
  var user = req.app.locals.user ;
  const Collection = req.app.locals.collection ;  
  Collection.findOne({username : user.username , want_to_go : "annapurna" },function(err,user2){
    if(err) throw err ;
    if(!user2){ 
      Collection.updateMany({username:user.username}, { $push: { "want_to_go": "annapurna" } });
      app.locals.user.want_to_go.push("annapurna");
      res.render('annapurna', { user,error: "Annapurna Successfully added to Your List" });
      
      /*   Collection.findOne({username : user.username },function(err,user3){
      
      
        //app.locals.user= user3 ;
     // user = user3 ;
     console.log(user3);
      console.log(app.locals);
      res.render('annapurna', { user,error: "Alf mabrook hateb2a troo7 annapurna 7ader, enta 3aref deh eh aslan" });
      }); */
}
    if(user2){
      
    res.render('annapurna', { user,error: "Annapurna already exists in your list !" }); }
    });
});

app.post('/homebutton',function(req,res){
  var user = req.app.locals.user ;
  //console.log(user.want_to_go.length);
  res.render('home',{user});
  
});

app.get('/cities',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
 // console.log(user.want_to_go.length);
  res.render('cities',{user});
});

app.get('/error',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  res.render('error',{user});
});

app.get('/hiking',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
 // console.log(user.want_to_go.length);
  res.render('hiking',{user});
});

app.get('/home',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  res.render('home',{user});
});

app.get('/annapurna',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
 // console.log(user.want_to_go.length);
  res.render('annapurna',{user,error:""});
});

app.get('/bali',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  console.log(user);
  res.render('bali',{user,error:""});
});

app.get('/inca',function(req,res){
  var user = req.app.locals.user ;
//  console.log(user.want_to_go.length);
if(typeof user === 'undefined'){
  return res.render('login',{error : "You need to Login first to access this Page !"});
}
  res.render('inca',{user,error:""});
});

app.get('/islands',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
 // console.log(user.want_to_go.length);
  res.render('islands',{user});
});

app.get('/paris',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  res.render('paris',{user,error:""});
});

app.get('/registration',function(req,res){
  var user = req.app.locals.user ;
  
  res.render('registration',{error:""});
});

app.get('/rome',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
 // console.log(user.want_to_go.length);
  res.render('rome',{user,error:""});

});

app.get('/santorini',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  res.render('santorini',{user,error:""});
});

app.get('/searchresults',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  arr = [] ;
  res.render('searchresults',{user,arr});
});

app.get('/wanttogo',function(req,res){
  var user = req.app.locals.user ;
  if(typeof user === 'undefined'){
    return res.render('login',{error : "You need to Login first to access this Page !"});
  }
  res.render('wanttogo',{user});
});



if(process.env.PORT){
  app.listen(process.env.PORT,function() {console.log('server started')});
}
else{
  app.listen(3000,function(){console.log('server started on port 3000')});
} 


app.post('/search',function(req,res){
  var text = req.body.Search ;
  var error = "";
  const user = req.app.locals.user ;
  var filtered2 = new Array(6);
  var array = ["Paris","Rome","Inca","Annapurna","Bali","Santorini"] ;
  var filtered = array.filter(array => array.includes(text));
  if(filtered.includes("Inca")){
    filtered2[0] = "Inca"
  }
  if(filtered.includes("Annapurna")){
    filtered2[1] = "Annapurna"
  }
  if(filtered.includes("Paris")){
    filtered2[2] = "Paris"
  }
  if(filtered.includes("Rome")){
    filtered2[3] = "Rome"
  }
  if(filtered.includes("Santorini")){
    filtered2[4] = "Santorini"
  }
  if(filtered.includes("Bali")){
    filtered2[5] = "Bali"
  }
  if (filtered.length === 0){
    error = "No results Found !";
    
  }
 

  res.render('searchresults',{user,filtered2,error});
});