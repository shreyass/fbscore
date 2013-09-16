(function(global) {

	var fbscore = global["fbscore"] || {};
	var FacebookPages = new Meteor.Collection("fbpage");

	fbscore.updatePageLikeCount = function(fbPage) {
		getFacebookGraphData(fbPage.fburl, function(error, resp) {
			if (!error && resp.data) {
				FacebookPages.update(fbPage._id, {
					$set: {
						likes: resp.data.likes
					}
				});
			}
		});
	}

	fbscore.updateLikeCount = function() {
		var hour = (new Date()).getHours();
		FacebookPages.find({
			"updateHour": hour
		}).forEach(updatePageLikeCount);
	}

	fbscore.getAll = function() {
		debugger;
		return FacebookPages.find({}, {
			sort: {
				likes: -1,
				name: 1
			},
			limit: 30
		});
	}

	fbscore.fetchLikesAndInsertPage = function(pageObj) {
		var graphUrl = "http://graph.facebook.com/" + extractFacebookPageName(pageObj.fburl);
		HTTP.call("GET", graphUrl, function(error, resp) {
			if (!error && resp.data) {
				pageObj.likes = resp.data.likes;
				pageObj.category = resp.data.category;
				var id = FacebookPages.insert(pageObj);
				if (id) {
					Session.set("status", {
						"success": true
					});
					return clearForm();
				} else {
					Session.set("status", {
						"success": false,
						"errorMsg": "Unknown server error"
					});

				}
			}
		});
	}

	global["fbscore"] = fbscore;

})(this);