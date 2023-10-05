import { ethers, upgrades } from "hardhat";

async function main() {
  // Deploying
  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const instance = await upgrades.deployProxy(RadarEditions);
  await instance.waitForDeployment();

  console.log("Implementation address", await instance.getAddress());
}

main().catch(console.error);
