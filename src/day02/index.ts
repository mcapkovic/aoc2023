import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

// ---------------------------- solution ----------------------------

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [game, roundsString] = line.split(":");
    const [_, gameNumber] = game.split(" ");
    const roundsStrings = roundsString.split(";").map((round) => round.trim());
    const parsedRounds = roundsStrings.map((roundString) => {
      const round = roundString.split(",").map((card) => card.trim());
      return round;
    });
    return {
      gameNumber: Number(gameNumber),
      rounds: parsedRounds,
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const possibleGames = [];

  input.forEach((game) => {
    const { gameNumber, rounds } = game;
    let isGamePossible = true;

    rounds.forEach((round) => {
      round.forEach((dice) => {
        const [diceCount, diceColor] = dice.split(" ");
        const availableDiceCount = bag[diceColor];
        const isPossible = Number(diceCount) <= availableDiceCount;
        if (!isPossible) isGamePossible = false;
      });
    });

    if (isGamePossible) possibleGames.push(gameNumber);
  });

  return possibleGames.reduce((acc, gameNumber) => acc + gameNumber, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const roundsPower = input.map((game) => {
    const { rounds } = game;
    const diceCounter = new Map(
      Object.entries({
        red: 0,
        green: 0,
        blue: 0,
      }),
    );

    rounds.forEach((round) => {
      round.forEach((dice) => {
        const [diceCountString, diceColor] = dice.split(" ");
        const diceCount = Number(diceCountString);
        const currentMax = diceCounter.get(diceColor) ?? 0;
        if (diceCount > currentMax) diceCounter.set(diceColor, diceCount);
      });
    });

    const roundPower = [...diceCounter.values()].reduce(
      (acc, diceCount) => acc * diceCount,
      1,
    );
    return roundPower;
  });

  return roundsPower.reduce((acc, roundPower) => acc + roundPower, 0);
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 8,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 2286,
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
