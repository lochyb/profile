let grid = new GridV2(200, 200, 50);

function setup() {
    createCanvas(200, 200);

    frameRate(1);
    noStroke();

    const resetButton = document.getElementById('reset');

    resetButton.addEventListener('click', () => grid.reset());

    console.log(grid);

}

function draw() {

    for (let index = 0; index < grid.state.length; index++) {

        const x = grid.getBlockX(index);
        const y = grid.getBlockY(index);

        fill('black');
        square(x, y, grid.particleWidth);

        if (grid.state[index] instanceof Sand) {
            let fillColor = color(grid.state[index].color);

            fill(fillColor);
            square(x, y, grid.blockWidth);
        }
    }

    grid.generateNextState();
}

function mouseDragged() {
    console.log('dragged')
    const cursorColumn = Math.floor(mouseX / grid.blockWidth);
    const cursorRow = Math.floor(mouseY / grid.blockWidth);
    const index = cursorColumn + (cursorRow * grid.columns);

    const validColumn = cursorColumn >= 0 && cursorColumn < grid.columns;
    const validRow = cursorRow >= 0 && cursorRow < grid.rows;

    const inBounds = validColumn && validRow;

    const canPlaceBlock = !grid.isActivePoint(index) && inBounds;

    if (canPlaceBlock) {
        grid.setStatePoint(cursorColumn, cursorRow, grid.state[index].color);
    }

    // prevent default
    return false;
}