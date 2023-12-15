import run from "aocrunner";

// ---------------------------- examples ----------------------------

const example1 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

// ---------------------------- solution ----------------------------

function getHashValue(symbol: string) {
  return symbol.charCodeAt(0);
}

function getHashValues(value: string) {
  return value.split("").map(getHashValue);
}

const parseInput = (rawInput: string) => rawInput.split(",");

function HASHAlgorithm(input: string) {
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

  const stepsValues = input.map(HASHAlgorithm);

  return stepsValues.reduce((acc, value) => acc + value, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  // create 256 empty arrays
  const objective = Array.from(Array(256), () => []);

  input.forEach((value) => {
    console.log(value);

    if (value.includes("-")) {
      const label = value.split("-")[0];

      const boxIndex = HASHAlgorithm(label);
      console.log(boxIndex);
      let box = [...objective[boxIndex]];
      box = box.filter((item) => getLabel(item) !== label);
      objective[boxIndex] = box;
    } else {
      const [label, focalLength] = value.split("=");
      const boxIndex = HASHAlgorithm(label);
      console.log(boxIndex);
      let box = [...objective[boxIndex]];
      // box = box.filter((item) => getLabel(item) !== label);
      // box.push(`${label} ${focalLength}`);

      const labels = box.map(getLabel);
      const slotIndex = labels.indexOf(label);

      if (slotIndex === -1) {
        box.push(`${label} ${focalLength}`);
      } else {
        box[slotIndex] = `${label} ${focalLength}`;
      }
      objective[boxIndex] = box;
    }
  });

  console.log(objective);

  let focusingPower = 0;

  objective.forEach((box, boxIndex) => {
    if (box.length === 0) return;

    box.forEach((item, slotIndex) => {
      const [label, focalLength] = item.split(" ");
      const a = boxIndex + 1;
      const slotNumber = slotIndex + 1;

      const power = a * slotNumber * focalLength;
      focusingPower = focusingPower + power;
    });
  });

  return focusingPower;
};

function getLabel(value: string) {
  return value.split(" ")[0];
}

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
  onlyTests: true,
  // onlyTests: false,
});
