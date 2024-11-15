const { expect, assert } = require("chai");
const hre = require("hardhat");
const BigNumber = require("bignumber.js");

describe("GEHRToken", function () {
  it("Create coin", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehr = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehr.waitForDeployment();

    const totalSupply = new BigNumber(100000 * (10 ** 18)).toFixed();
    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterMint = new BigNumber(101000 * (10 ** 18)).toFixed();

    expect(await gehr.owner()).to.equal(owner);

    expect(await gehr.totalSupply()).to.equal(totalSupply);

    expect(await gehr.balanceOf(owner)).to.equal(totalSupply);

    await gehr.mint(a1000coins);
    //console.log(JSON.stringify(ret));
    //expect(await gehr.mint(a1000coins)).to.be.true();
    expect(await gehr.balanceOf(owner)).to.equal(afterMint);
    expect(await gehr.totalSupply()).to.equal(afterMint);
  });
  it("Coin transfer", async function () {

    const [owner, otherAccount] = await hre.ethers.getSigners();
    const gehr = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehr.waitForDeployment();

    const totalSupply = new BigNumber(100000 * (10 ** 18)).toFixed();
    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterTransferSupply = new BigNumber(99000 * (10 ** 18)).toFixed();

    expect(await gehr.totalSupply()).to.equal(totalSupply);
    expect(await gehr.balanceOf(owner)).to.equal(totalSupply);

    await gehr.transfer(otherAccount, a1000coins);
    expect(await gehr.balanceOf(owner)).to.equal(afterTransferSupply);
    expect(await gehr.balanceOf(otherAccount)).to.equal(a1000coins);

    expect(await gehr.totalSupply()).to.equal(totalSupply);
  });
  it("Coins burn", async function () {
    const [owner, otherAccount, anotherAccount] = await hre.ethers.getSigners();
    const gehr = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehr.waitForDeployment();

    const totalSupply = new BigNumber(100000 * (10 ** 18)).toFixed();
    const newTotalSupply = new BigNumber(98000 * (10 ** 18)).toFixed();
    const maxSupply = new BigNumber(300000000 * (10 ** 18)).toFixed();
    const newMaxSupply = new BigNumber(299998000 * (10 ** 18)).toFixed();
    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const a2000coins = new BigNumber(2000 * (10 ** 18)).toFixed();
    const afterTransferSupply = new BigNumber(97000 * (10 ** 18)).toFixed();

    expect(await gehr.totalSupply()).to.equal(totalSupply);
    expect(await gehr.maxSupply()).to.equal(maxSupply);
    expect(await gehr.balanceOf(owner)).to.equal(totalSupply);

    await gehr.transfer(otherAccount, a1000coins);
    await gehr.transfer(anotherAccount, a2000coins);
    expect(await gehr.balanceOf(owner)).to.equal(afterTransferSupply);
    expect(await gehr.balanceOf(otherAccount)).to.equal(a1000coins);
    expect(await gehr.balanceOf(anotherAccount)).to.equal(a2000coins);

    await gehr.burn(otherAccount, a1000coins);
    expect(await gehr.balanceOf(otherAccount)).to.equal(0);
    await gehr.burn(anotherAccount, a1000coins);
    expect(await gehr.balanceOf(anotherAccount)).to.equal(a1000coins);

    expect(await gehr.balanceOf(owner)).to.equal(afterTransferSupply);

    expect(await gehr.totalSupply()).to.equal(newTotalSupply);
    expect(await gehr.maxSupply()).to.equal(newMaxSupply);
  });
});
