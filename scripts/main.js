function Cookie() {
  // https://www.w3schools.com/js/js_cookies.asp
  this.set = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  this.get = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  this.delete = function(cname) {
    cookie.set(cname, '', -1);
  }
}

var cookie = new Cookie();


function AskDialog(selector) {
  this.confirm = function(title, message, yesFunction, noFunction) {
    $(selector + ' .title').html(title);
    $(selector + ' .message').html(message);
    $(selector + ' .yes.button').on('click', function() {
      ask.close();
      yesFunction();
    });
    $(selector + ' .no.button').on('click', function() {
      ask.close();
      noFunction();
    });
    $(selector + ' .confirm').removeClass('hidden');
    $(selector).removeClass('hidden');
  }
  this.alert = function(title, message, okayFunction) {
    $(selector + ' .title').html(title);
    $(selector + ' .message').html(message);
    $(selector + ' .okay.button').on('click', function() {
      ask.close();
      okayFunction();
    });
    $(selector + ' .alert').removeClass('hidden');
    $(selector).removeClass('hidden');
  }
  this.close = function() {
    $(selector + ' .title').html('');
    $(selector + ' .message').html('');
    $(selector + ' .confirm').addClass('hidden');
    $(selector + ' .alert').addClass('hidden');
    $(selector + ' .button').off('click');
    $(selector).addClass('hidden');
  }
}
var ask = new AskDialog('#askdialog');

$(document).ready(function() {
  console.log("Hey there! What are you doing here? Having a little look at the code are we?\nVisit our github repo at https://github.com/sycs-climate/sycs-climate.github.io")
});
