let gridV2 = new GridV2(200, 200, 50);

function setup() {
    createCanvas(200, 200);

    frameRate(1);
    noStroke();

    const resetButton = document.getElementById('reset');

    resetButton.addEventListener('click', () => gridV2.reset());

    console.log(gridV2);

}

function draw() {

    for (let index = 0; index < gridV2.state.length; index++) {

        const x = gridV2.getBlockX(index);
        const y = gridV2.getBlockY(index);

        fill('black');
        square(x, y, gridV2.particleWidth);

        if (gridV2.state[index] instanceof Sand) {
            let fillColor = color(gridV2.state[index].color);

            fill(fillColor);
            square(x, y, gridV2.particleWidth);
        }
    }

    // gridV2.generateNextState();
}

function mouseDragged() {
    const cursorColumn = Math.floor(mouseX / gridV2.particleWidth);
    const cursorRow = Math.floor(mouseY / gridV2.particleWidth);
    const index = cursorColumn + (cursorRow * gridV2.columns);
    
    const validColumn = cursorColumn >= 0 && cursorColumn < gridV2.columns;
    const validRow = cursorRow >= 0 && cursorRow < gridV2.rows;

    const inBounds = validColumn && validRow;

    const canPlaceBlock = gridV2.isEmpty(index) && inBounds;
    
    if (canPlaceBlock) {
        gridV2.setStatePoint(cursorColumn, cursorRow);
    }

    // prevent default
    return false;
}