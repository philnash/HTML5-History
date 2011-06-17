$(document).ready ->
  $('nav a').click ->
    $t = $(this)
    load_content $t.attr('title'), $t.attr('href')
    false

load_content = (title, url, skipHistory) ->
  $.get url, (data) ->
    if pageTracker?
      pageTracker._trackPageview url
    document.title = title
    stateObj =
      title: title,
      url: url
    if !skipHistory
      if window.history.pushState?
        window.history.pushState stateObj, title, url
    $('#content').html(data)

window.onpopstate = (event) ->
  if event.state
    load_content event.state.title, window.location.pathname, true
  else
    stateObj =
      title: document.title,
      url: window.location.pathname
    window.history.replaceState stateObj, document.title, window.location.pathname