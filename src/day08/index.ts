import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((line, index) => {
    if (index === 0) {
      return line;
    } else {
      const instructions = line.split("\n");
      const parsedInstructions = instructions.map((instruction) => {
        const [key, value] = instruction.split(" = ");
        return [key, value.slice(1, value.length - 1).split(", ")];
      });

      return new Map(parsedInstructions);
    }
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  const [directions, instructions] = input;
  let currentElement = "AAA";
  let counter = 0;

  do {
    const direction = directions[counter % directions.length];
    const options = instructions.get(currentElement);

    if (direction === "L") {
      currentElement = options[0];
    } else {
      currentElement = options[1];
    }

    counter++;
    if (currentElement === "ZZZ") {
      console.log("found zzz", counter)
      break;
    }

  } while (counter < 100000000000);

  return counter;
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
      expected: 2,
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
