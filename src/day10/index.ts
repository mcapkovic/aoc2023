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
  console.log(input);

  const start = findStart(input);
  console.log(start);

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
    if(currentSymbol === 'S') break;
    // console.log(currentSymbol);
    const increments = directions.get(currentSymbol);
    const nextPossibleLocations = increments.map((increment) => [
      currentLocation[0] + increment[0],
      currentLocation[1] + increment[1],
    ]);
    // console.log('pastLocation', pastLocation)
    // console.log('nextPossibleLocations', nextPossibleLocations);

    let possibleLocation = nextPossibleLocations[0];
    if (
      possibleLocation[0] === pastLocation[0] &&
      possibleLocation[1] === pastLocation[1]
    )
      possibleLocation = nextPossibleLocations[1];

    // console.log('possibleLocation', possibleLocation)
  
    pastLocation = currentLocation;
    currentLocation = possibleLocation;

    console.log(currentSymbol);
    stepCounter++;
  } while (stepCounter < 10000000);

  console.log(stepCounter);

  return stepCounter / 2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      input: example1,
      expected: "",
    },
  ],
  solution: part2,
};

run({
  part1: part1Config,
  // part2: part2Config,
  trimTestInputs: true,
  onlyTests: true,
  // onlyTests: false,
});
