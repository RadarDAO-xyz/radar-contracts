const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const RadarVideoNFT = await ethers.getContractFactory("RadarVideoNFT");
  const instance = await upgrades.deployProxy(RadarVideoNFT);
  await instance.waitForDeployment();

  console.log("Implementation address", await instance.getAddress());
}

main().catch(console.err);
