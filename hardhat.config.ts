import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter"

import { config } from "dotenv";

config();

const accounts =
  process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length > 0
    ? [process.env.PRIVATE_KEY]
    : {
        mnemonic: "test test test test test test test test test test test junk",
        count: 10,
        path: "m/44'/60'/0'/0",
      };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  paths: {
    sources: "./src",
    tests: "./test",
  },
  networks: {
    "optimism-goerli": {
      url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts,
      gas: 1000000,
      gasPrice: 2000000000,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      optimisticEthereum: process.env.ETHERSCAN_API_KEY,
      optimisticGoerli: process.env.ETHERSCAN_API_KEY,
    },
  },
};
