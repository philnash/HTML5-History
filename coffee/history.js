(function() {
  var load_content;
  $(document).ready(function() {
    return $('nav a').click(function() {
      var $t;
      $t = $(this);
      load_content($t.attr('title'), $t.attr('href'));
      return false;
    });
  });
  load_content = function(title, url, skipHistory) {
    return $.get(url, function(data) {
      var stateObj;
      if (typeof pageTracker != "undefined" && pageTracker != null) {
        pageTracker._trackPageview(url);
      }
      document.title = title;
      stateObj = {
        title: title,
        url: url
      };
      if (!skipHistory) {
        if (window.history.pushState != null) {
          window.history.pushState(stateObj, title, url);
        }
      }
      return $('#content').html(data);
    });
  };
  window.onpopstate = function(event) {
    var stateObj;
    if (event.state) {
      return load_content(event.state.title, window.location.pathname, true);
    } else {
      stateObj = {
        title: document.title,
        url: window.location.pathname
      };
      return window.history.replaceState(stateObj, document.title, window.location.pathname);
    }
  };
}).call(this);
