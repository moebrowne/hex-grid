
var colours = [];
colours[0] = '#dddfde';
colours[1] = '#e7e9e6';
colours[2] = '#f2f2f2';
colours[3] = '#eaeaea';
colours[4] = '#ebebeb';
colours[5] = '#e8e8e8';
colours[6] = '#e5e5e5';
colours[7] = '#e0e0e0';
colours[8] = '#ededed';
colours[9] = '#e1e1df';

var chars = '1234567890ABCDEF';


var cont = $('#cont');

for(i=0;i<3000;i++) {
    cont.append('<div class="sector"/>');
}

var sectors = cont.children('.sector');

sectors.each(function() {

    var char = chars.charAt(getRandomIntInclusive(0,15));
    var colour = colours[getRandomIntInclusive(0,9)];

    if (char === 'F') {
        //colour = '#E94111';
    }

    $(this).html(char);

    $(this).css('background-color',colour);
});

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}