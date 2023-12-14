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
  console.log("");
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
  input.forEach((line) => console.log(line));
  console.log("");
  movedRocks.forEach((line) => console.log(line));

  return movedRocks;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const movedRocks = getMovedRocks(input);

  const rockCounts = movedRocks
    .map((line) => line.split("O").length - 1)
    .reverse();
  console.log("countRocks", rockCounts);
  let count = 0;

  rockCounts.forEach((rockCount, index) => {
    count += rockCount * (index + 1);
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const movedRocks = getMovedRocks(input);

  // for (let i = 0; i < 1000000000; i++) {
  //   console.log("i", i);
  // }

  return;
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
      expected: "",
    },
  ],
  solution: part2,
};

run({
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  onlyTests: true,
  // onlyTests: false,
});
