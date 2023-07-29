const { ethers, upgrades } = require("hardhat");

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = '0x2D22716eeb1F85cF79c5531B405517c07441e84B';

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const upgraded = await upgrades.upgradeProxy(
    RADAR_EDITIONS_ADDRESS,
    RadarEditions
  );
  console.log(upgraded);
}

main().catch(console.err);
