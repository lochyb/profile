let gridWidth = window.screen.width < 400 ? 300 : 400;
let gridHeight = 200;
let gridParticleWidth = 2;
let cursorX;
let cursorY;
let gridV2 = new GridV2(gridWidth, gridHeight, gridParticleWidth);

function setup() {
    const myCanvas = createCanvas(gridWidth, gridHeight);
    myCanvas.parent("sand-canvas");
    frameRate(60);
    
    myCanvas.mouseOver(() => {loop();})
    myCanvas.mouseOut(() => {noLoop();})
    noStroke();
    noCursor();

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => gridV2.resetState());

    console.log(gridV2);
}

function draw() {
    background(0);

    for (let index = gridV2.state.length - 1; index >= 0; index--) {
        const x = gridV2.getGridX(index);
        const y = gridV2.getGridY(index);
        const particle = gridV2.state[index];

        if (!particle.isEmpty){
        fill(particle.color);
        square(x, y, gridV2.particleWidth);
        }
    }

    gridV2.generateNextState();

    // generate cursor at end of draw cycle to make sure it shows on top.
    generateCursor();
}

function generateCursor() {
    cursorX = mouseX;
    cursorY = mouseY;

    const blockWidth = gridParticleWidth;
    const halfBlock = blockWidth / 2;
    const blockAndAHalf = blockWidth + halfBlock;
    const roundedValue = 50

    fill('#d6c078')
    rect(cursorX - halfBlock, cursorY - halfBlock, blockWidth, blockWidth);

    fill('#d6c07895')
    rect(cursorX - halfBlock, cursorY - blockAndAHalf, blockWidth, blockWidth);
    rect(cursorX + halfBlock, cursorY - halfBlock, blockWidth, blockWidth);
    rect(cursorX - halfBlock, cursorY + halfBlock, blockWidth, blockWidth);
    rect(cursorX - blockAndAHalf, cursorY - halfBlock, blockWidth, blockWidth);

    fill('#d6c07825')
    rect(cursorX - blockAndAHalf, cursorY - blockAndAHalf, blockWidth, blockWidth, roundedValue);
    rect(cursorX + halfBlock, cursorY + halfBlock, blockWidth, blockWidth, roundedValue);
    rect(cursorX - blockAndAHalf, cursorY + halfBlock, blockWidth, blockWidth, roundedValue);
    rect(cursorX + halfBlock, cursorY - blockAndAHalf, blockWidth, blockWidth, roundedValue);
}

function mouseDragged() {
    const cursorColumn = Math.floor(mouseX / gridV2.particleWidth);
    const cursorRow = Math.floor(mouseY / gridV2.particleWidth);
    const columnInbounds = cursorColumn >= 0 && cursorColumn < gridV2.columns
    const rowInbounds = cursorRow >= 0 && cursorRow < gridV2.rows
    const isCursorInbounds = columnInbounds && rowInbounds;

    if (!isCursorInbounds) {
        return;
    }

    const index = cursorColumn + (cursorRow * gridV2.columns);
    const isIndexInbounds = gridV2.isInbounds(index);

    const canPlaceBlock = gridV2.isEmpty(index) && isIndexInbounds;

    if (canPlaceBlock) {
        const oneBlockFromEdge = cursorColumn <= 0 || cursorColumn >= gridV2.columns - 1;
        const twoBlockFromEdge = cursorColumn <= 1 || cursorColumn >= gridV2.columns - 2;
        const threeBlockFromEdge = cursorColumn <= 2 || cursorColumn >= gridV2.columns - 3;

        gridV2.setStateParticle(cursorColumn, cursorRow);

        if (!oneBlockFromEdge) {
            gridV2.setStateParticle(cursorColumn + Math.floor(random(-1, 1)), cursorRow + Math.floor(random(0, 1)));
            gridV2.setStateParticle(cursorColumn + Math.floor(random(-1, 1)), cursorRow + Math.floor(random(0, 1)));
        }

        if (!twoBlockFromEdge) {

            gridV2.setStateParticle(cursorColumn + Math.floor(random(-2, 2)), cursorRow + Math.floor(random(0, 2)));
            gridV2.setStateParticle(cursorColumn + Math.floor(random(-2, 2)), cursorRow + Math.floor(random(0, 2)));
        }

        if (!threeBlockFromEdge) {

            gridV2.setStateParticle(cursorColumn + Math.floor(random(-3, 3)), cursorRow + Math.floor(random(0, 3)));
            gridV2.setStateParticle(cursorColumn + Math.floor(random(-3, 3)), cursorRow + Math.floor(random(0, 3)));
        }
    }

    // prevent default
    return false;
}
