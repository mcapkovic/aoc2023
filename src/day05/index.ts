import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

// ---------------------------- solution ----------------------------

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((line) => line.split("\n"))
    .map((categories, categoryIndex) => {
      if (categoryIndex === 0) {
        const seeds = categories[0].split(": ")[1].split(" ").map(Number);
        return {
          seeds,
        };
      } else {
        const [categoryName, ...categoryValues] = categories;
        const [categoryType] = categoryName.split(": ");

        const matches = categoryType.match(/(\b\w+\b)-to-(\b\w+\b)/);

        const categoryMaps = categoryValues.map((line) =>
          line.split(" ").map(Number),
        );
        return {
          destination: matches[2],
          source: matches[1],
          categoryMaps,
        };
      }
    });

function getConvertedSeed(seed, categoryMap) {
  const currentMap = categoryMap;

  let locationNumber = seed;

  currentMap.ranges.forEach((range) => {
    const { sourceFrom, sourceTo, destinationFrom, destinationTo } = range;
    if (sourceFrom <= seed && seed <= sourceTo) {
      const sourceNumberInDestination = seed - sourceFrom + destinationFrom;
      locationNumber = sourceNumberInDestination;
    }
  });

  return locationNumber;
}

function getConvertedSeeds(currentConvertedSeed, categoryMap) {
  const convertedSeed = currentConvertedSeed.map((seed) => {
    return getConvertedSeed(seed, categoryMap);
  });

  return convertedSeed;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [{ seeds }, ...categoriesMaps] = input;

  const extendedMaps = categoriesMaps.map((categoryMap) => {
    const { categoryMaps, source, destination } = categoryMap;
    // console.log("categoryMap", categoryMaps);

    const extendedMap = categoryMaps.map((row) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = row;
      return {
        sourceFrom: sourceRangeStart,
        sourceTo: sourceRangeStart + rangeLength - 1,
        destinationFrom: destinationRangeStart,
        destinationTo: destinationRangeStart + rangeLength - 1,
      };
    });

    // console.log("extendedMap", extendedMap);
    return {
      ...categoryMap,
      ranges: extendedMap,
    };
  });

  let currentConvertedSeed = seeds;

  extendedMaps.forEach((categoryMap) => {
    currentConvertedSeed = getConvertedSeeds(currentConvertedSeed, categoryMap);
  });

  return Math.min(...currentConvertedSeed);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [{ seeds }, ...categoriesMaps] = input;

  const extendedMaps = categoriesMaps.map((categoryMap) => {
    const { categoryMaps, source, destination } = categoryMap;
    // console.log("categoryMap", categoryMaps);

    const extendedMap = categoryMaps.map((row) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = row;
      return {
        sourceFrom: sourceRangeStart,
        sourceTo: sourceRangeStart + rangeLength - 1,
        destinationFrom: destinationRangeStart,
        destinationTo: destinationRangeStart + rangeLength - 1,
      };
    });

    return {
      ...categoryMap,
      ranges: extendedMap,
    };
  });

  let minValue = Number.MAX_SAFE_INTEGER;

  for (
    let firstIndex = 0;
    firstIndex < seeds?.length;
    firstIndex = firstIndex + 2
  ) {
    console.log("firstIndex", firstIndex);
    console.log("seeds?.length", seeds?.length);

    const startValue = seeds[firstIndex];
    const noOfLoops = seeds[firstIndex + 1];

    for (let loop = 0; loop < noOfLoops; loop++) {
      let currentValue = startValue + loop;

      extendedMaps.forEach(
        (categoryMap) =>
          (currentValue = getConvertedSeed(currentValue, categoryMap)),
      );

      if (currentValue < minValue) {
        minValue = currentValue;
      }
    }
  }

  return minValue;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 35,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 46,
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
