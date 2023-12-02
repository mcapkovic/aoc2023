import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = ``;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);
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
      expected: "",
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
