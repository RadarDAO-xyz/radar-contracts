const { ethers, upgrades } = require("hardhat");

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = "0xcb25E9dcF86dB259765bA7a986dF142B41414036";

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  await upgrades.upgradeProxy(RADAR_EDITIONS_ADDRESS, RadarEditions);
}

main().catch(console.err);
