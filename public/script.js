fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40GunterSoydanbay')
.then((response)=> response.json())
.then((data) => {

  let items = data.items;
  let posts = items.filter(item => item.categories.length > 0)
  console.log(posts);

  function toText(node) {
        let tag = document.createElement('div')
        tag.innerHTML = node
        node = tag.innerText
        return node
     }

     function hello(){
       console.log("hello");
     }

function shorterText(text,start,end){
    return text.slice(100,300);
}

  output ='';
for(var i=0;i<posts.length;i++){
  output+=`
  <a href="/blogs?blogid=${i}"
  <div id="post" >
    <img src=${posts[i].thumbnail} id="postImage postImage${+i}"/>
    <div id="content">
      <h1>${posts[i].title}</h1>
      <p> ${shorterText(toText(posts[i].content))}</p>

    </div>


   </div>

  `
}

document.querySelector('#blogPosts').innerHTML = output
});
