const { ethers, upgrades } = require("hardhat");

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = "0x2D22716eeb1F85cF79c5531B405517c07441e84B";

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  await upgrades.upgradeProxy(RADAR_EDITIONS_ADDRESS, RadarEditions);
}

main().catch(console.err);
