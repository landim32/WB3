require("@nomicfoundation/hardhat-toolbox");

const { privateKey, privateKey2 } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
/*
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
*/
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      mining: {
        mempool: {
          order: "fifo"
        }
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gasPrice: 20000000000,
      accounts: [privateKey, privateKey2]
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gas: 'auto', 
      gasPrice: 'auto',
      accounts: [privateKey]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      //chainId: 56,
      //gas: 21000, //2100000, 
      gas: 'auto', 
      gasPrice: 'auto',
      gasPrice: 5000000000,
      accounts: [privateKey]
    }
  },
  etherscan: {
    //apiKey: "VA5HUYT7BSTKMHN6UWFZ9Y1HYM1GYQ73PI"
    apiKey: "WIZ827GBFMEZS2RA1NUDYBVZ6KX88DV89T"
  },
  solidity: {
  //version: "0.5.16",
  //version: "0.8.9",
  version: "0.8.9",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  sourcify: {
    enabled: true
  }
};