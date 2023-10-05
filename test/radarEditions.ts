import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("RadarEditions", async function () {
  const protocolFee = 10000;
  const maximumEditionFee = 1000000;
  const fee = 2;
  const id = "some-id";
  const briefId = "some-brief-id";

  async function deployRadarEditionsFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const LibBeliefs = await ethers.getContractFactory("LibBeliefs");
    const libBeliefs = await LibBeliefs.deploy();

    const RadarEditions = await ethers.getContractFactory("RadarEditions", {
      libraries: {
        LibBeliefs: await libBeliefs.getAddress(),
      },
    });
    const instance = await upgrades.deployProxy(RadarEditions);
    await instance.waitForDeployment();

    return { instance, owner, addr1, addr2 };
  }

  it("should set protocol and edition fees successfully", async function () {
    const { instance } = await deployRadarEditionsFixture();
    await instance.setProtocolFee(protocolFee);

    await instance.setMaximumEditionFee(maximumEditionFee);

    expect(await instance.protocolFee()).to.equal(protocolFee);
    expect(await instance.maximumEditionFee()).to.equal(maximumEditionFee);
  });

  it("should mint successfully", async function () {
    const mintAmount = 5;
    const { owner, instance } = await deployRadarEditionsFixture();

    await instance.setProtocolFee(protocolFee);
    await instance.setMaximumEditionFee(maximumEditionFee);
    await instance.createEdition(fee, owner, owner, id, briefId);
    await instance.approveEdition(0);
    await instance.mintEdition(
      0,
      mintAmount,
      owner,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      {
        value: (fee + protocolFee) * mintAmount,
      }
    );

    const [_status, _fee, _balance, _owner, _id, _briefId] =
      await instance.editions(0);
    expect(_status).to.equal(2);
    expect(_fee).to.equal(fee);
    expect(_balance).to.equal(fee * mintAmount);
    expect(_owner).to.equal(await owner.getAddress());
    expect(_id).to.equal(id);
    expect(_briefId).to.equal(briefId);

    const contractBalance = await ethers.provider.getBalance(
      instance.getAddress()
    );
    expect(contractBalance).to.equal((fee + protocolFee) * mintAmount);
  });
});
