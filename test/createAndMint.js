const { expect } = require("chai");

describe("sample test", async function () {
  it("should mint and withdraw successfully", async function () {
    const [owner] = await ethers.getSigners();

    const protocolFee = 10000;
    const maximumEditionFee = 1000000;
    const editionFee = 2;

    // Deploying
    const RadarEditions = await ethers.getContractFactory("RadarEditions");
    const instance = await upgrades.deployProxy(RadarEditions);
    await instance.waitForDeployment();

    // set protocol fee to 0.001 ether
    await instance.setProtocolFee(protocolFee);

    await instance.setMaximumEditionFee(maximumEditionFee);

    await instance.createEdition(editionFee, owner, owner, "some-id");

    await instance.approveEdition(0);

    await instance.mintEdition(
      0,
      1,
      owner,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "id",
      "briefId",
      {
        value: editionFee + protocolFee,
      }
    );

    const edition = await instance.editions(0);

    console.log({ edition });

    console.log(await ethers.provider.getBalance(instance.getAddress()));

    await instance.withdrawFunds(protocolFee);

    console.log(await ethers.provider.getBalance(instance.getAddress()));
  });
});
