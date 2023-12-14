import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((line) => line.split("\n"));

// find reflection line position
function getHorizontalReflectionRow2(pattern: string[]) {
  const flippedPattern = [...pattern].reverse();

  // console.log("flippedPattern");
  // flippedPattern.forEach((line) => console.log(line));
  // console.log("");
  // pattern.forEach((line) => console.log(line));

  let mirrorRowIndexes = [];

  for (
    let flippedRowIndex = 0;
    flippedRowIndex < flippedPattern.length;
    flippedRowIndex++
  ) {
    const flippedLine = flippedPattern[flippedRowIndex];
    for (
      let patternRowIndex = 0;
      patternRowIndex < pattern.length;
      patternRowIndex++
    ) {
      // ignore itself
      if (flippedPattern.length - 1 - flippedRowIndex === patternRowIndex)
        continue;
      const patternLine = pattern[patternRowIndex];

      if (flippedLine === patternLine) {
        console.log("-------flippedLine", flippedLine);
        console.log("-------patternLine", patternLine);
        console.log("flippedRowIndex", flippedRowIndex);
        console.log("patternRowIndex", patternRowIndex);
        mirrorRowIndexes.push(patternRowIndex);
      }
    }
  }

  // return null
  console.log("mirrorRowIndexes", mirrorRowIndexes);
  if (mirrorRowIndexes.length === 0) return null;

  const groups = {};
  let groupIndex = 0;
  let prevValue = null;
  mirrorRowIndexes
    .sort((a, b) => a - b)
    .forEach((value) => {
      if (prevValue === null) {
        groups["0"] = [value];
        prevValue = value;
        return;
      }
      if (prevValue + 1 !== value) groupIndex++;
      const group = groups[groupIndex] ?? [];
      group.push(value);
      groups[groupIndex] = group;
      prevValue = value;
    });

  console.log("groups", groups);
  const a = Object.values(groups)
    .filter((group) => group.length > 1)
    .filter((group) => {
      const firstElement = group[0];
      const lastElement = group[group.length - 1];
      return firstElement == 0 || lastElement === pattern.length - 1;
    });

  console.log("a", a);

  const biggestGroup = a[0];
  // console.log('biggestGroup', biggestGroup)
  if (biggestGroup == null) return null;

  const tempMiddle = biggestGroup.length / 2 - 1;
  const mirrorLineIndex = biggestGroup[tempMiddle];
  const row = mirrorLineIndex + 1;

  return row;

  // const firstElement = mirrorRowIndexes[0];
  // const lastElement = mirrorRowIndexes[mirrorRowIndexes.length - 1];

  // if (firstElement === 0 || lastElement === pattern.length - 1) {
  //   const tempMiddle = mirrorRowIndexes.length / 2 - 1;
  //   const mirrorLineIndex = mirrorRowIndexes[tempMiddle];
  //   const row = mirrorLineIndex + 1;
  //   return null;
  // }

  return null;
}

function getHorizontalReflectionRow(pattern: string[]) {
  console.log("pattern", pattern);

  const binary = pattern.map((line) => {
    const binaryLine = line.split("").map((char) => (char === "#" ? 1 : 0));
    return binaryLine.join("");
  });

  console.log("binary", binary);

  // binary to number
  const numbers = binary.map((line) => parseInt(line, 2));
  console.log("numbers", numbers);


  let mirrorLineIndex = null;
  const tempValues = [];
  // check from front

  // numbers [
  //   281, 265, 103, 502, 502, 103, 265
  // ]
}

function getVerticalReflectionColumn(pattern: string[]) {
  const originalPattern = pattern.map((line) => line.split(""));
  // console.log("originalPattern", originalPattern);

  // flip columns and rows
  const output = originalPattern[0].map((_, colIndex) =>
    originalPattern.map((row) => row[colIndex]),
  );
  const newPattern = output.map((line) => line.join(""));
  // console.log('pattern', pattern)
  // console.log("newPattern", newPattern);
  // pattern.forEach(
  // newPattern.forEach((line) => console.log(line));

  return getHorizontalReflectionRow(newPattern);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  // const values = input.map((pattern) => {
  // const horizontalReflectionRow = getHorizontalReflectionRow(pattern);
  // if (horizontalReflectionRow != null) return horizontalReflectionRow * 100;

  // const verticalReflectionRow = getVerticalReflectionColumn(pattern);
  // if (verticalReflectionRow != null) return verticalReflectionRow;
  // });

  // console.log(values);
  // return values.reduce((acc, curr) => acc + curr, 0);

  const pattern = input[1];

  const horizontalReflectionRow = getHorizontalReflectionRow(pattern);
  if (horizontalReflectionRow != null) return horizontalReflectionRow * 100;

  // const verticalReflectionRow = getVerticalReflectionColumn(pattern);
  // if (verticalReflectionRow != null) return verticalReflectionRow;

  return;
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
      expected: 405,
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
