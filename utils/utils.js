const bands = require("../data/bands");

//Generate 4 possibles band names to select
const generateBandOptions = (randomBand) => {
  const randomBands = [];
  for (let i = 0; i < 3; i++) {
    const randomBandOption = bands[Math.floor(Math.random() * bands.length)];
    randomBands.push(randomBandOption);
  }
  const bandOptions = [...randomBands];
  const randomIndex = Math.floor(Math.random() * (bandOptions.length + 1));
  console.log(randomBands)
  bandOptions.splice(randomIndex, 0, randomBand);
  return bandOptions
  
};

module.exports = {generateBandOptions};
