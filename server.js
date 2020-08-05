const express = require('express')
const app = express()
const fs = require('fs');
var cors = require('cors');
app.use(cors());
const path = require('path');
var url = require('url');


const fetch = require('node-fetch');
port = process.env.PORT || 3001
app.use(express.static('public'))


fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40GunterSoydanbay')
.then((response)=> response.json())
.then((data) => {

  let items = data.items;
  let posts = items.filter(item => item.categories.length > 0);
  let output = JSON.stringify(posts);

  fs.writeFile('blogs.txt', output, (err) => {

      if (err) throw err;

      console.log('Success');
  });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));

})

app.get('/blogs', async (req, res) => {

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var nodeUrl =url.parse(fullUrl,true);
    var postNumber= nodeUrl.query.blogid;

    fs.readFile('./blogs.txt', 'utf8', function (err,data) {
       if (err) {return console.log(err);  }
       const jsonData= JSON.parse(data);
       if(jsonData[postNumber]){
       //res.send(jsonData[postNumber].title);
       res.sendFile(path.join(__dirname+'/blog.html'));

     }
});


     });


app.listen(port,()=>{console.log("Listening on port"+port)});
