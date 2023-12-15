import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

// ---------------------------- solution ----------------------------
const parseInput = (rawInput: string) => rawInput.split(",");

function getHashValue(symbol: string) {
  return symbol.charCodeAt(0);
}

function getHashValues(value: string) {
  return value.split("").map(getHashValue);
}

function hashAlgorithm(input: string) {
  const hashValues = getHashValues(input);
  let subValue = 0;

  const subValues = hashValues.map((value) => {
    subValue = subValue + value;
    // console.log(subValue);
    subValue = subValue * 17;
    // console.log(subValue);
    subValue = subValue % 256;
    // console.log(subValue);
    // console.log("----");
    return subValue;
  });

  return subValue;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  const stepsValues = input.map(hashAlgorithm);

  return stepsValues.reduce((acc, value) => acc + value, 0);
};

function createLens(label: string, focalLength: string) {
  return `${label} ${focalLength}`;
}

function getLabel(value: string) {
  return value.split(" ")[0];
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  // create 256 empty arrays
  const objective: string[][] = Array.from(Array(256), () => []);

  input.forEach((value) => {
    const isRemoveOperation = value.includes("-");
    const separator = isRemoveOperation ? "-" : "=";
    const [label, focalLength] = value.split(separator);
    const boxIndex = hashAlgorithm(label);
    let box = [...objective[boxIndex]];

    if (isRemoveOperation) {
      box = box.filter((item) => getLabel(item) !== label);
    } else {
      const labels = box.map(getLabel);
      const slotIndex = labels.indexOf(label);
      const lens = createLens(label, focalLength);

      if (slotIndex === -1) {
        box.push(lens);
      } else {
        box[slotIndex] = lens;
      }
    }

    objective[boxIndex] = box;
  });

  let focusingPower = 0;
  objective.forEach((box, boxIndex) => {
    if (box.length === 0) return;

    box.forEach((item, slotIndex) => {
      const [label, focalLength] = item.split(" ");
      const a = boxIndex + 1;
      const slotNumber = slotIndex + 1;

      const power = a * slotNumber * Number(focalLength);
      focusingPower = focusingPower + power;
    });
  });

  return focusingPower;
};

// ---------------------------- config ----------------------------

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 1320,
    },
  ],
  solution: part1,
};

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 145,
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
