Meteor.methods({
	godMode: function() {
		//real time update for 2 minutes
		var timerId = Meteor.setInterval(function() {
			FacebookPages.find({}, {
				limit: 30
			}).forEach(updatePageLikeCount);
		}, 5000);
		Meteor.setTimeout(function() {
			Meteor.clearInterval(timerId);
		}, 120000);
		return "God mode enabled";
	}
});