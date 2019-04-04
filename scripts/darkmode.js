var state = parseInt(cookie.get('theme'));

if (!state) {
  state = 0;
} else {
  setTheme(1);
}

function setTheme(theme) {
  if (theme) {
    var href = 'styles/dark.min.css';
    var pathname = location.pathname;
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }
    if (location.href != '/') {
      href = '../' + href;
    }
    $('.darkToggle').html('Light Mode').attr('onclick', 'setTheme(0);');
    $('head').append('<link class="darkStylesheet" rel="stylesheet" href="' + href + '">');
  } else {
    $('.darkToggle').html('Dark Mode').attr('onclick', 'setTheme(1);');
    $('.darkStylesheet').remove();
  }
  cookie.set('theme', theme, 150);
}
