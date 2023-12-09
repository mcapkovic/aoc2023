import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

// ---------------------------- solution ----------------------------

function getSubHistories(currentHistory: number[]) {
  const calculatedHistories = [currentHistory];

  let infinityLoopCounter = 0;
  let sourceHistory = currentHistory;
  do {
    infinityLoopCounter++;
    const newSubHistory = [];
    for (let index = 0; index < sourceHistory.length - 1; index++) {
      const currentValue = sourceHistory[index];
      const nextValue = sourceHistory[index + 1];
      const diff = nextValue - currentValue;
      newSubHistory.push(diff);
    }

    sourceHistory = newSubHistory;
    calculatedHistories.push(sourceHistory);
  } while (
    sourceHistory.filter((n) => n === 0).length != sourceHistory.length &&
    infinityLoopCounter < 10000000
  );

  return calculatedHistories.reverse();
}

function getLastValues(currentHistories: number[][]) {
  return currentHistories.map((history) => history[history.length - 1]);
}

function getFirstValues(currentHistories: number[][]) {
  return currentHistories.map((history) => history[0]);
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" ").map((n) => Number(n)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const predictedValues = input.map((currentHistory) => {
    const subHistories = getSubHistories(currentHistory);
    const lastValues = getLastValues(subHistories);

    let predictedValue = 0;
    for (let index = 0; index < lastValues.length; index++) {
      const value = lastValues[index];
      predictedValue += value;
    }

    return predictedValue;
  });

  return predictedValues.reduce((acc, value) => acc + value, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const predictedValues = input.map((currentHistory) => {
    const subHistories = getSubHistories(currentHistory);
    const firstValues = getFirstValues(subHistories);

    let predictedValue = 0;
    for (let index = 0; index < firstValues.length; index++) {
      const value = firstValues[index];
      predictedValue = value - predictedValue;
    }

    return predictedValue;
  });

  return predictedValues.reduce((acc, value) => acc + value, 0);
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 114,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 2,
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
