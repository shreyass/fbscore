Template.realTime.realtimeEnabled = function() {
  return Session.get("realtimeEnabled");
}

Template.realTime.realTimeRemaining = function() {
  return Session.get("realTimeRemaining");
}

Template.realTime.events({
  'click .jqRealTime': function() {
    var remainingSeconds = 120;
    var totalTime = (new Date()).getTime() / 1000 + remainingSeconds;
    Meteor.call("godMode");
    Session.set("realtimeEnabled", true);
    Session.set("realTimeRemaining", remainingSeconds);
    var timer = Meteor.setInterval(function() {
      var difference = totalTime - ((new Date()).getTime() / 1000);
      if (difference < 0) {
        Meteor.clearInterval(timer);
        Session.set("realtimeEnabled", false);
      } else {
        Session.set("realTimeRemaining", Math.floor(difference));
      }
    }, 1000);
  },
  'click .jqAddNew': function() {
    fbscore.helpers.clearForm();
    $(".jqAddNewModal").modal();
  }
});

Template.leaderboard.pages = function() {
  return fbscore.getAll();
}




Template.message.helpers({
  status: function() {
    return Session.get("status");
  },
  success: function() {
    var status = Session.get("status");
    if (status) {
      return status.success;
    } else {
      return true;
    }
  },
  errorMsg: function() {
    var status = Session.get("status");
    if (status) {
      return status.errorMsg;
    } else {
      return "";
    }
  }
});



Template.pageform.events({
  'click #addpage': function() {
    var pageObj = fbscore.helpers.getFormValue();
    if (fbscore.helpers.isValidPage(pageObj)) {
      pageObj["updateHour"] = Math.floor(Math.random() * 24);
      fbscore.fetchLikesAndInsertPage(pageObj);
    }
    return false;

  },
  'click #clear': function() {
    fbscore.helpers.clearForm();
  }
});