class GridV2 {

    constructor(width, height, particleWidth) {
        this.columns = width / particleWidth;
        this.rows = height / particleWidth;
        this.particleWidth = particleWidth;

        this.state = this.generateInitialState();
        this.nextState = new Array(this.columns * this.rows).fill(new Empty);
    }

    findNextBelowIndex(index) {
        const velocity = this.getParticleVelocity(index);
        let returnIndex = index;

        for (let vel = velocity; vel >= 0; vel--) {
            const belowIndex = index + (vel * this.columns);

            if (!this.isInbounds(belowIndex)) {
                continue;
            }

            const particle = this.nextState[belowIndex];

            if (particle.isEmpty) {
                returnIndex = belowIndex;
                break;
            }
        }

        return returnIndex;
    }

    generateInitialState() {
        const middleCol = Math.floor(this.columns / 2);
        const middleRow = Math.floor(this.rows / 2);

        const state = new Array(this.columns * this.rows).fill(new Empty);

        state[middleCol + ((middleRow - 2) * this.columns)] = new Sand(1);
        state[middleCol + middleRow * this.columns] = new Sand(1);
        state[middleCol - 1 + (middleRow * this.columns)] = new Sand(1);
        state[middleCol + 1 + (middleRow * this.columns)] = new Sand(1);
        state[middleCol + (middleRow - 1) * this.columns] = new Sand(1);
        state[middleCol - 1 + ((middleRow - 1) * this.columns)] = new Sand(1);
        state[middleCol + 1 + ((middleRow - 1) * this.columns)] = new Sand(1);
        state[middleCol + ((middleRow + 1) * this.columns)] = new Sand(1);

        return state;
    }

    generateNextState() {
        for (let row = this.rows - 1; row >= 0; row--) {
            // determine inner loop direction
            const innerLoopDirection = Math.random() > 0.5;

            for (let i = 0; i < this.columns; i++) {
                const column = innerLoopDirection ? i : -i - 1 + this.columns;
                const index = (row * this.columns) + column;
                const isParticle = !this.isEmpty(index);

                if (isParticle) {
                    const nextIndex = this.findNextBelowIndex(index);
                    const isSameIndex = index === nextIndex;

                    if (isSameIndex) {
                        this.setNextPosition(index);
                    } else {
                        this.increaseParticleVelocity(index, nextIndex);
                    }
                }
            }
        }

        this.state = this.nextState;
        this.resetNextState();
    }

    getBelowIndex(index) {
        return index + this.columns;
    }

    getCurrentColumn(index) {
        return index % this.columns;
    }

    getCurrentRow(index) {
        return Math.floor((index / this.columns));
    }

    getGridX(index) {
        return this.getCurrentColumn(index) * this.particleWidth;
    }

    getGridY(index) {
        return this.getCurrentRow(index) * this.particleWidth;
    }

    getParticleVelocity(index) {
        return this.state[index].velocity;
    }

    hasOpenBelowLeft(index) {
        return this.nextState[index - 1]?.isEmpty && this.getCurrentColumn(index) !== 0;
    }

    hasOpenBelowRight(index) {
        return this.nextState[index + 1]?.isEmpty && this.getCurrentColumn(index) !== this.columns - 1;
    }

    increaseParticleVelocity(index, nextIndex) {
        const updatedParticle = this.state[index];
        updatedParticle.velocity += 1;
        this.nextState[nextIndex] = updatedParticle;
    }

    isEmpty(index) {
        return this.state[index].isEmpty;
    }

    isInbounds(index) {
        const column = this.getCurrentColumn(index);
        const row = this.getCurrentRow(index);

        const isColumnInBounds = column >= 0 && column < this.columns;
        const isRowInBounds = row >= 0 && row < this.rows;

        return isColumnInBounds && isRowInBounds;
    }

    resetNextState() {
        this.nextState = new Array(this.columns * this.rows).fill(new Empty);
    }

    resetState() {
        this.state = new Array(this.columns * this.rows).fill(new Empty);
    }

    setNext(index, particle) {
        this.nextState[index] = particle;
    }

    setNextPosition(index) {
        const particle = this.state[index];
        particle.velocity = 1;

        const belowIndex = this.getBelowIndex(index);
        const belowLeftIndex = belowIndex - 1;
        const belowRightIndex = belowIndex + 1;

        const hasValidLeft = this.hasOpenBelowLeft(belowIndex);
        const hasValidRight = this.hasOpenBelowRight(belowIndex);

        if (hasValidLeft && hasValidRight) {
            const direction = sample([belowLeftIndex, belowRightIndex])
            this.setNext(direction, particle);
        } else if (hasValidLeft) {
            this.setNext(belowLeftIndex, particle);
        } else if (hasValidRight) {
            particle.velocity = 0;
            this.setNext(belowRightIndex, particle);
        } else {
            particle.velocity = 0;
            this.setNext(index, particle);
        }
    }

    setStateParticle(column, row) {
        this.state[(row * this.columns) + column] = new Sand(1);
    }
}