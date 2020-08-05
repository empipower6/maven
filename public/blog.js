
   fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40GunterSoydanbay')
   .then((response)=> response.json())
   .then((data) => {

     let items = data.items;
     let posts = items.filter(item => item.categories.length > 0)
     var url = window.location.href;
     var id = parseInt(url[url.search("blogid=")+7]);

     console.log(posts[id]);

     function toText(node) {
           let tag = document.createElement('div')
           tag.innerHTML = node
           node = tag.innerText
           return node
        }



   var output="";

   output+=`
     <img src=${posts[id].thumbnail}
     <h1> ${posts[id].title} </h1>
     <p> ${toText(posts[id].content)} </p>


   `
    document.getElementById('article').innerHTML+= output;
});
