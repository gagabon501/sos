//convert RGB to HEX
const rgbConvert = (color) => {
  const quotient = Math.floor(color / 16);
  const remainder = color % 16;

  const table = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  };
  return `${table[quotient]}${table[remainder]}`;
};

//Create random color
const randomColor = () => {
  const R = Math.floor(Math.random() * 255);
  const G = Math.floor(Math.random() * 255);
  const B = Math.floor(Math.random() * 255);

  const color = `#${rgbConvert(R)}${rgbConvert(G)}${rgbConvert(B)}`;
  console.log(color);

  return color;
};

export default randomColor;
