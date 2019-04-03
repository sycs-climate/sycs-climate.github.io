state = cookie.get('theme');
if(state == ''){
  cookie.set('theme', 0, 150);
  state = 0;
} else {
  state = parseInt(state);
}

var stylesheet = document.getElementsByClassName("darkStylesheet")[0];
stylesheet.disabled = state ? false : true;

var darkToggleButton = document.getElementsByClassName("darkToggle")[0]
darkToggleButton.state = state ? false : true;
darkToggleButton.textContent = state ? 'Light Mode' : 'Dark Mode';

stylesheet.toggle = function() {
    this.disabled = this.disabled ? false : true;
};

darkToggleButton.toggle = function() {
    this.state = this.state ? false : true;
    this.textContent = this.state ? 'Dark Mode' : 'Light Mode';
}

function darkToggle() {
    stylesheet.toggle();
    darkToggleButton.toggle();
    state = state ? 0 : 1;

    cookie.set('theme', state, 150);
}

console.log("Hey there! What are you doing here? Having a little look at the code are we?\nVisit our github repo at https://github.com/sycs-climate/sycs-climate.github.io")
