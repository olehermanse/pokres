(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-79005632-1', 'auto');

// Redirect if url is not olehelg.at.ifi.uio.no:
function redirect(){
  if(window.location.href.indexOf("olehelg.at.ifi.uio.no")<=-1){
    window.location.replace("http://olehelg.at.ifi.uio.no");
  }
}

// Change url in address bar, add history entry and load new "site" into main:
function navigate(site){
  window.history.pushState(site, "olehelg - "+site, "/index.html?site="+site);
  loadMain(site);
}

// Get parameters from url and load appropriate "site":
$( document ).ready(function() {
  var site = $.urlParam('site');
  if(site){
    loadMain(site);
  }else{
    loadMain('home');
  }
});

// Back button, get state variable and load that "site":
window.onpopstate = function(event) {
  var site = event.state;
  loadMain(site);
};

// =============================== STACKOVERFLOW ===============================
// Function to replace contents of main
// http://stackoverflow.com/a/24336884
function dataInclude(){
  $("[data-include]").each(function(){
    var that = $(this);
    that.load(that.attr('data-include'), function(){
      that.contents().unwrap();
    });
  });
}

// Get url parameters:
// http://stackoverflow.com/a/25359264
$.urlParam = function(name){
  var results = new RegExp('[\?&]'+name+'=([^&#]*)').exec(window.location.href);
  if (results===null){
    return null;
  }else{
    return results[1] || 0;
  }
};

// Put the contents of a "site"(.html) into the main div:
// http://stackoverflow.com/a/6949658
function loadMain(site){
  $("#main").load('sites/'+site+'.html', dataInclude);
  ga('set', 'location', window.location.href);
  ga('send', 'pageview');
}
