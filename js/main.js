const tvBloomberg = "https://www.youtube.com/embed/Ga3maNZ0x0w?rel=0&autoplay=1";
const tvSkyNews = "https://www.youtube.com/embed/XOacA3RYrXk?rel=0&autoplay=1";
const tvAlJazeera = "https://players.brightcove.net/665003303001/SkrZHHcl_default/index.html?videoId=5467349513001";
const openBloomberg = "https://www.youtube.com/embed/Ga3maNZ0x0w?rel=0&autoplay=0";

function openStream(stream){
  document.getElementById('videoStream').src = stream;
};

window.onload = openStream(openBloomberg);

const removeFeed = document.getElementById('removeButton');
const rssInput = document.getElementById('rss-input');
const rssTitle = document.getElementById('rss-title');
const rssSubmit = document.getElementById('rss-submit');
const rssArrayUrl = [];
const rssArrayTitle = [];
let rssLoop;
let rssName;
const yqlFront = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20(url%3D'";
const yqlBack = "')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

$(document).ready(function() {

  rssSubmit.addEventListener('click', function(){
    let rssName = rssTitle.value;
    if(rssName !== ''){
    rssAnchor = rssName.replace(" ", "-");
    let rssURL = rssInput.value;
    rssURL = rssURL.replace(/:/g, "%3A").replace(/\//g, "%2F");
    rssURL = yqlFront + rssURL + yqlBack;
    rssArrayUrl.push(rssURL);
    rssArrayTitle.push(rssAnchor);
    let rssloop = $('main').append('<section id="' + rssAnchor +'" role="feed"><header><h2>' + rssName + '</h2></br><button class="remove">remove</button></header></section>');

     rssLoop =+ $.getJSON(rssArrayUrl, function(data) {

      const res = data.query.results.item;

      res.forEach(function(x, y){

        let link = res[y].link;
        let title = res[y].title;
        let description = res[y].description;

        if(description !== null){
          $('#' + rssAnchor ).append("<article aria-live='polite' tabindex='1'><h4><a target=\"_blank\" rel=\"nofollow\" href=\"" + link + "\">" + title + "</a></h4><p>" + description + "</p></article>");
        }else{
          $('#' + rssAnchor ).append("<article aria-live='polite' tabindex='1'><h4><a target=\"_blank\" rel=\"nofollow\" href=\"" + link + "  \">" + title + "</a></h4><p> No summary given</p></article>");
        }
        return rssLoop;
      });
    });
  }else{
    alert('add title to add feed');
  }
  });
});
$(document).on('click', '.remove', function() {
  $(this).parent().parent().remove();
  index = rssArrayUrl.indexOf(this.value);
  if(index != -1){
    rssArrayUrl.splice(index, 1);
    rssArrayTitle.splice(index, 1);
  }
});
