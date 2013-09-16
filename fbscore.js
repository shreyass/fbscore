(function(global) {
  var fbscore = global.fbscore || {};
  fbscore.helpers = global.fbscore.helpers || {};
  var fbUrlRegexp = /^(http|https):\/\/(www\.){0,1}facebook.com\/([a-zA-Z][a-zA-Z0-9\-_]*)$/;


  fbscore.helpers.isValidFacebookUrl = function(fburl) {
    return fbUrlRegexp.test(fburl);
  }


  fbscore.helpers.extractFacebookPageName = function(fburl) {
    return fbUrlRegexp.exec(fburl)[3];
  }


  fbscore.helpers.getFacebookGraphData = function(fburl, callback) {
    var graphUrl = "http://graph.facebook.com/" + extractFacebookPageName(fburl);
    HTTP.call("GET", graphUrl, callback);
  }
  global["fbscore"] = fbscore;
})(this);