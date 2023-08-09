const { ethers, upgrades } = require("hardhat");

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = "0xEd4295091C232A000B6fF2A546b78Fd90Ae8Db4E";

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  await upgrades.upgradeProxy(RADAR_EDITIONS_ADDRESS, RadarEditions);
}

main().catch(console.err);
