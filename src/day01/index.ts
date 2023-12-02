import run from "aocrunner";

// ---------------------------- examples ----------------------------
const example1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numericLines = input
    .map((line) => line.match(/\d+/g) ?? [])
    .map((line) => line.join(""));

  const calibrationValues = numericLines.map((line) => {
    const calibrationValue = Number(`${line[0]}${line[line.length - 1]}`);
    return calibrationValue;
  });

  const sum = calibrationValues.reduce((acc, value) => acc + value, 0);
  return sum;
};

const NumberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const calibrationValues = input.map((line) => {
    const allNumbers = [];

    for (let i = 0; i < line.length; i++) {
      const symbol = line[i];
      const isText = isNaN(Number(symbol));

      if (isText) {
        const currentString = line.slice(i);
        NumberWords.every((word, index) => {
          if (currentString.startsWith(word)) {
            allNumbers.push(index + 1);
            return false;
          }
          return true;
        });
      } else {
        allNumbers.push(symbol);
      }
    }

    const numericLine = allNumbers.join("");
    const firstValue = numericLine[0];
    const lastValue = numericLine[numericLine.length - 1];
    const calibrationValue = Number(`${firstValue}${lastValue}`);

    return calibrationValue;
  });

  const sum = calibrationValues.reduce((acc, value) => acc + value, 0);
  return sum;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 142,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example2,
      expected: 281,
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
