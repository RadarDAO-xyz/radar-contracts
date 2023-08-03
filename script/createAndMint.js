const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const RadarEditions = await ethers.getContractFactory("RadarEditions");
  const instance = await upgrades.deployProxy(RadarEditions);
  await instance.waitForDeployment();

  // set protocol fee to 0.001 ether
  await instance.setProtocolFee(ethers.parseEther("0.001"));

  await instance.createEdition(10000, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "some-id");

  await instance.approveEdition(0);

  await instance.mintEdition(0, 1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x0000000000000000000000000000000000000000000000000000000000000000", {
    value: ethers.parseEther("0.001")
  })

  console.log(await instance.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))

}

main().catch(console.err);
