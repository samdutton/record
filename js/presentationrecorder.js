var start = performance.now();

var anchors = document.getElementsByTagName('a');

function handleLink(e){
  console.log(performance.now(), e.target.innerHTML);
}

for (var i = 0; i != anchors.length; ++i){
  var anchor = anchors[i];
  anchor.onmouseup = anchor.onkeydown = handleLink;
}

function handleURLChange(newURL){
  console.log(newURL);
}

window.onhashchange = function(e){
  handleURLChange(e.newURL);
};

// thanks felix-kling.de/blog/2011/01/06/how-to-detect-history-pushstate
var pushState = history.pushState;
history.pushState = function(state) {
  if (typeof history.onpushstate === 'function') {
    history.onpushstate({state: state});
  }
  var preHash = location.href.split('#')[0];
  var hash = arguments[2];
  handleURLChange(preHash + hash);
  return pushState.apply(history, arguments);
}
