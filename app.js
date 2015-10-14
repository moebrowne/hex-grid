
var hexGrid = {

    colours: [
        '#dddfde',
        '#e7e9e6',
        '#f2f2f2',
        '#eaeaea',
        '#ebebeb',
        '#e8e8e8',
        '#e5e5e5',
        '#e0e0e0',
        '#ededed',
        '#e1e1df'
    ],

    context: null,
    canvas: null,

    init: function(canvasObject) {

        // Add the canvas object to the hexGrid object
        this.canvas = canvasObject;

        // Get a drawing context
        this.context = this.canvas.getContext('2d');
    },

    chars: '1234567890ABCDEF',

    drawSectors: function() {

        var cont = $('#cont');

        for(i=0;i<3000;i++) {
            cont.append('<div class="sector"/>');
        }

        var sectors = cont.children('.sector');

        sectors.each(function() {

            var char = hexGrid.chars.charAt(getRandomIntInclusive(0,15));
            var colour = hexGrid.colours[getRandomIntInclusive(0,9)];

            if (char === 'F') {
                //colour = '#E94111';
            }

            $(this).html(char);

            $(this).css('background-color',colour);
        });
    }

};

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function() {
    hexGrid.drawSectors();
});