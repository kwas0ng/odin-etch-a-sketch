const sketchArea = document.getElementById("sketchArea");

let rows = document.getElementsByClassName("gridRow");

let cells = document.getElementsByClassName("cell");

const slider = document.getElementById('slider');

const clearButton = document.getElementById('clearButton');
const eraserButton = document.getElementById('eraserButton');
const drawButton = document.getElementById('drawButton');
const rainbowButton = document.getElementById('rainbowButton');

const buttons = document.querySelectorAll('button:not(.clearButton)');

const colorPickerContainer = document.getElementById('colorPickerContainer');
const colorPicker = document.getElementById('colorPicker');




colorPicker.addEventListener('input', () => {
    colorPickerContainer.setAttribute('style', 'background-color: ' + colorPicker.value);
})



let isDrawing = false;
let isErasing = false;
let isRainbow = false;


// Sets the default selected button
document.addEventListener('DOMContentLoaded', () => {
    drawButton.click();
})



let prevButton = null

buttons.forEach( (button) => {

    button.addEventListener('click', (e) => {

        
        button.classList.add('active');


        if(prevButton !== null ) {
            prevButton.classList.remove('active');
        }

        prevButton = e.target;

        if(e.target === prevButton) {
            button.classList.add('active');
        }

    })

    
}) 



// Initialize the default grid which is 16x16
defaultGrid();
initializeSlider();



// Function for clearing the sketch area PS. (Kinda similar to the slider event listener)

clearButton.addEventListener('click', () => {
    sketchArea.innerHTML = "";
    makeGrid(slider.value);
})

eraserButton.addEventListener('click', () => {
    isErasing = true;
    isRainbow = false;
})

drawButton.addEventListener('click', () => {
    isErasing = false;
    isRainbow = false;
})

rainbowButton.addEventListener('click', () => {
    isRainbow = true;
    isErasing = false;
})


function generateRandomRGB() {

    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

}

function initializeSketchArea () {

    /*
    The squares or each cell of the grid will be added an event listener.

    Once the user triggers a mousedown event on a cell, 
    isDrawing will be set to true and the user will be able to drag and color each cells 
    (this is achieved by adding the mouseover listener).

    A mouseup listener (or when the user releases the mouse click), isDrawing will be then set to false
    restricting the user to color each cells to avoid mistakes.
    
    */

    const squares = document.querySelectorAll("div.cell");

    squares.forEach((square) => {

        square.addEventListener('mousedown', (e) => {

            isDrawing = true;

            if(isErasing) {
                square.setAttribute('style', 'background-color:white');
            }else if(isRainbow) {
                square.setAttribute('style', 'background-color:' + generateRandomRGB());
            }else {
                square.setAttribute('style', 'background-color:' + colorPicker.value);
            }
           
    
        })

        square.addEventListener('mouseup', (e) => { 
            isDrawing = false;
         })

        square.addEventListener('mousemove', (e) => {

            if (isDrawing) {

                if(isErasing) {
                    square.setAttribute('style', 'background-color:white');
                }else if(isRainbow) {
                    square.setAttribute('style', 'background-color:' + generateRandomRGB());
                }else {
                    square.setAttribute('style', 'background-color:' + colorPicker.value);
                }
                
            }
        })

        //if the mouse cursor leaves the sketch area, drawing will be set to false
        sketchArea.addEventListener('mouseleave', (e) => {
            isDrawing = false;
        })

    })
    

}


function defaultGrid () {
    makeGrid(16);
}


function makeGrid (size) {
    sketchArea.setAttribute('style', 'grid-template: repeat(' + size + ', 1fr)' + '/' + 'repeat(' + size + ', 1fr)' );
    makeRows(size);
    makeColumns(size);
    initializeSketchArea();
}

function makeRows (rows) {

    for (let i = 0; i < rows; i++){

        let row = document.createElement("div");

        sketchArea.appendChild(row).className = "gridRow";
    }

}

function makeColumns (columns) {

    for (let i = 0 ; i < rows.length; i++){
        for (let j = 0; j < columns; j++) {
    
            let column = document.createElement("div");
            
            rows[j].appendChild(column).className = "cell";
    
        }
    }

}

// Declaration for the value of the slider

function initializeSlider () {

    var sliderValue = document.getElementById('sliderValue');

    sliderValue.innerHTML = slider.value + " x " + slider.value;

    slider.oninput = function () {
        sliderValue.innerHTML = this.value + " x " + this.value;
    }

    // Listener when value of the slider is changed

    slider.addEventListener('change', (e) => {
        sketchArea.innerHTML = "";
        makeGrid(slider.value);
    } )

}








