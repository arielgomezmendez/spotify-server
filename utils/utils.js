const bands = require("../data/bands");

// Generate 4 possible band names to select
const generateBandOptions = (correctBand) => {
  const bandOptions = new Set(); // Cereate a Set  to avoid duplicates bands

  // Add the correct answer first
  bandOptions.add(correctBand);

  // Add random bands until there are 4 unique options
  while (bandOptions.size < 4) {
    const randomBandOption = bands[Math.floor(Math.random() * bands.length)];
    bandOptions.add(randomBandOption);
  }

  // Convert Set to array and throw in.
  return Array.from(bandOptions).sort(() => Math.random() - 0.5);
};

module.exports = { generateBandOptions };
