import { ethers, upgrades } from "hardhat";

async function main() {
  // Upgrading
  const RADAR_EDITIONS_ADDRESS = "0xEd4295091C232A000B6fF2A546b78Fd90Ae8Db4E";
  // const LIB_BELIEFS_ADDRESS = "0xE72Fa1F9AA428009a09c8FA832445F066F0311e9";

  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  await upgrades.upgradeProxy(RADAR_EDITIONS_ADDRESS, RadarEditions);
}

main().catch(console.error);
