var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
//const { Pool } = require('pg');

var config={
    user : 'bhogulkarsandip',
    database:'bhogulkarsandip',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));

var articles={
     'article-one' :{
    title : 'Article One | Sandip Bhogulkar',
    heading : 'Article One',
    date : '11 aug 2017',
    content : `<p>
                        This is my first article. This is my first article. This is my first article. This is my first article. This is my first article.This is my first article. This is my first article. This is my first article. This is my first article.
                    </p>
                    <p>
                        
                        This is my first article. This is my first article. This is my first article.This is my first article.This is my first article. This is my first article. This is my first article.This is my first article.This is my first article. This is my first article. This is my first article. This is my first article. This is my first article. 
                    </p>
                    <p>
                        
                        This is my first article. This is my first article. This is my first article.This is my first article.
                    </p>`
},

'article-two' : {
    
     title : 'Article Two | Sandip Bhogulkar',
    heading : 'Article Two',
    date : '12 aug 2017',
    content : `<p>
                        This is my Second article.  
                        </p>`

},
 'article-three' : {
      title : 'Article Three | Sandip Bhogulkar',
    heading : 'Article Three',
    date : '13 aug 2017',
    content : `<p>
                        This is my Third article.  
                        </p>`
 }

}

 function createTemplate(data){
     var title=data.title;
     var heading=data.heading;
     var date=data.date;
     var content=data.content;

var htmlTemplate=` <html>
    <head>
        <title>${title}
        </title>
        <meta name='viewport' content='width=device-width,initial-scale=1 ' />
         <link href="/ui/style.css" rel="stylesheet" />
        <style>
            
        </style>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                    <h1>
                        ${heading}
                    </h1>
                    
                </div>
                <div>${date}</div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
</html>
  `
;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'))
});

var pool=new Pool(config);
//const pool = new Pool();

app.get('/test-db',function(req,res){
   //make a request
   pool.query('select * from article',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
   });
   
   // make a response
   
});

 var counter=0;
app.get('/counter',function(req,res){
   
    counter=counter+1;
    res.send(counter.toString());
});


app.get('/article/:articleName',function(req,res){
    var articleName= req.params.articleName;
    
    pool.query("select * from article where title= '"+req.params.articleName+"'",functio(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.lenght==0)
            {
                res.status(404).send('article not found');
            }
            else
            {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    
    res.send(createTemplate(articles[articleName]))
});

app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-two.html'))
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname,'ui','artcle-three.html'))
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
