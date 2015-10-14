
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

    sector: {
        width: 18, //px
        height: 25 //px
    },

    context: null,
    canvas: null,

    chars: '1234567890ABCDEF',

    init: function(canvasObject) {

        // Add the canvas object to the hexGrid object
        this.canvas = canvasObject;

        // Get a drawing context
        this.context = this.canvas.getContext('2d');

        this.drawSectors();
    },

    drawSectors: function() {

        var coordX = 0, coordY = 0;

        while(coordY < this.canvas.height) {

            // Calculate the position for the next node
            coordX += this.sector.width;

            // Check for horizontal overflow
            if(coordX > this.canvas.width) {
                // Set the X coordinate back to zero
                coordX = 0;

                // Jump one row down
                coordY += this.sector.height
            }

            //var char = hexGrid.chars.charAt(getRandomIntInclusive(0,15));

            this.context.fillStyle = hexGrid.colours[getRandomIntInclusive(0,9)];
            this.context.fillRect(coordX, coordY, this.sector.width, this.sector.height);
        }
    }

};

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}