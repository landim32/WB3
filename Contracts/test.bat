npx hardhat compile
npx hardhat test
npx hardhat deploy scripts/deploy-add.js
npx hardhat ignition deploy ./ignition/modules/GEHRTokenMod.js --network testnet
npx hardhat ignition deploy ./ignition/modules/GEHRMod.js --network testnet
#npx hardhat verify 0xb3b7ab83A2c18e0EFC14de551f7255694E303eCd --network testnet
npx hardhat verify 0xd644303717071f1ca77A50c928a88A3a9517ED96 --network testnet
npx hardhat node --network localhost