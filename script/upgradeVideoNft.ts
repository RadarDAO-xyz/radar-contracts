import { ethers, upgrades } from "hardhat";

async function main() {
  const address = "0x81610b0d990f56ff8cc46feeb3e61210cfc33f57";
  const RadarVideoNFT = await ethers.getContractFactory("RadarVideoNFT");
  await upgrades.upgradeProxy(address, RadarVideoNFT);
}

main().catch(console.error);
