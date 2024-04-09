<!-- TOC -->
  * [Introduction](#introduction)
  * [Tools Used](#tools-used)
  * [Code](#code)
    * [P5 canvas](#p5-canvas)
    * [Grid Class](#grid-class)
    * [Other Classes](#other-classes)
      * [Particle](#particle)
      * [Sand](#sand)
      * [Empty](#empty)
      * [Helper Function](#helper-function)
    * [Set Initial Sand Blob](#set-initial-sand-blob)
    * [Set Canvas To Match Grid State](#set-canvas-to-match-grid-state)
    * [Generating The Next State](#generating-the-next-state)
      * [draw](#draw)
      * [generateNextState](#generatenextstate)
      * [setNextPosition](#setnextposition)
      * [increaseParticleVelocity](#increaseparticlevelocity)
    * [Set Particles When MouseDragged](#set-particles-when-mousedragged)
  * [Conclusion](#conclusion)
  * [Version 1](#version-1)
  * [References](#references)
<!-- TOC -->

## Introduction

I always enjoyed the schools computer lab classes. Not that I did much studying of computers, but rather play a multitude of flash games. One such game with I
spent too much school time playing was [Powder Toy](https://powdertoy.co.uk/).

[Powder Toy](https://powdertoy.co.uk/) is a scientific simulation kind of game. It uses physics and particles to simulate different elements and their
reactions.

Fast-forward two decades and I find myself watching this Coding Train
video [Coding Challenge 180: Falling Sand](https://www.youtube.com/watch?v=L4u7Zy_b868&t=884s), and it brings back fond memories
of [Powder Toy](https://powdertoy.co.uk/).

I decided to relish the nostalgia and try my hand at coding just one kind of particle simulation, Sand!

## Tools Used

In order to save myself some madness I used the creative coding library [p5js](https://p5js.org/). I had never used  [p5js](https://p5js.org/) before, so with
the help from [The Nature Of Code 2](https://thecodingtrain.com/tracks/the-nature-of-code-2) and the videos from Daniel Shiffman I was on my way.

Watching the YouTube videos, referencing the [Documentation](https://p5js.org/reference/) and reading the articles from [Jason Mcghee](https://jason.today/) I
begin my sand filled journey.

## Code

### P5 canvas

I start with a 400 by 200 canvas that refreshes with a 60fps.

```js
let gridWidth = 400;
let gridHeight = 200;

function setup() {
  createCanvas(gridWidth, gridHeight);
  frameRate(60);

  noStroke();
}

function draw() {
  background(0);
}

```

<br>

### Grid Class

In order to hold all our logic and state I created a class called `Grid`. Using OOP (Object-Oriented Programing) helps us separate concerns and keep out code a
tidy.

It holds both the current and next state of the particles in our grid. `nextState` is used for setting the next frame of animations state.

```js
class GridV2 {
  constructor(width, height, particleWidth) {
    this.columns = width / particleWidth;
    this.rows = height / particleWidth;
    this.particleWidth = particleWidth;

    this.state = this.generateInitialState();
    this.nextState = new Array(this.columns * this.rows).fill(new Empty);
  }
}

```

<br>

Initialise the Grid.

```js
let gridV2 = new GridV2(gridWidth, gridHeight, gridParticleWidth);
```

<br>

### Other Classes

#### Particle

```js
class Particle {
  constructor({color, isEmpty, velocity = 0}) {
    this.color = color;
    this.isEmpty = isEmpty;
    this.velocity = velocity
  }
}

```

<br>

#### Sand

```js
class Sand extends Particle {
  static sandColors = [
    "#d6c078",
    "#cab77a",
    "#bdad7b",
    "#c6b168",
    "#e6d085",
    "#ead594",
    "#eedba3"
  ];

  constructor(velocity) {
    super({color: sample(Sand.sandColors), isEmpty: false, velocity: velocity});
  }
}

```

<br>

#### Empty

```js
  class Empty extends Particle {
  constructor() {
    super({color: '#000000', isEmpty: true});
  }
}

```

<br>

#### Helper Function

```js
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

```

<br>

### Set Initial Sand Blob

This places some sand particles in the middle of the screen when the grid is initialised.

```js
class GridV2 {
  // ...

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
}

```

<br>

The calculated data looks like this.

```json
{
  "columns": 100,
  "rows": 50,
  "particleWidth": 2,
  "state": [
    Empty,
    Empty,
    Empty
    …
  ],
  "nextState": [
    Empty,
    Empty,
    Empty
    …
  ]
}

```

<br>

### Set Canvas To Match Grid State

I run a backwards loop to check each grid state. Then if the particle is not empty I use a `p5.fill` to set the color and `p5.square` to draw the particle.

This draw function is run every frame.

```js
function draw() {
  // ...

  for (let index = gridV2.state.length - 1; index >= 0; index--) {
    const x = gridV2.getGridX(index);
    const y = gridV2.getGridY(index);
    const particle = gridV2.state[index];

    if (!particle.isEmpty) {
      fill(particle.color);
      square(x, y, gridV2.particleWidth);
    }
  }
}

```

<br>

### Generating The Next State

calculate the next state with every frame.

#### draw

```js
function draw() {
  // ...

  gridV2.generateNextState();
}

```

<br>

Loop backwards row by row. Randomly pick which direction to loop for each row to help generate a random particle feel. For each particle find if an open space
below exists. If space is available increase the velocity of the particle. If no below space is available check left and right for open spaces.

Once all the particles have been updated change the current state for the nextState and clear the nextState.

#### generateNextState

```js
class GridV2 {
  // ...

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
}

```

<br>

#### setNextPosition

```js
class GridV2 {
  // ... 

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
}

```

<br>

#### increaseParticleVelocity

```js
class GridV2 {
  // ...

  increaseParticleVelocity(index, nextIndex) {
    const updatedParticle = this.state[index];
    updatedParticle.velocity += 1;
    this.nextState[nextIndex] = updatedParticle;
  }

}

```

<br>

### Set Particles When MouseDragged

When mouse is click and dragged over the canvas calculate the corresponding grid x and y and set that index to be a new sand particle. Then let gravity do the
rest.

```js
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
    gridV2.setStateParticle(cursorColumn, cursorRow);

  }

  // prevent default
  return false;
}

```

<br>

## Conclusion

This was a very brief explanation of the code. All source code is available on [GitHub](https://github.com/lochyb/profile) or you can just check the developer
tools.

<br>

## Version 1

[Version 1](/profile/sand)

## References

- https://thecodingtrain.com/
- https://natureofcode.com/
- https://powdertoy.co.uk/
- https://p5js.org/
- https://jason.today/falling-sand
- https://jason.today/falling-improved 