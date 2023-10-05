import { ethers } from "hardhat";

async function main() {
  const LibBeliefs = await ethers.getContractFactory("LibBeliefs");
  const instance = await LibBeliefs.deploy();

  console.log("Address:", await instance.getAddress());
}

main().catch(console.error);
