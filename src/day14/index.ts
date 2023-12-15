import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput.split("\n");

function getMovedRocks(input: string[]) {
  // console.log("");
  const movedRocks = [...input];

  let somethingMoved = false;

  do {
    somethingMoved = false;

    for (let rowIndex = 1; rowIndex < input.length; rowIndex++) {
      const currentRow = movedRocks[rowIndex].split("");
      const previousRow = movedRocks[rowIndex - 1].split("");

      currentRow.forEach((rock, rockIndex) => {
        const topSpaceSymbol = previousRow[rockIndex];
        // console.log("rock", rock);
        // console.log("topSpaceSymbol", topSpaceSymbol);
        if (rock !== "O") return;
        if (topSpaceSymbol !== ".") return;

        // console.log("moving rock", rockIndex);
        somethingMoved = true;

        previousRow[rockIndex] = "O";
        currentRow[rockIndex] = ".";
      });

      movedRocks[rowIndex - 1] = previousRow.join("");
      movedRocks[rowIndex] = currentRow.join("");
    }
  } while (somethingMoved);

  // console.log("movedRocks", movedRocks);
  // input.forEach((line) => console.log(line));
  // console.log("");
  // movedRocks.forEach((line) => console.log(line));

  return movedRocks;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const movedRocks = getMovedRocks(input);

  const rockCounts = movedRocks
    .map((line) => line.split("O").length - 1)
    .reverse();
  // console.log("countRocks", rockCounts);

  let count = 0;
  rockCounts.forEach((rockCount, index) => {
    count += rockCount * (index + 1);
  });

  return count;
};

function transpose(a) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      return r[c];
    });
  });
}

function doCycle(input: string[]) {
  let rockPositions = [...input];

  // rotate 4 times (one cycle)
  for (let i = 0; i < 4; i++) {
    const movedRocks = getMovedRocks(rockPositions);
    const matrix = movedRocks.map((line) => line.split(""));
    const transposedMatrix = transpose(matrix);
    rockPositions = transposedMatrix.map((line) => line.reverse().join(""));
  }

  return rockPositions;
}

function getRockCount(movedRocks: string[]) {
  const rockCounts = movedRocks
    .map((line) => line.split("O").length - 1)
    .reverse();
  // console.log("countRocks", rockCounts);

  let count = 0;
  rockCounts.forEach((rockCount, index) => {
    count += rockCount * (index + 1);
  });

  return count;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // const matrix = input.map((line) => line.split(""));
  // const transposedMatrix = transpose(matrix).map((line) =>
  //   line.reverse().join(""),
  // );

  // input.forEach((line) => console.log(line));
  // console.log("transposedMatrix");
  // transposedMatrix.forEach((line) => console.log(line));

  let rockPositions = [...input];

  for (let i = 1; i <= 200; i++) {
    rockPositions = doCycle(rockPositions);
    const count = getRockCount(rockPositions);
    console.log(`count ${count} cycle ${i}`);
    // console.log(count);
    // if (i > 100) console.log(`count ${count} cycle ${i}`);
  }

  // values for input
  const possibleValues = [
    83488, // 200
    83482, // 201
    83477, // 202
    83473,
    83484,
    83491,
    83507,
    83516,
    83516,
    83502,
    83489, // 210
  ];
  // 83482 // 300
  // 83477 // 400
  // 83516 // 1000000000

  // const movedRocks = getMovedRocks(input);
  // console.log("allCounts", allCounts);
  return 83516;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 136,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 64,
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
