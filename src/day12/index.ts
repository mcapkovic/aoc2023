import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" "));

function generateGroupsCounts(pattern: string) {
  const groups = [];
  let group = [];
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "#") {
      group.push(i);
    } else if (group.length > 0) {
      groups.push(group);
      group = [];
    }
  }
  if (group.length > 0) {
    groups.push(group);
  }
  return groups.map((group) => group.length).join(",");
}

function generatePossiblePatterns(pattern: string) {
  const possiblePatterns = [];
  const questionMarkIndexes: number[] = [];

  pattern.split("").forEach((char, i) => {
    if (char === "?") {
      questionMarkIndexes.push(i);
    }
  });

  const questionMarksCount = questionMarkIndexes.length;
  const maxNoOfOptions = Math.pow(2, questionMarksCount);

  // try all options
  for (let optionNo = 0; optionNo < maxNoOfOptions; optionNo++) {
    const binary = optionNo.toString(2).padStart(questionMarksCount, "0");

    const newPattern = pattern.split("");

    // replace ? with . and #
    questionMarkIndexes.forEach((questionMarkIndex, i) => {
      newPattern[questionMarkIndex] = binary[i] === "0" ? "." : "#";
    });

    possiblePatterns.push(newPattern.join(""));
  }

  return possiblePatterns;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const damagedSprings = input.map(([pattern, output]) => {
    const possiblePatterns = generatePossiblePatterns(pattern);
    const possibleCounts = possiblePatterns.map(generateGroupsCounts);
    const counts = possibleCounts.filter((count) => count === output);
    return counts.length;
  });

  return damagedSprings.reduce((acc, count) => acc + count, 0);
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
      expected: 21,
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
