import { ethers, upgrades } from "hardhat";

async function main() {
  // Deploying
  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const instance = await upgrades.deployProxy(RadarEditions);
  await instance.waitForDeployment();

  console.log("Implementation address", await instance.getAddress());

  // set protocol fee to 0.001 ether
  await instance.setProtocolFee(ethers.parseEther("0.001"));

  console.log(await instance.protocolFee());
}

main().catch(console.error);
