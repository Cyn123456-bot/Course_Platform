var teal = document.getElementById('bg-teal');
var orange = document.getElementById('bg-orange');
var tomato = document.getElementById('bg-tomato');
var blue = document.getElementById('bg-blue');
var nav = document.getElementById('nav');
var leftNav = document.querySelector('.left-nav').querySelector('.nav').querySelectorAll('li');

teal.addEventListener('click', function() {
    nav.style.backgroundColor = 'teal';
    // console.log(teal);
    for (var i = 0; i < leftNav.length; i++) {
        leftNav[i].addEventListener('mouseenter', function() {
            for (var j = 0; j < leftNav.length; j++) {
                leftNav[j].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'teal';
        });
    };
});

orange.addEventListener('click', function() {
    nav.style.backgroundColor = 'teal';
    // console.log(teal);
    for (var i = 0; i < leftNav.length; i++) {
        leftNav[i].addEventListener('mouseenter', function() {
            for (var j = 0; j < leftNav.length; j++) {
                leftNav[j].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'teal';
        });
    };
});

tomato.addEventListener('click', function() {
    nav.style.backgroundColor = 'teal';
    // console.log(teal);
    for (var i = 0; i < leftNav.length; i++) {
        leftNav[i].addEventListener('mouseenter', function() {
            for (var j = 0; j < leftNav.length; j++) {
                leftNav[j].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'teal';
        });
    };
});

blue.addEventListener('click', function() {
    nav.style.backgroundColor = '#4a8bc2';
    // console.log(teal);
    for (var i = 0; i < leftNav.length; i++) {
        leftNav[i].addEventListener('mouseenter', function() {
            for (var j = 0; j < leftNav.length; j++) {
                leftNav[j].style.backgroundColor = '';
            }
            this.style.backgroundColor = '#4a8bc2';
        });
    };
});