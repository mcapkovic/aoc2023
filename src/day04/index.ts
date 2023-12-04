import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [card, cardValues] = line.split(":");
    const [winningValues, myValues] = cardValues.split("|");
    const cardNumber = Number(card.match(/\d+/g)?.[0]);
    const winningNumbers = winningValues.match(/\d+/g)?.map(Number) ?? [];
    const myNumbers = myValues.match(/\d+/g)?.map(Number) ?? [];
    return {
      card: cardNumber,
      winningValues: winningNumbers,
      myValues: myNumbers,
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const cardsWorth = input.map((card) => {
    const { winningValues, myValues } = card;
    let noOfWinningValues = 0;

    myValues.forEach((myValue) => {
      if (winningValues.includes(myValue)) {
        noOfWinningValues++;
      }
    });

    const cardValue =
      noOfWinningValues > 0 ? Math.pow(2, noOfWinningValues - 1) : 0;
    return cardValue;
  });

  return cardsWorth.reduce((acc, value) => acc + value, 0);
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
      expected: 13,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 13,
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
