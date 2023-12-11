import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput.split("\n");

function findEmptyRows(input: string[]) {
  const emptyRows: number[] = [];
  input.forEach((row, index) => {
    if (row.includes("#")) return;
    emptyRows.push(index);
  });
  return emptyRows;
}

function findEmptyColumns(input: string[]) {
  const emptyColumns: number[] = [];

  for (let i = 0; i < input[0].length; i++) {
    let empty = true;
    for (let j = 0; j < input.length; j++) {
      if (input[j][i] === "#") {
        empty = false;
        break;
      }
    }
    if (empty) emptyColumns.push(i);
  }
  return emptyColumns;
}

function addRows(input: string[], emptyRows: number[]) {
  const newInput = input.slice();
  const dotsRow = ".".repeat(input[0].length);
  let indexIncrement = 0;

  emptyRows.forEach((rowIndex) => {
    newInput.splice(rowIndex + indexIncrement, 0, dotsRow);
    indexIncrement++;
  });
  return newInput;
}

function addColumns(input: string[], emptyColumns: number[]) {
  const newInput = input.slice();
  let indexIncrement = 0;

  emptyColumns.forEach((columnIndex) => {
    const newIndex = columnIndex + indexIncrement;
    for (let i = 0; i < newInput.length; i++) {
      newInput[i] =
        newInput[i].slice(0, newIndex) + "." + newInput[i].slice(newIndex);
    }
    indexIncrement++;
  });
  return newInput;
}

function getGalaxies(input: string[]) {
  const galaxies: [number, number][] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "#") {
        galaxies.push([i, j]);
      }
    }
  }
  return galaxies;
}

function getGalaxyPairs(
  galaxies: [number, number][],
): [[number, number], [number, number]][] {
  const galaxyPairs = [];

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      galaxyPairs.push([galaxies[i], galaxies[j]]);
    }
  }

  return galaxyPairs;
}

// manhattan distance
function getDistances(
  galaxyPairs: [[number, number], [number, number]][],
): number[] {
  const distances = [];

  galaxyPairs.forEach((pair) => {
    const firstGalaxy = pair[0];
    const secondGalaxy = pair[1];
    const distance =
      Math.abs(firstGalaxy[0] - secondGalaxy[0]) +
      Math.abs(firstGalaxy[1] - secondGalaxy[1]);

    distances.push(distance);
  });

  return distances;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  const emptyRows = findEmptyRows(input);
  const emptyColumns = findEmptyColumns(input);

  let expandedInput = addRows(input, emptyRows);
  expandedInput = addColumns(expandedInput, emptyColumns);

  const galaxies: [number, number][] = getGalaxies(expandedInput);
  const galaxyPairs = getGalaxyPairs(galaxies);
  const distances = getDistances(galaxyPairs);

  return distances.reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 374,
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
  // onlyTests: true,
  onlyTests: false,
});
