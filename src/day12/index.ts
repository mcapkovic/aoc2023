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

  console.log("maxNoOfOptions", maxNoOfOptions);
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

function generatePossiblePatterns2(pattern: string, output: string) {
  const possiblePatterns = [];
  const questionMarkIndexes: number[] = [];

  pattern.split("").forEach((char, i) => {
    if (char === "?") {
      questionMarkIndexes.push(i);
    }
  });

  const questionMarksCount = questionMarkIndexes.length;
  const maxNoOfOptions = Math.pow(2, questionMarksCount);

  console.log("maxNoOfOptions", maxNoOfOptions);
  // try all options
  for (let optionNo = 0; optionNo < 10; optionNo++) {
    // console.log('questionMarkIndexes', questionMarkIndexes)

    const binary = optionNo.toString(2).padStart(questionMarksCount, "0");
    const newPattern = pattern.split("");

    // console.log('ddd')
    // replace ? with . and #
    questionMarkIndexes.forEach((questionMarkIndex, i) => {
      newPattern[questionMarkIndex] = binary[i] === "0" ? "." : "#";
    });

    const newPatternString = newPattern.join("");
    const counts = generateGroupsCounts(newPatternString);
    // console.log(newPatternString)
    if (counts === output) possiblePatterns.push(newPatternString);

    // possiblePatterns.push(newPattern.join(""));
  }

  return possiblePatterns;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const damagedSprings = input.map(([pattern, output]) => {
    const possiblePatterns = generatePossiblePatterns(pattern);
    const possibleCounts = possiblePatterns.map(generateGroupsCounts);
    const counts = possibleCounts.filter((count) => count === output);
    return counts.length;
  });

  // const damagedSprings = [];

  // const [pattern, output] = input[1];

  // // const groups = generateGroupsCounts('.#.###.#.######')
  // const possiblePatterns = generatePossiblePatterns(pattern);
  // const possibleCounts = possiblePatterns.map(generateGroupsCounts);
  // const counts = possibleCounts.filter((count) => count === output);

  // console.log(pattern, output);
  // console.log(possiblePatterns);
  // // console.log(possibleCounts);
  // // console.log(counts);

  // console.log(damagedSprings);

  return damagedSprings.reduce((acc, count) => acc + count, 0);
};

function getNoOfOptions2(pattern: string, output: string) {
  const resultGroups = output.split(",").map(Number);
  console.log("getNoOfOptions", pattern, resultGroups);

  let counter = 0;
  const correctPatterns = [];

  function count(data) {
    const {
      previousSymbols,
      currentSymbol,
      currentSymbolIndex,
      currentGroups,
    } = data;

    // console.log('-')
    // console.log("data", data);

    if (
      previousSymbols.length === pattern.length &&
      currentGroups[currentGroups.length - 1] === 0
    ) {
      currentGroups.pop();
    }

    let lastGroupCount = currentGroups[currentGroups.length - 1];
    let currentGroupMaxCount = resultGroups[currentGroups.length - 1];

    // if (previousSymbols.length === pattern.length && lastGroupCount === 0) {
    //   lastGroupCount = currentGroups[currentGroups.length - 2];
    //   currentGroupMaxCount = resultGroups[currentGroups.length - 2] ?? -1;
    // }

    // console.log("currentGroupMaxCount", currentGroupMaxCount);
    // console.log("lastGroupCount", lastGroupCount);
    const currentGroupsString = currentGroups.join("");
    const resultGroupsString = resultGroups.join("");
    // console.log("currentGroupsString", currentGroupsString);
    // console.log("resultGroupsString", resultGroupsString);

    if (lastGroupCount > currentGroupMaxCount) return;
    if (
      currentSymbol == null &&
      previousSymbols.length === pattern.length &&
      // lastGroupCount === currentGroupMaxCount &&
      currentGroupsString === resultGroupsString
    ) {
      counter++;
      correctPatterns.push(previousSymbols);
      // console.log("end----------------------------------------");
      return;
    }

    const nextSymbol = pattern[currentSymbolIndex + 1];
    if (currentSymbol === "?") {
      count({
        previousSymbols,
        currentSymbol: "#",
        currentSymbolIndex,
        currentGroups,
      }); // act as "#"
      count({
        previousSymbols,
        currentSymbol: ".",
        currentSymbolIndex,
        currentGroups,
      }); // act as "."
      return;
    }

    if (currentSymbol === "#") {
      const newGroup = [...currentGroups];
      newGroup[newGroup.length - 1]++;
      count({
        previousSymbols: previousSymbols + "#",
        currentSymbol: nextSymbol,
        currentSymbolIndex: currentSymbolIndex + 1,
        currentGroups: newGroup,
      });
      return;
    }

    if (currentSymbol === ".") {
      const newGroup = [...currentGroups];
      const previousSymbol = previousSymbols[previousSymbols.length - 1];
      if (previousSymbol === "#") {
        newGroup.push(0);
      }
      count({
        previousSymbols: previousSymbols + ".",
        currentSymbol: nextSymbol,
        currentSymbolIndex: currentSymbolIndex + 1,
        currentGroups: newGroup,
      });
      return;
    }
  }

  count({
    previousSymbols: "",
    currentSymbol: pattern[0],
    currentSymbolIndex: 0,
    currentGroups: [0],
  });

  // console.log("correctPatterns", correctPatterns);

  return counter;
}

const part2v2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const options = input.map(([oldPattern, oldOutput]) => {
    let pattern = oldPattern;
    let output = oldOutput;

    // for (let i = 1; i < 5; i++) {
    //   pattern += `?${oldPattern}`;
    //   output += `,${oldOutput}`;
    // }

    const noOfOptions = getNoOfOptions2(pattern, output);
    return noOfOptions;
  });

  return options.reduce((acc, count) => acc + count, 0);

  // const [oldPattern, oldOutput] = input[1];
  // let pattern = oldPattern;
  // let output = oldOutput;

  // // for (let i = 1; i < 5; i++) {
  // //   pattern += `?${oldPattern}`;
  // //   output += `,${oldOutput}`;
  // // }

  // const noOfOptions = getNoOfOptions2(pattern, output);

  // return noOfOptions;
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
  solution: part2v2,
};

run({
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  onlyTests: true,
  // onlyTests: false,
});
