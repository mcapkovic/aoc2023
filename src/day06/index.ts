import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `Time:      7  15   30
Distance:  9  40  200`;

// race time: 7
// target: 9
// ms hold - finish distance
// 0 0
// 1 6
// 2 10
// 3 12 = 7 - 3 = 4 * 3 = 12
// 4 12
// 5 10
// 6 6
// 7 0

// 2,3,4,5

// ---------------------------- solution ----------------------------

function getDistances(raceTime: number) {
  const distances = [];
  const maxDistance = raceTime;

  for (let holdTime = 0; holdTime <= maxDistance; holdTime++) {
    const availableRaceTime = raceTime - holdTime;
    const distance = holdTime * availableRaceTime;
    distances.push(distance);
  }

  return distances;
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.match(/\d+/g)?.map(Number) ?? []);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const noOfRaces = input[0].length;
  const racesWinnings = [];

  for (let raceNo = 0; raceNo < noOfRaces; raceNo++) {
    const raceTime = input[0][raceNo];
    const currentRecord = input[1][raceNo];

    const distances = getDistances(raceTime);
    const winningRaceTimes = distances.filter(
      (distance) => distance > currentRecord,
    );
    racesWinnings.push(winningRaceTimes.length);
  }

  return racesWinnings.reduce((acc, value) => acc * value, 1);
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
      expected: 288,
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
