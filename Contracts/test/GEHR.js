const { expect, assert } = require("chai");
const hre = require("hardhat");
const BigNumber = require("bignumber.js");

describe("GEHR", function () {
  it("Mint", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 0, 0);

    expect(await gehr.totalSupply()).to.equal(1);
    expect(await gehrToken.balanceOf(owner)).to.equal(afterSpendCoins);

  });
  it("patientByAddress", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);
    expect(await gehrToken.balanceOf(owner)).to.equal(afterSpendCoins);

    let patient = await gehr.patientByAddress(owner);

    expect(patient.name).to.equal("Patient 1");
    expect(patient.email).to.equal("patient1@testdomain.com");
    expect(patient.birthday).to.equal(123);
    expect(patient.tags).to.equal(456);
  });
  it("change", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);
    expect(await gehrToken.balanceOf(owner)).to.equal(afterSpendCoins);

    await gehr.change(owner, "Patient 2", "patient2@testdomain.com", 789, 1234);

    let patient = await gehr.patientByAddress(owner);

    expect(patient.name).to.equal("Patient 2");
    expect(patient.email).to.equal("patient2@testdomain.com");
    expect(patient.birthday).to.equal(789);
    expect(patient.tags).to.equal(1234);

  });
  it("burn", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);
    expect(await gehrToken.balanceOf(owner)).to.equal(afterSpendCoins);

    await gehr.burn();

    expect(await gehr.totalSupply()).to.equal(0);

  });
  it("patientOfOperatorByIndex", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    expect(await gehr.getOperatorBalance()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);
    await gehr.connect(otherAccount).mint("Patient 2", "patient2@testdomain.com", 789, 123);

    expect(await gehr.totalSupply()).to.equal(2);

    expect(await gehr.getOperatorBalance()).to.equal(1);
    expect(await gehr.connect(otherAccount).getOperatorBalance()).to.equal(1);

    //await gehr.approveOperator(owner);
    await gehr.connect(otherAccount).approveOperator(owner);

    expect(await gehr.getOperatorBalance()).to.equal(2);
    
    let patient1 = await gehr.patientOfOperatorByIndex(0);

    expect(patient1.name).to.equal("Patient 1");
    expect(patient1.email).to.equal("patient1@testdomain.com");
    expect(patient1.birthday).to.equal(123);
    expect(patient1.tags).to.equal(456);

    let patient2 = await gehr.patientOfOperatorByIndex(1);

    expect(patient2.name).to.equal("Patient 2");
    expect(patient2.email).to.equal("patient2@testdomain.com");
    expect(patient2.birthday).to.equal(789);
    expect(patient2.tags).to.equal(123);
  });
  it("addRecord", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();
    const afterSpendCoins = new BigNumber(99999 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);

    expect(await gehr.getRecordOperatorBalance()).to.equal(0);

    await gehr.addRecord(owner, 1, 1, "Dr. Richard", "This is a new annotation!");

    expect(await gehr.getRecordOperatorBalance()).to.equal(1);
  });
  it("recordPatientByIndex", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);

    expect(await gehr.getRecordPatientBalance(owner)).to.equal(0);

    await gehr.addRecord(owner, 1, 1, "Dr. Richard", "This is a new annotation!");

    expect(await gehr.getRecordPatientBalance(owner)).to.equal(1);

    let record = await gehr.recordPatientByIndex(owner, 0);

    expect(record.tokenId).to.equal(1);
    expect(record.recordType).to.equal(1);
    expect(record.operatorAddr).to.equal(owner);
    expect(record.operatorInfo).to.equal("Dr. Richard");
    expect(record.agendaAt).to.equal(1);
    expect(record.data).to.equal("This is a new annotation!");
  });
  it("recordOperatorByIndex", async function () {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const gehrToken = await hre.ethers.deployContract("GEHRToken", [], {});
    await gehrToken.waitForDeployment();
    const gehr = await hre.ethers.deployContract("GEHR", [], {});
    await gehr.waitForDeployment();
    await gehrToken.setBurnContract(await gehr.getAddress());
    await gehr.setErc20Contract(await gehrToken.getAddress());

    expect(await gehr.owner()).to.equal(owner);
    expect(await gehrToken.burnContract()).to.equal(await gehr.getAddress());
    expect(await gehr.erc20Contract()).to.equal(await gehrToken.getAddress());

    const a1000coins = new BigNumber(1000 * (10 ** 18)).toFixed();

    await gehrToken.mint(a1000coins);
    await gehrToken.transfer(otherAccount, a1000coins);

    expect(await gehr.totalSupply()).to.equal(0);

    await gehr.mint("Patient 1", "patient1@testdomain.com", 123, 456);

    expect(await gehr.totalSupply()).to.equal(1);

    expect(await gehr.getRecordOperatorBalance()).to.equal(0);

    await gehr.addRecord(owner, 1, 1, "Dr. Richard", "This is a new annotation!");

    expect(await gehr.getRecordOperatorBalance()).to.equal(1);

    let record = await gehr.recordOperatorByIndex(0);

    expect(record.tokenId).to.equal(1);
    expect(record.recordType).to.equal(1);
    expect(record.operatorAddr).to.equal(owner);
    expect(record.operatorInfo).to.equal("Dr. Richard");
    expect(record.agendaAt).to.equal(1);
    expect(record.data).to.equal("This is a new annotation!");
  });
});
