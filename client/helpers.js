(function() {

  var fbscore = window["fbscore"] || {};
  fbscore.helpers = fbscore.helpers || {};

  fbscore.helpers.clearForm = function() {
    $("#biz-name").val("");
    $("#fburl").val("");
    $("#creator-name").val("");
    $("#creator-email").val("");
    Session.set("status",undefined);
    return false;
  }

  fbscore.helpers.getFormValue = function() {
    return {
      "bizName": $("#biz-name").val(),
      "fburl": $("#fburl").val(),
      "creatorName": $("#creator-name").val(),
      "creatorEmail": $("#creator-email").val()
    }
  }


  fbscore.helpers.isValidPage = function(pageObj) {
    var pageValid = true;
    if (!pageObj.bizName || !pageObj.fburl || !pageObj.creatorName || !pageObj.creatorEmail) {
      pageValid = false;
      Session.set("status", {
        "success": false,
        "errorMsg": "All fields are mandatory"
      });
    } else {
      if (!fbscore.helpers.isValidFacebookUrl(pageObj.fburl)) {
        pageValid = false;
        Session.set("status", {
          "success": false,
          "errorMsg": "Invalid Facebook URL"
        });
      }
    }
    return pageValid;
  }

  window["fbscore"] = fbscore;
})();