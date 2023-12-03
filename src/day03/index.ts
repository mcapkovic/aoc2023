import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const example2 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.53.
..592....3
...755....
...$.*....
.664.598..`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput.split("\n");

// [row, col]
const ADJACENT = [
  [-1, -1], // top left
  [-1, 0], // top
  [-1, 1], // top right
  // [0, -1], // left
  // [0, 1], // right
  [1, -1], // bottom left
  [1, 0], // bottom
  [1, 1], // bottom right
];

function hasSymbolAround({ column, row, input }) {
  // check left
  const leftSymbol = input[row][column - 1] ?? ".";
  const isLeftSymbolNumber = !isNaN(Number(leftSymbol));
  if (!isLeftSymbolNumber && leftSymbol != ".") return true;

  // check right
  const rightSymbol = input[row][column + 1] ?? ".";
  const isRightSymbolNumber = !isNaN(Number(rightSymbol));
  if (!isRightSymbolNumber && rightSymbol != ".") return true;

  // check other sides
  return ADJACENT.some(([rowOffset, colOffset]) => {
    const adjacentRow = row + rowOffset;
    const adjacentCol = column + colOffset;

    if (input[adjacentRow] == null) return false;
    if (input[adjacentRow][adjacentCol] == null) return false;

    const adjacentSymbol = input[adjacentRow][adjacentCol];
    if (adjacentSymbol === ".") return false;

    return true;
  });
}

const part1 = (rawInput: string) => {
  console.log("rawInput", rawInput);
  const input = parseInput(rawInput);
  console.log(input);

  const partNumbers = [];

  input.forEach((row, rowIndex) => {
    let potentialNumber = "";
    let hasPotentialNumberSymbolAround = false;

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const currentSymbol = row[columnIndex];
      const isNumber = !isNaN(Number(currentSymbol));

      if (isNumber) {
        potentialNumber += currentSymbol;
        if (hasPotentialNumberSymbolAround === false) {
          hasPotentialNumberSymbolAround = hasSymbolAround({
            column: columnIndex,
            row: rowIndex,
            input,
          });
        }
        if (columnIndex != row.length - 1) continue; // continue if not last symbol
      }

      // non number
      if (hasPotentialNumberSymbolAround && potentialNumber.length > 0) {
        partNumbers.push(Number(potentialNumber));
      }
      potentialNumber = "";
      hasPotentialNumberSymbolAround = false;
    }
  });

  console.log(partNumbers);

  return partNumbers.reduce((acc, number) => acc + number, 0);
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
      expected: 4361,
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
