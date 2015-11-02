# Hex Grid

Procedurally draws a random set of 'sectors' to a canvas. Designed to be a sort of active background.

### Use

Add the following HTML to your document body.
The library will automatically size the canvas so that it fills the window

```html
<canvas id="cont" style="position: fixed;"></canvas>

<script src="app.js"></script>

<script>
    hexGrid.init(document.getElementById("cont"));
</script>
```

### Options

There is an `options` property of the hexGrid object that contains a number of variables that can be used to change the way the grid is rendered
