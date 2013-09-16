Meteor.startup(function() {
	var interval = 60 * 60 * 1000; //milliseconds in an hour
	Meteor.setInterval(fbscore.updateLikeCount, interval);
});