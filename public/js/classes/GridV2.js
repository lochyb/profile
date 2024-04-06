class GridV2 {

    constructor(width, height, particleWidth) {
        this.columns = width / particleWidth;
        this.rows = height / particleWidth;
        this.particleWidth = particleWidth;

        this.state = new Array(this.columns * this.rows).fill(new Empty);
        this.nextState = new Array(this.columns * this.rows).fill(new Empty);
        this.gravityState = new Array(this.columns * this.rows).fill(1);
    }

    swap(indexA, indexB) {
        const temp = this.state[indexA];
        this.state[indexA] = this.state[indexB];
        this.state[indexB] = temp;
    }

    reset() {
        this.state = new Array(this.columns * this.rows).fill(new Empty);
    }

    resetNext() {
        this.nextState = new Array(this.columns * this.rows).fill(new Empty);
    }

    setStatePoint(column, row) {
        this.state[(row * this.columns) + column] = new Sand;
    }

    setNextStatePoint(column, row, value) {
        this.nextState[row * this.columns + column] = value;
    }

    generateNextState() {

        for (let i = this.state.length -1; i >= 0; i--) {
            if (!this.isEmpty(i)) {

                for (let j = this.gravityState[i]; j >= 0; j--) {
                    this.determineNextPosition(i, j);
                }




            }
        }

        this.state = this.nextState;
        this.resetNext();
    }

    determineNextPosition(i, j) {
        const current = this.state[i];
        const belowIndex = this.getBelowIndex(i) + (j * this.columns);
        const belowLeftIndex = belowIndex - 1;
        const belowRightIndex = belowIndex + 1;

        console.log({ belowIndex: belowIndex, leftIndex: belowLeftIndex, rightIndex: belowRightIndex });


        const hasValidBelow = this.hasOpenBelow(belowIndex);
        const hasValidLeft = this.hasOpenBelowLeft(belowLeftIndex);
        const hasValidRight = this.hasOpenBelowRight(belowRightIndex);

        console.log({ below: hasValidBelow, left: hasValidLeft, right: hasValidRight });

        if (hasValidBelow) {
            this.nextState[belowIndex] = current;
        }
        else if (hasValidLeft && hasValidRight) {
            this.nextState[sample([belowLeftIndex, belowRightIndex])] = current;
        }
        else if (hasValidLeft) {
            this.nextState[belowLeftIndex] = current;
        }
        else if (hasValidRight) {
            this.nextState[belowRightIndex] = current;
        }
        else {
            this.nextState[i] = current;
        }
    }

    isEmpty(index) {
        return this.state[index].isEmpty;
    }

    getCurrentColumn(index) {
        return index - (this.getCurrentRow(index) * this.columns);
    }

    getCurrentRow(index) {
        return Math.floor((index / this.columns));
    }

    getBelowIndex(index) {
        return index + this.columns;
    }

    hasOpenBelow(index) {
        const isEmpty = this.nextState[index]?.isEmpty ?? false;
        return isEmpty && index < this.state.length;
    }


    hasOpenBelowLeft(index) {
        const isEmpty = this.nextState[index]?.isEmpty ?? false;
        return isEmpty && this.getCurrentColumn(index) !== 0;
    }

    hasOpenBelowRight(index) {
        const isEmpty = this.nextState[index]?.isEmpty ?? false;
        return isEmpty && this.getCurrentColumn(index) !== this.columns - 1;
    }

    getBlockX(index) {
        return this.getCurrentColumn(index) * this.particleWidth;
    }

    getBlockY(index) {
        return this.getCurrentRow(index) * this.particleWidth;
    }
}
