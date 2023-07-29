const { ethers, upgrades } = require("hardhat");

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = '0x5cc93ea88E3A114D586263E8B42e2c49d3943092';

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const upgraded = await upgrades.upgradeProxy(
    RADAR_EDITIONS_ADDRESS,
    RadarEditions
  );
  console.log(upgraded);
}

main().catch(console.err);
