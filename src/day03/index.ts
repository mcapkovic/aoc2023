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

const ALL_ADJACENT = [
  [-1, -1], // top left
  [-1, 0], // top
  [-1, 1], // top right
  [0, -1], // left
  [0, 1], // right
  [1, -1], // bottom left
  [1, 0], // bottom
  [1, 1], // bottom right
];

function hasSymbolAround({
  column,
  row,
  input,
}: {
  column: number;
  row: number;
  input: string[];
}) {
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
  const input = parseInput(rawInput);
  const partNumbers: number[] = [];

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

  return partNumbers.reduce((acc, number) => acc + number, 0);
};

function getGearAround({
  column,
  row,
  input,
}: {
  column: number;
  row: number;
  input: string[];
}) {
  const gearsAround: string[] = [];

  ALL_ADJACENT.forEach(([rowOffset, colOffset]) => {
    const adjacentRow = row + rowOffset;
    const adjacentCol = column + colOffset;

    if (input[adjacentRow] == null) return;
    if (input[adjacentRow][adjacentCol] == null) return;

    const adjacentSymbol = input[adjacentRow][adjacentCol];
    if (adjacentSymbol != "*") return;

    gearsAround.push(`${adjacentRow}-${adjacentCol}`);
  });

  return gearsAround;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const partNumbers: {
    value: number;
    gearsAround: string[];
  }[] = [];

  input.forEach((row, rowIndex) => {
    let potentialNumber = "";
    const gearsAroundPotentialNumber = new Set<string>();

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const currentSymbol = row[columnIndex];
      const isNumber = !isNaN(Number(currentSymbol));

      if (isNumber) {
        potentialNumber += currentSymbol;

        const gearsAround = getGearAround({
          column: columnIndex,
          row: rowIndex,
          input,
        });

        gearsAround.forEach((gear) => gearsAroundPotentialNumber.add(gear));

        if (columnIndex != row.length - 1) continue; // continue if not last symbol
      }

      // non number
      if (gearsAroundPotentialNumber.size > 0 && potentialNumber.length > 0) {
        partNumbers.push({
          value: Number(potentialNumber),
          gearsAround: [...gearsAroundPotentialNumber],
        });
      }
      potentialNumber = "";
      gearsAroundPotentialNumber.clear();
    }
  });

  const gears = new Map<string, number[]>();
  partNumbers.forEach(({ value, gearsAround }) => {
    gearsAround.forEach((gear) => {
      const currentGearValue = gears.get(gear) ?? [];
      currentGearValue.push(value);
      gears.set(gear, currentGearValue);
    });
  });

  let sum = 0;
  gears.forEach((values, gear) => {
    if (values.length === 2) {
      const [firstValue, secondValue] = values;
      const ratio = firstValue * secondValue;
      sum += ratio;
    }
  });

  return sum;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 4361,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 467835,
    },
  ],
  solution: part2,
};

run({
  part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
});
