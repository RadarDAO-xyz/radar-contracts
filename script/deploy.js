const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const instance = await upgrades.deployProxy(RadarEditions);
  await instance.waitForDeployment();

  console.log("Implementation address", await instance.getAddress());

  // set protocol fee to 0.001 ether
  await instance.setProtocolFee(ethers.parseEther("0.001"));

  console.log(await instance.protocolFee());

  // await instance.createEdition(10000);

  // console.log(await instance.editions(0));

  // Upgrading
  //   const BoxV2 = await ethers.getContractFactory("BoxV2");
  //   const upgraded = await upgrades.upgradeProxy(
  //     await instance.getAddress(),
  //     BoxV2
  //   );
}

main().catch(console.err);
