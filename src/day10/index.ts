import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const example2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const example3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput.split("\n");

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.

const directions = new Map([
  [
    "|",
    [
      [-1, 0],
      [1, 0],
    ],
  ],
  [
    "-",
    [
      [0, -1],
      [0, 1],
    ],
  ],
  [
    "L",
    [
      [-1, 0],
      [0, 1],
    ],
  ],
  [
    "J",
    [
      [-1, 0],
      [0, -1],
    ],
  ],
  [
    "7",
    [
      [1, 0],
      [0, -1],
    ],
  ],
  [
    "F",
    [
      [1, 0],
      [0, 1],
    ],
  ],
]);

function findStart(input: string[]): [number, number] {
  for (let row = 0; row < input.length; row++) {
    const line = input[row];
    for (let col = 0; col < line.length; col++) {
      const char = line[col];
      if (char === "S") {
        return [row, col];
      }
    }
  }
  return [-1, -1];
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const start = findStart(input);
  let pastLocation = start;
  let currentLocation = start;
  let stepCounter = 0;

  // look top left right bottom
  const top = input[start[0] - 1][start[1]];
  const left = input[start[0]][start[1] - 1];
  const right = input[start[0]][start[1] + 1];
  const bottom = input[start[0] + 1][start[1]];
  if (top === "|" || top === "7" || top === "F")
    currentLocation = [start[0] - 1, start[1]];
  if (left === "-" || left === "J" || left === "7")
    currentLocation = [start[0], start[1] - 1];
  if (right === "-" || right === "F" || right === "L")
    currentLocation = [start[0], start[1] + 1];
  if (bottom === "|" || bottom === "L" || bottom === "J")
    currentLocation = [start[0] + 1, start[1]];
  stepCounter++;

  do {
    const currentSymbol = input[currentLocation[0]][currentLocation[1]];
    if (currentSymbol === "S") break;

    const increments = directions.get(currentSymbol);
    const nextPossibleLocations = increments.map((increment) => [
      currentLocation[0] + increment[0],
      currentLocation[1] + increment[1],
    ]);

    let possibleLocation = nextPossibleLocations[0];
    if (
      possibleLocation[0] === pastLocation[0] &&
      possibleLocation[1] === pastLocation[1]
    )
      possibleLocation = nextPossibleLocations[1];

    pastLocation = currentLocation;
    currentLocation = possibleLocation;

    console.log(currentSymbol);
    stepCounter++;
  } while (stepCounter < 10000000);

  console.log(stepCounter);

  return stepCounter / 2;
};

function firstMove(input: string[], start: [number, number]) {
  let currentLocation = start;

  const top = input[start[0] - 1][start[1]];
  const left = input[start[0]][start[1] - 1];
  const right = input[start[0]][start[1] + 1];
  const bottom = input[start[0] + 1][start[1]];

  if (top === "|" || top === "7" || top === "F")
    currentLocation = [start[0] - 1, start[1]];
  if (left === "-" || left === "J" || left === "7")
    currentLocation = [start[0], start[1] - 1];
  if (right === "-" || right === "F" || right === "L")
    currentLocation = [start[0], start[1] + 1];
  if (bottom === "|" || bottom === "L" || bottom === "J")
    currentLocation = [start[0] + 1, start[1]];

  return currentLocation;
}

// Ray casting algorithm
// https://www.youtube.com/watch?v=RSXM9bgqxJM
function isInside(edges: [number, number][], xp: number, yp: number) {
  let cnt = 0;
  for (let index = 0; index < edges.length; index++) {
    const edge = edges[index];
    const [x1, y1] = edge[0];
    const [x2, y2] = edge[1];
    if (yp < y1 !== yp < y2 && xp < x1 + ((yp - y1) / (y2 - y1)) * (x2 - x1)) {
      cnt += 1;
    }
  }
  return cnt % 2 === 1;
}

function isVertex(currentSymbol: string) {
  if (
    currentSymbol === "L" ||
    currentSymbol === "J" ||
    currentSymbol === "7" ||
    currentSymbol === "F"
  )
    return true;
  return false;
}

function isSameAsPastLocation(
  possibleLocation: [number, number],
  pastLocation: [number, number],
) {
  if (
    possibleLocation[0] === pastLocation[0] &&
    possibleLocation[1] === pastLocation[1]
  )
    return true;
  return false;
}

// convert [x, y] to x-y string
function convertToString({ row, col }: { row: number; col: number }) {
  return `${row}-${col}`;
}



const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const start = findStart(input);
  const visited = new Set<string>();
  const allVertices: [number, number][] = [];
  let pastLocation = start;
  let currentLocation = start;

  // calculate first step manually
  allVertices.push(currentLocation);
  visited.add(
    convertToString({ row: currentLocation[0], col: currentLocation[1] }),
  );
  currentLocation = firstMove(input, start);

  // calculate the rest of the steps
  do {
    visited.add(
      convertToString({ row: currentLocation[0], col: currentLocation[1] }),
    );
    const currentSymbol = input[currentLocation[0]][currentLocation[1]];
    if (isVertex(currentSymbol)) allVertices.push(currentLocation);

    if (currentSymbol === "S") break;

    const increments = directions.get(currentSymbol);
    const nextPossibleLocations = increments.map((increment) => [
      currentLocation[0] + increment[0],
      currentLocation[1] + increment[1],
    ]);

    let possibleLocation = nextPossibleLocations[0];
    if (isSameAsPastLocation(possibleLocation, pastLocation))
      possibleLocation = nextPossibleLocations[1];

    pastLocation = currentLocation;
    currentLocation = possibleLocation;

  } while (true);

  const edges = allVertices.map((vertex, index) => [
    vertex,
    allVertices[(index + 1) % allVertices.length],
  ]);

  const noOfRows = input.length;
  const noOfCols = input[0].length;
  let insidePoints = 0;

  // check all points inside the grid but ignore visited points
  for (let row = 0; row < noOfRows; row++) {
    for (let col = 0; col < noOfCols; col++) {
      const wasVisited = visited.has(convertToString({ row, col }));
      if (wasVisited) continue;

      const isPointInside = isInside(edges, row, col);
      if (isPointInside) insidePoints++;
    }
  }

  return insidePoints;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example2,
      expected: "",
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example3,
      expected: 4,
    },
  ],
  solution: part2,
};

run({
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
});
