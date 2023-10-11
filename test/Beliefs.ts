import { expect } from "chai";
import { deployRadarEditionsFixture } from "./fixtures";
import { ethers } from "hardhat";

describe("Beliefs", () => {
  const protocolFee = 1;
  const maximumEditionFee = 2;
  const fee = 2;
  const id = "some-id";
  const briefId = "some-brief-id";

  it("should believe successfully for project with no other projects in same pool", async function () {
    const tags = "some-tags,some-other-tags";
    const futureFundFee = 2;

    const { signers, instance } = await deployRadarEditionsFixture();
    const owner = signers[0];

    await instance.setProtocolFee(protocolFee);
    await instance.setMaximumEditionFee(maximumEditionFee);
    await instance.setFutureFundFee(futureFundFee);
    await instance.createEdition(fee, owner, owner, id, briefId);
    await instance.approveEdition(0);

    await instance.believeProject(0, tags, {
      value: futureFundFee,
    });

    const contractBalance = await ethers.provider.getBalance(
      await instance.getAddress()
    );
    expect(contractBalance).to.equal(futureFundFee);

    const edition = await instance.editions(0);
    expect(edition[2]).to.equal(futureFundFee / 2);

    const beliefs = await instance.getUserBeliefs(owner);
    expect(beliefs.length).to.equal(1);
    expect(beliefs[0]).to.be.true;
  });

  it("should believe successfully for project with other projects in same pool", async function () {
    const tags = "some-tags,some-other-tags";
    const futureFundFee = 100;
    const projectCount = 5;
    const believeProjectId = 2;

    const { signers, instance } = await deployRadarEditionsFixture();
    const owner = signers[0];

    await instance.setProtocolFee(protocolFee);
    await instance.setFutureFundFee(futureFundFee);
    await instance.setMaximumEditionFee(maximumEditionFee);

    for (let i = 0; i < projectCount; i++) {
      await instance.createEdition(fee, signers[i], signers[i], id, briefId);
      await instance.approveEdition(i);
    }

    expect(await instance.editionCounter()).to.equal(projectCount);

    await instance.believeProject(believeProjectId, tags, {
      value: futureFundFee,
    });

    const contractBalance = await ethers.provider.getBalance(
      await instance.getAddress()
    );
    expect(contractBalance).to.equal(futureFundFee);

    for (let i = 0; i < projectCount; i++) {
      const edition = await instance.editions(i);
      const balance = await instance.balances(signers[i]);
      if (i === believeProjectId) {
        expect(edition[2]).to.equal(futureFundFee / 2);
        expect(balance).to.equal(0);
      } else {
        const amount = futureFundFee / 5 / (projectCount - 1);
        expect(edition[2]).to.equal(0);
        expect(balance).to.equal(amount);
      }
    }

    const beliefs = await instance.getUserBeliefs(owner);

    expect(beliefs.length).to.equal(5);
    expect(beliefs[believeProjectId]).to.be.true;
  });

  it("should believe successfully for project with other projects in same pool", async function () {
    const tags = "some-tags,some-other-tags";
    const futureFundFee = 100;
    const projectCount = 5;
    const believeProjectId = 2;

    const { signers, instance } = await deployRadarEditionsFixture();
    const owner = signers[0];

    await instance.setProtocolFee(protocolFee);
    await instance.setFutureFundFee(futureFundFee);
    await instance.setMaximumEditionFee(maximumEditionFee);

    for (let i = 0; i < projectCount; i++) {
      await instance.createEdition(fee, signers[i], signers[i], id, briefId);
      await instance.approveEdition(i);
    }

    expect(await instance.editionCounter()).to.equal(projectCount);

    await instance.believeProject(believeProjectId, tags, {
      value: futureFundFee,
    });

    const contractBalance = await ethers.provider.getBalance(
      await instance.getAddress()
    );
    expect(contractBalance).to.equal(futureFundFee);

    for (let i = 0; i < projectCount; i++) {
      const edition = await instance.editions(i);
      const balance = await instance.balances(signers[i]);
      if (i === believeProjectId) {
        expect(edition[2]).to.equal(futureFundFee / 2);
        expect(balance).to.equal(0);
      } else {
        const amount = futureFundFee / 5 / (projectCount - 1);
        expect(edition[2]).to.equal(0);
        expect(balance).to.equal(amount);
      }
    }

    const beliefs = await instance.getUserBeliefs(owner);

    expect(beliefs.length).to.equal(5);
    expect(beliefs[believeProjectId]).to.be.true;
  });

  it("should believe successfully for project with other projects in same pool", async function () {
    const tags = "some-tags,some-other-tags";
    const futureFundFee = 100;
    const projectCount = 5;
    const believeProjectId = 2;

    const { signers, instance } = await deployRadarEditionsFixture();

    await instance.setProtocolFee(protocolFee);
    await instance.setFutureFundFee(futureFundFee);
    await instance.setMaximumEditionFee(maximumEditionFee);

    for (let i = 0; i < projectCount; i++) {
      await instance.createEdition(fee, signers[i], signers[i], id, briefId);
      await instance.approveEdition(i);
    }
    await instance.believeProject(believeProjectId, tags, {
      value: futureFundFee,
    });

    const initialBalance = await ethers.provider.getBalance(signers[1]);

    const amount = futureFundFee / 5 / (projectCount - 1);
    const tx = await instance.connect(signers[1]).retrieveBalance(amount);
    const receipt = await tx.wait();
    const gasUsed = (receipt?.gasUsed || 0n) * (receipt?.gasPrice || 0n);

    expect(await ethers.provider.getBalance(signers[1])).to.equal(
      initialBalance - gasUsed + BigInt(amount)
    );
  });
});
