import { ethers, upgrades } from "hardhat";
import type { RadarEditions } from "../../typechain-types/src/RadarEditions";

export async function deployRadarEditionsFixture() {
  const signers = await ethers.getSigners();

  const Editions = await ethers.getContractFactory("RadarEditions");
  const instance = (await upgrades.deployProxy(
    Editions
  )) as unknown as RadarEditions;
  await instance.waitForDeployment();

  return { instance, signers };
}
