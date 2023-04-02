const sketchArea = document.getElementById("sketchArea");

let rows = document.getElementsByClassName("gridRow");

let cells = document.getElementsByClassName("cell");

const slider = document.getElementById('slider');

const clearButton = document.getElementById('clearButton');
const eraserButton = document.getElementById('eraserButton');








// Initialize the default grid which is 16x16


defaultGrid();
initializeSlider();





// Function for clearing the sketch area PS. (Kinda similar to the slider event listener)

clearButton.addEventListener('click', () => {
    sketchArea.innerHTML = "";
    makeGrid(slider.value);
})














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



function defaultGrid () {
    makeGrid(16);
}


function makeGrid (size) {
    sketchArea.setAttribute('style', 'grid-template: repeat(' + size + ', 1fr)' + '/' + 'repeat(' + size + ', 1fr)' );
    makeRows(size);
    makeColumns(size);
    draw();
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

function draw () {

    let isDrawing = false;
    let isErasing = false;

    

  
    const squares = document.querySelectorAll("div.cell");
    console.log(squares)


    /*
        The squares or each cell of the grid will be added an event listener.
    */
    squares.forEach((square) => {

        /*

        Once the user triggers a mousedown event on a cell, 
        isDrawing will be set to true and the user will be able to drag and color each cells 
        (this is achieved by adding the mouseover listener).

        A mouseup listener (or when the user releases the mouse click), isDrawing will be then set to false
        restricting the user to color each cells to avoid mistakes.
        
        */


        square.addEventListener('mousedown', (e) => {
            
            isDrawing = true;
            
            square.setAttribute('style', 'background-color:black');   
            
        })

        square.addEventListener('mouseup', (e) => {
            isDrawing = false;
        })


        square.addEventListener('mouseover', (e) => {

            if(isDrawing) {
                square.setAttribute('style', 'background-color:black');
            }
        })


    })

    // if the mouse cursor leaves the sketch area, drawing will be set to false
    sketchArea.addEventListener('mouseleave', (e) => {
        isDrawing = false;
    })

}







