import { ethers, upgrades } from "hardhat";

async function main() {
  const address = "0x3B7ae26f0d814B2356F15033483801Ece3D428F2";
  const RadarVideoNFT = await ethers.getContractFactory("RadarVideoNFT");
  await upgrades.upgradeProxy(address, RadarVideoNFT);
}

main().catch(console.error);
