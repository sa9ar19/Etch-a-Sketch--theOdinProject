const defaultSize = 16 
const defaultColor = "#000000"
const defaultMode = "color"

let currentSize = defaultSize
let currentColor = defaultColor
let currentMode = defaultMode

const grid = document.getElementById('grid')
const colour = document.getElementById('colorBox')
const sizeSlider = document. getElementById("noOfPixels")
const rangeInfo = document.querySelector(".rangeInfo")
const color = document.getElementById("color")
const clear = document.getElementById("clear")
const eraser = document.getElementById('eraser')

colour.onchange = (e) => setCurrentColor(e.target.value)
sizeSlider.onchange = (e) => setCurrentSize(e.target.value)

color.onclick = () => {
    setCurrentMode('color')
    color.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = () =>{
    setCurrentMode('eraser')
    eraser.classList.add('active')
    color.classList.remove('active')
} 

clear.onclick = () => clearGrid()

function setCurrentMode(mode) {
    currentMode = mode 
}

function setCurrentSize(sizeValue) {
    currentSize = sizeValue
    clearGrid()
    setRangeInfo(sizeValue)
    setGridSize(sizeValue)
}

function setCurrentColor(color) {
    currentColor = color
}

function setRangeInfo(size) {
    rangeInfo.innerHTML = `${size} x ${size}`
}

function clearGrid() {
    grid.innerHTML = ""
    setGridSize(currentSize)
}

let mouseDown = false
document.body.onmousedown = () => {
    mouseDown = true
}
document.body.onmouseup = () => {
    mouseDown = false
}

function setGridSize(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`   
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`   

    for(i = 0; i< size * size; i++){
        //creates a new div called gridElements and appends to grid class
        const gridElements = document.createElement('div')
        gridElements.classList.add("gridElements")
        gridElements.addEventListener("mouseover", changeColor)
        gridElements.addEventListener("mousedown", changeColor)
        grid.appendChild(gridElements)
    }
}

function changeColor(e) {
    if (e.type === "mouseover" && mouseDown){
        if(currentMode === "color"){
            e.target.style.backgroundColor = currentColor
        }
        else if (currentMode === "eraser" ){
            e.target.style.backgroundColor = "#ffffff"
        }
    }
}

window.onload = () => {
    setGridSize(defaultSize)
}

