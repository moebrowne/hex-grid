
var hexGrid = {

    // The origin of the canvas
    origin: {
        x: 0,
        y: 0
    },

    context: null,
    canvas: null,

    // Whether to make sectors randomly change, and on what time period
    options: {

        randomise: {
            enable: true,
            interval: 100 //ms
        },

        corruption: {
            enabled: true,
            percentage: 3 //%
        },

        chars:  {
            'good': '1234567890ABCDEF',
            'corrupt': '!£$%^&*@~#?/\\¬<>+='
        },

        // Dimensions of each sector
        sector: {
            width: 18, //px
            height: 25, //px

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
        },
    },

    // Set everything up
    init: function(canvasObject) {

        // Add the canvas object to the hexGrid object
        this.canvas = canvasObject;

        // Get a drawing context
        this.context = this.canvas.getContext('2d');

        // Size the grid so it fills the document
        this.sizeToDocument();

        // Set the text alignment
        this.context.textAlign = 'center';
        this.context.font = '11px Ubuntu';

        // Render the sectors onto the canvas
        this.drawSectors();

        // Change sectors randomly
        if (this.options.randomise.enable) {
            window.setInterval(function () {
                var position = this.getRandomSectorLocation();

                // Determine whether this sector is corrupt or not
                var corrupt = (this.options.corruption.enabled === true && getRandomIntInclusive(0, 100) < this.options.corruption.percentage);

                this.drawSector(position.x, position.y, corrupt);
            }.bind(this), this.options.randomise.interval);
        }
    },

    sizeToDocument: function() {
        // Get the size of the window
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;

    },

	randomColour: function () {
        return this.options.sector.colours[getRandomIntInclusive(0, (this.options.sector.colours.length - 1))];
    },

	randomCharacter: function (charset) {

        // Set the default charset if its not been defined or cant be found
        if (typeof charset === 'undefined' || typeof this.options.chars[charset] === 'undefined') {
            charset = 'good';
        }

        return this.options.chars[charset].charAt(getRandomIntInclusive(0, (this.options.chars[charset].length - 1)));
    },

    drawSectors: function() {

        // Set initial coordinates to the origin of the canvas
        var coordX = this.origin.x, coordY = this.origin.y;

        // Loop until all available vertical space is taken
        while(coordY < this.canvas.height) {

            // Loop until all available horizontal space is taken
            while (coordX < this.canvas.width) {

                // Draw the individual sector
                this.drawSector(coordX, coordY);

                // Calculate the position for the next node
                coordX += this.options.sector.width;
            }
            // Set the X coordinate back to zero
            coordX = this.origin.x;

            // Jump one row down
            coordY += this.options.sector.height
        }
    },

    drawSector: function(coordX, coordY, corrupt) {

        var corruptSector = (typeof corrupt === 'boolean' && corrupt === true);

        // Determine the colours for this sector
        var colourSector = (corruptSector) ? '#EDCED1':this.randomColour();
        var colourText = (corruptSector) ? '#FFFFFF':'#D0D0D0';
        var textCharset = (corruptSector) ? 'corrupt':'good';

        this.context.fillStyle = colourSector;
        this.context.fillRect(coordX, coordY, this.options.sector.width, this.options.sector.height);

        // Calculate the text positions
        var textCoordX = (coordX + (this.options.sector.width / 2));
        var textCoordY = (coordY + (this.options.sector.height / 2) + 4);

        // Draw the text
        this.context.fillStyle = colourText;
        this.context.fillText(this.randomCharacter(textCharset), textCoordX, textCoordY);
    },

    getRandomSectorLocation: function() {
        return {
            x: this.options.sector.width * (Math.floor(Math.random() * (this.canvas.width / this.options.sector.width)) - 1),
            y: this.options.sector.height * (Math.floor(Math.random() * (this.canvas.height / this.options.sector.height)) - 1)
        };
    }

};

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
