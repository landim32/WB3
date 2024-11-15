const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("GEHRMod", (m) => {
  const token = m.contract("GEHR");

  return { token };
});

module.exports = TokenModule;