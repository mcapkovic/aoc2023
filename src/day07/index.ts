import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const example2 = `AAAAA 765
AA8AA 684
23332 28
TTT98 28
23432 220
A23A4 483
23456 342`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" "));

const CARDS_STRENGTH = new Map([
  ["A", 12],
  ["K", 11],
  ["Q", 10],
  ["J", 9],
  ["T", 8],
  ["9", 7],
  ["8", 6],
  ["7", 5],
  ["6", 4],
  ["5", 3],
  ["4", 2],
  ["3", 1],
  ["2", 0],
]);

const CARDS_STRENGTH2 = new Map([
  ["A", "a"],
  ["K", "b"],
  ["Q", "c"],
  ["J", "d"],
  ["T", "e"],
  ["9", "f"],
  ["8", "g"],
  ["7", "h"],
  ["6", "i"],
  ["5", "j"],
  ["4", "k"],
  ["3", "l"],
  ["2", "m"],
]);

const CARDS_STRENGTH3 = new Map([
  ["A", "a"],
  ["K", "b"],
  ["Q", "c"],
  ["J", "n"],
  ["T", "e"],
  ["9", "f"],
  ["8", "g"],
  ["7", "h"],
  ["6", "i"],
  ["5", "j"],
  ["4", "k"],
  ["3", "l"],
  ["2", "m"],
]);

// hand types:
// Five of a kind - fiveOfAKind
//Four of a kind - fourOfAKind
// Full house - fullHouse
// Three of a kind - threeOfAKind
// Two pair - twoPair
// One pair - onePair
// High card - highCard

const TYPES_STRENGTH = new Map([
  ["fiveOfAKind", 6],
  ["fourOfAKind", 5],
  ["fullHouse", 4],
  ["threeOfAKind", 3],
  ["twoPair", 2],
  ["onePair", 1],
  ["highCard", 0],
]);

type HandType =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

// const FIVE_OF_A_KIND = 'fiveOfAKind'

function countCards(hand: string): Map<string, number> {
  const cards = new Map<string, number>();

  for (const card of hand) {
    // console.log(card);
    // const cardValue = card[0];
    const cardCount = cards.get(card) || 0;
    cards.set(card, cardCount + 1);
  }

  return cards;
}

function getCardType(cards: Map<string, number>): HandType | null {
  let type: HandType | null = null;
  if (cards.size === 1) type = "fiveOfAKind";
  if (cards.size === 2) {
    if ([...cards.values()].includes(4)) type = "fourOfAKind";
    if ([...cards.values()].includes(3)) type = "fullHouse";
  }
  if (cards.size === 3) {
    const counts = [...cards.values()].sort((a, b) => b - a).join("");
    if (counts === "311") type = "threeOfAKind";
    if (counts === "221") type = "twoPair";
  }
  if (cards.size === 4) type = "onePair";
  if (cards.size === 5) type = "highCard";

  return type;
}

function getCardTypeWithJoker(cards: Map<string, number>): HandType | null {
  let type: HandType | null = null;

  const jokerCount = cards.get("J") || 0;
  // const sortedHand = [...cards.values()].sort((a, b) => b - a)

  const newCards = new Map(cards);
  newCards.delete("J");
  const sortedHand = [...newCards.values()].sort((a, b) => b - a);
  sortedHand[0] += jokerCount;

  console.log(cards);
  console.log(sortedHand);

  if (sortedHand.length === 1) type = "fiveOfAKind";
  if (sortedHand.length === 2) {
    if (sortedHand[0] === 4) type = "fourOfAKind";
    if (sortedHand[0] === 3) type = "fullHouse";
  }
  if (sortedHand.length === 3) {
    const counts = sortedHand.join("");
    if (counts === "311") type = "threeOfAKind";
    if (counts === "221") type = "twoPair";
  }
  if (sortedHand.length === 4) type = "onePair";
  if (sortedHand.length === 5) type = "highCard";

  console.log("type", type);
  return type;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const groups = new Map();

  input.forEach((line) => {
    const [hand, bid] = line;
    const cards = countCards(hand);
    let type: HandType | null = getCardType(cards);
    const cardsStrengths = hand
      .split("")
      .map((card) => CARDS_STRENGTH2.get(card) ?? "z")
      .join("");

    const cardData = {
      hand,
      bid: Number(bid),
      type,
      typeStrength: TYPES_STRENGTH.get(type) ?? 0,
      cardsStrengths,
    };

    const group = groups.get(type) || [];
    groups.set(type, [...group, cardData]);

    return cardData;
  });

  const sortedByCardStrength = [];
  groups.forEach((group, type) => {
    const sortedByCardsStrength = group.sort((a, b) =>
      a.cardsStrengths.localeCompare(b.cardsStrengths),
    );
    sortedByCardStrength.push(sortedByCardsStrength);
  });

  const sortedByType = sortedByCardStrength
    .sort((a, b) => b[0].typeStrength - a[0].typeStrength)
    .flat();

  const topRank = sortedByType.length;
  let winnings = 0;
  sortedByType.forEach((card, index) => {
    const { bid } = card;
    const win = bid * (topRank - index);
    winnings += win;
  });

  return winnings;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const groups = new Map();

  input.forEach((line) => {
    const [hand, bid] = line;
    const cards = countCards(hand);
    let type: HandType | null = getCardTypeWithJoker(cards);
    const cardsStrengths = hand
      .split("")
      .map((card) => CARDS_STRENGTH3.get(card))
      .join("");

    const cardData = {
      hand,
      bid: Number(bid),
      type,
      typeStrength: TYPES_STRENGTH.get(type) ?? 0,
      cardsStrengths,
    };

    const group = groups.get(type) || [];
    groups.set(type, [...group, cardData]);

    return cardData;
  });

  const sortedByCardStrength = [];
  groups.forEach((group, type) => {
    const sortedByCardsStrength = group.sort((a, b) =>
      a.cardsStrengths.localeCompare(b.cardsStrengths),
    );
    sortedByCardStrength.push(sortedByCardsStrength);
  });

  const sortedByType = sortedByCardStrength
    .sort((a, b) => b[0].typeStrength - a[0].typeStrength)
    .flat();

  const topRank = sortedByType.length;
  let winnings = 0;
  sortedByType.forEach((card, index) => {
    const { bid } = card;
    const win = bid * (topRank - index);
    winnings += win;
  });

  return winnings;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 6440,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 5905,
      // expected: 6440,
    },
  ],
  solution: part2,
};

run({
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
});
