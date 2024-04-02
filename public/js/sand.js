function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
}

class Grid {
    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {number} blockWidth 
     */
    initialize(width, height, blockWidth) {
        this.columns = width / blockWidth;
        this.rows = height / blockWidth;
        this.blockWidth = blockWidth;
        this.state = new Array(this.columns * this.rows).fill(0);
        this.nextState = new Array(this.columns * this.rows).fill(0);
    }

    reset() {
        this.state = new Array(this.columns * this.rows).fill(0);
    }

    resetNext() {
        this.nextState = new Array(this.columns * this.rows).fill(0);
    }

    /**
     * 
     * @param {number} column 
     * @param {number} row 
     * @param {number | string} value 
     */
    setStatePoint(column, row, value) {
        this.state[(row * this.columns) + column] = value;
    }

    /**
     * 
     * @param {number} column 
     * @param {number} row 
     * @param {number | string} value 
     */
    setNextStatePoint(column, row, value) {
        this.nextState[row * this.columns + column] = value;
    }

    generateNextState() {

        for (let i = this.state.length - 1; i >= 0; i--) {

            if (this.isActivePoint(i)) {

                const currentColor = grid.state[i];
                const belowIndex = grid.getBelowIndex(i);
                const belowLeftIndex = belowIndex - 1;
                const belowRightIndex = belowIndex + 1;

                const hasValidBelow = this.hasOpenBelow(i)
                const hasValidLeft = this.hasOpenBelowLeft(i);
                const hasValidRight = this.hasOpenBelowRight(i);

                if (hasValidBelow) {
                    this.nextState[belowIndex] = currentColor;
                }
                else if (hasValidLeft && hasValidRight) {
                    this.nextState[sample([belowLeftIndex, belowRightIndex])] = currentColor;
                }
                else if (hasValidLeft) {
                    this.nextState[belowLeftIndex] = currentColor;
                }
                else if (hasValidRight) {
                    this.nextState[belowRightIndex] = currentColor;
                }
                else {
                    this.nextState[i] = currentColor;
                }
            }
        }

        this.state = this.nextState;
        this.resetNext();
    }

    /**
     * 
     * @param {number} index 
     * @returns boolean
     */
    isActivePoint(index) {
        return this.state[index] !== 0;
    }

    /**
     * 
     * @param {number} index 
     * @returns number
     */
    getCurrentColumn(index) {
        return index - (this.getCurrentRow(index) * grid.columns);
    }

    /**
     * 
     * @param {number} index 
     * @returns number
     */
    getCurrentRow(index) {
        return Math.floor((index / grid.columns));
    }

    /**
     * 
     * @param {number} index 
     * @returns number
     */
    getBelowIndex(index) {
        return index + this.columns;
    }

    /**
     * 
     * @param {number} index 
     * @returns boolean
     */
    hasOpenBelow(index) {
        const below = this.getBelowIndex(index);
        return this.nextState[below] === 0 && below < this.state.length;
    }

    /**
     * 
     * @param {number} index 
     * @returns boolean
     */
    hasOpenBelowLeft(index) {
        const below = this.getBelowIndex(index);
        return this.nextState[below - 1] === 0 && this.getCurrentColumn(index) !== 0
    }

    /**
    * 
    * @param {number} index 
    * @returns boolean
    */
    hasOpenBelowRight(index) {
        const below = this.getBelowIndex(index);
        return this.nextState[below + 1] === 0 && this.getCurrentColumn(index) !== this.columns - 1
    }

    /**
    * 
    * @param {number} index 
    * @returns number
    */
    getBlockX(index) {
        return grid.getCurrentColumn(index) * this.blockWidth
    }

    /**
    * 
    * @param {number} index 
    * @returns number
    */
    getBlockY(index) {
        return grid.getCurrentRow(index) * this.blockWidth
    }
}

let grid = new Grid();

const sandColors = ["#d6c078", "#cab77a", "#bdad7b", "#c6b168", "#e6d085", "#ead594", "#eedba3"];
const grassColors = ["#76e295", "#8ceb9e", "#9ceeaa", "#acf1b6", "#7edb90", "#80ce8e", "#82c08c"];

let currentPallet = sandColors;

function setup() {
    let width = 200;
    let height = 200;
    let pointWidth = 10;
    createCanvas(width, height);

    frameRate(15);
    noStroke();

    grid.initialize(width, height, pointWidth);

    const resetButton = document.getElementById('reset');

    resetButton.addEventListener('click', () => grid.reset());

    console.log(grid);

}

function draw() {

    for (let i = 0; i < grid.state.length; i++) {

        const x = grid.getBlockX(i);
        const y = grid.getBlockY(i);

        fill('black');
        square(x, y, grid.blockWidth);

        if (grid.isActivePoint(i)) {
            let fillColor = color(grid.state[i]);

            fill(fillColor);
            square(x, y, grid.blockWidth);
        }
    }

    grid.generateNextState();
}

function mouseDragged() {

    const cursorColumn = Math.floor(mouseX / grid.blockWidth);
    const cursorRow = Math.floor(mouseY / grid.blockWidth);
    const index = cursorColumn + (cursorRow * grid.columns);

    const validColumn = cursorColumn >= 0 && cursorColumn < grid.columns;
    const validRow = cursorRow >= 0 && cursorRow < grid.rows;

    const inBounds = validColumn && validRow;

    const canPlaceBlock = !grid.isActivePoint(index) && inBounds;

    if (canPlaceBlock) {
        grid.setStatePoint(cursorColumn, cursorRow, sample(currentPallet));
    }

    // prevent default
    return false;
}

function mouseReleased() {
    currentPallet = sample([sandColors, grassColors]);
}