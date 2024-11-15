const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("GEHRTokenMod", (m) => {
  const token = m.contract("GEHRToken");

  return { token };
});

module.exports = TokenModule;