expires= new Date();
expires.setTime(expires.getTime() + 31536000000);
expires = expires.toUTCString();

state = document.cookie.split("theme=")
if(state[1] == undefined){
    document.cookie = "theme=0; expires="+expires
    state = 0
} else {
    state = parseInt(state[1])
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
    document.cookie = "theme=" + state + ";expires=" + expires
}

console.log("Hey there! What are you doing here? Having a little look at the code are we?\nVisit our github repo at https://github.com/sycs-climate/sycs-climate.github.io")
console.log("Also Fraser from George Watson's says hi!")