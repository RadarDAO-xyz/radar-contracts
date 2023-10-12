/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  RadarVideoNFT,
  RadarVideoNFTInterface,
} from "../../src/RadarVideoNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805161243f6200011960003960008181610692015281816106d20152818161078c015281816107cc015261085b015261243f6000f3fe6080604052600436106101405760003560e01c80636352211e116100b6578063a22cb4651161006f578063a22cb46514610369578063b88d4fde14610389578063c87b56dd146103a9578063d0def521146103c9578063e985e9c5146103e9578063f2fde38b1461043257600080fd5b80636352211e146102cc57806370a08231146102ec578063715018a61461030c5780638129fc1c146103215780638da5cb5b1461033657806395d89b411461035457600080fd5b8063162094c411610108578063162094c41461021657806323b872dd146102365780633659cfe61461025657806342842e0e146102765780634f1ef2861461029657806352d1902d146102a957600080fd5b806301ffc9a71461014557806306fdde031461017a578063081812fc1461019c578063095ea7b3146101d45780630e89341c146101f6575b600080fd5b34801561015157600080fd5b50610165610160366004611c8d565b610452565b60405190151581526020015b60405180910390f35b34801561018657600080fd5b5061018f610463565b6040516101719190611cfa565b3480156101a857600080fd5b506101bc6101b7366004611d0d565b6104f5565b6040516001600160a01b039091168152602001610171565b3480156101e057600080fd5b506101f46101ef366004611d42565b61051c565b005b34801561020257600080fd5b5061018f610211366004611d0d565b610636565b34801561022257600080fd5b506101f4610231366004611e0f565b610641565b34801561024257600080fd5b506101f4610251366004611e56565b610657565b34801561026257600080fd5b506101f4610271366004611e92565b610688565b34801561028257600080fd5b506101f4610291366004611e56565b610767565b6101f46102a4366004611ead565b610782565b3480156102b557600080fd5b506102be61084e565b604051908152602001610171565b3480156102d857600080fd5b506101bc6102e7366004611d0d565b610901565b3480156102f857600080fd5b506102be610307366004611e92565b610961565b34801561031857600080fd5b506101f46109e7565b34801561032d57600080fd5b506101f46109fb565b34801561034257600080fd5b5060c9546001600160a01b03166101bc565b34801561036057600080fd5b5061018f610b65565b34801561037557600080fd5b506101f4610384366004611ee5565b610b74565b34801561039557600080fd5b506101f46103a4366004611f21565b610b7f565b3480156103b557600080fd5b5061018f6103c4366004611d0d565b610bb7565b3480156103d557600080fd5b506102be6103e4366004611ead565b610bc2565b3480156103f557600080fd5b50610165610404366004611f89565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b34801561043e57600080fd5b506101f461044d366004611e92565b610c4b565b600061045d82610cc1565b92915050565b60606065805461047290611fbc565b80601f016020809104026020016040519081016040528092919081815260200182805461049e90611fbc565b80156104eb5780601f106104c0576101008083540402835291602001916104eb565b820191906000526020600020905b8154815290600101906020018083116104ce57829003601f168201915b5050505050905090565b600061050082610ce6565b506000908152606960205260409020546001600160a01b031690565b600061052782610901565b9050806001600160a01b0316836001600160a01b0316036105995760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105b557506105b58133610404565b6106275760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610590565b6106318383610d45565b505050565b606061045d82610bb7565b610649610db3565b6106538282610e0d565b5050565b6106613382610ed8565b61067d5760405162461bcd60e51b815260040161059090611ff6565b610631838383610f57565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106d05760405162461bcd60e51b815260040161059090612043565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166107196000805160206123c3833981519152546001600160a01b031690565b6001600160a01b03161461073f5760405162461bcd60e51b81526004016105909061208f565b610748816110bb565b60408051600080825260208201909252610764918391906110c3565b50565b61063183838360405180602001604052806000815250610b7f565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036107ca5760405162461bcd60e51b815260040161059090612043565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166108136000805160206123c3833981519152546001600160a01b031690565b6001600160a01b0316146108395760405162461bcd60e51b81526004016105909061208f565b610842826110bb565b610653828260016110c3565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108ee5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610590565b506000805160206123c383398151915290565b6000818152606760205260408120546001600160a01b03168061045d5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610590565b60006001600160a01b0382166109cb5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610590565b506001600160a01b031660009081526068602052604090205490565b6109ef610db3565b6109f9600061122e565b565b600054610100900460ff1615808015610a1b5750600054600160ff909116105b80610a355750303b158015610a35575060005460ff166001145b610a985760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610590565b6000805460ff191660011790558015610abb576000805461ff0019166101001790555b610b056040518060400160405280600b81526020016a5261646172566964656f7360a81b81525060405180604001604052806005815260200164564944454f60d81b815250611280565b610b0d6112b1565b610b156112d8565b610b1d6112b1565b8015610764576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b60606066805461047290611fbc565b610653338383611307565b610b893383610ed8565b610ba55760405162461bcd60e51b815260040161059090611ff6565b610bb1848484846113d5565b50505050565b606061045d82611408565b61015f54600090610bd38482611510565b610bdd8184610e0d565b836001600160a01b0316336001600160a01b03167f415b0b5f279208d6e050585b8549ece14fe3a66a5ad3008951c4bcb1bb62b9b28584604051610c229291906120db565b60405180910390a3600161015f6000828254610c3e91906120fd565b9091555090949350505050565b610c53610db3565b6001600160a01b038116610cb85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610590565b6107648161122e565b60006001600160e01b03198216632483248360e11b148061045d575061045d8261169b565b6000818152606760205260409020546001600160a01b03166107645760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610590565b600081815260696020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610d7a82610901565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60c9546001600160a01b031633146109f95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610590565b6000828152606760205260409020546001600160a01b0316610e885760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610590565b6000828152609760205260409020610ea0828261216c565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b600080610ee483610901565b9050806001600160a01b0316846001600160a01b03161480610f2b57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b80610f4f5750836001600160a01b0316610f44846104f5565b6001600160a01b0316145b949350505050565b826001600160a01b0316610f6a82610901565b6001600160a01b031614610f905760405162461bcd60e51b81526004016105909061222c565b6001600160a01b038216610ff25760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610590565b826001600160a01b031661100582610901565b6001600160a01b03161461102b5760405162461bcd60e51b81526004016105909061222c565b600081815260696020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260688552838620805460001901905590871680865283862080546001019055868652606790945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610764610db3565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156110f657610631836116eb565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611150575060408051601f3d908101601f1916820190925261114d91810190612271565b60015b6111b35760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610590565b6000805160206123c383398151915281146112225760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610590565b50610631838383611787565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff166112a75760405162461bcd60e51b81526004016105909061228a565b61065382826117ac565b600054610100900460ff166109f95760405162461bcd60e51b81526004016105909061228a565b600054610100900460ff166112ff5760405162461bcd60e51b81526004016105909061228a565b6109f96117ec565b816001600160a01b0316836001600160a01b0316036113685760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610590565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6113e0848484610f57565b6113ec8484848461181c565b610bb15760405162461bcd60e51b8152600401610590906122d5565b606061141382610ce6565b6000828152609760205260408120805461142c90611fbc565b80601f016020809104026020016040519081016040528092919081815260200182805461145890611fbc565b80156114a55780601f1061147a576101008083540402835291602001916114a5565b820191906000526020600020905b81548152906001019060200180831161148857829003601f168201915b5050505050905060006114c360408051602081019091526000815290565b905080516000036114d5575092915050565b8151156115075780826040516020016114ef929190612327565b60405160208183030381529060405292505050919050565b610f4f8461191d565b6001600160a01b0382166115665760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610590565b6000818152606760205260409020546001600160a01b0316156115cb5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610590565b6000818152606760205260409020546001600160a01b0316156116305760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610590565b6001600160a01b038216600081815260686020908152604080832080546001019055848352606790915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001600160e01b031982166380ac58cd60e01b14806116cc57506001600160e01b03198216635b5e139f60e01b145b8061045d57506301ffc9a760e01b6001600160e01b031983161461045d565b6001600160a01b0381163b6117585760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610590565b6000805160206123c383398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61179083611991565b60008251118061179d5750805b1561063157610bb183836119d1565b600054610100900460ff166117d35760405162461bcd60e51b81526004016105909061228a565b60656117df838261216c565b506066610631828261216c565b600054610100900460ff166118135760405162461bcd60e51b81526004016105909061228a565b6109f93361122e565b60006001600160a01b0384163b1561191257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611860903390899088908890600401612356565b6020604051808303816000875af192505050801561189b575060408051601f3d908101601f1916820190925261189891810190612389565b60015b6118f8573d8080156118c9576040519150601f19603f3d011682016040523d82523d6000602084013e6118ce565b606091505b5080516000036118f05760405162461bcd60e51b8152600401610590906122d5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610f4f565b506001949350505050565b606061192882610ce6565b600061193f60408051602081019091526000815290565b9050600081511161195f576040518060200160405280600081525061198a565b80611969846119f6565b60405160200161197a929190612327565b6040516020818303038152906040525b9392505050565b61199a816116eb565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606061198a83836040518060600160405280602781526020016123e360279139611a89565b60606000611a0383611b01565b600101905060008167ffffffffffffffff811115611a2357611a23611d6c565b6040519080825280601f01601f191660200182016040528015611a4d576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084611a5757509392505050565b6060600080856001600160a01b031685604051611aa691906123a6565b600060405180830381855af49150503d8060008114611ae1576040519150601f19603f3d011682016040523d82523d6000602084013e611ae6565b606091505b5091509150611af786838387611bd9565b9695505050505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310611b405772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611b6c576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611b8a57662386f26fc10000830492506010015b6305f5e1008310611ba2576305f5e100830492506008015b6127108310611bb657612710830492506004015b60648310611bc8576064830492506002015b600a831061045d5760010192915050565b60608315611c48578251600003611c41576001600160a01b0385163b611c415760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610590565b5081610f4f565b610f4f8383815115611c5d5781518083602001fd5b8060405162461bcd60e51b81526004016105909190611cfa565b6001600160e01b03198116811461076457600080fd5b600060208284031215611c9f57600080fd5b813561198a81611c77565b60005b83811015611cc5578181015183820152602001611cad565b50506000910152565b60008151808452611ce6816020860160208601611caa565b601f01601f19169290920160200192915050565b60208152600061198a6020830184611cce565b600060208284031215611d1f57600080fd5b5035919050565b80356001600160a01b0381168114611d3d57600080fd5b919050565b60008060408385031215611d5557600080fd5b611d5e83611d26565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611d9357600080fd5b813567ffffffffffffffff80821115611dae57611dae611d6c565b604051601f8301601f19908116603f01168101908282118183101715611dd657611dd6611d6c565b81604052838152866020858801011115611def57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215611e2257600080fd5b82359150602083013567ffffffffffffffff811115611e4057600080fd5b611e4c85828601611d82565b9150509250929050565b600080600060608486031215611e6b57600080fd5b611e7484611d26565b9250611e8260208501611d26565b9150604084013590509250925092565b600060208284031215611ea457600080fd5b61198a82611d26565b60008060408385031215611ec057600080fd5b611ec983611d26565b9150602083013567ffffffffffffffff811115611e4057600080fd5b60008060408385031215611ef857600080fd5b611f0183611d26565b915060208301358015158114611f1657600080fd5b809150509250929050565b60008060008060808587031215611f3757600080fd5b611f4085611d26565b9350611f4e60208601611d26565b925060408501359150606085013567ffffffffffffffff811115611f7157600080fd5b611f7d87828801611d82565b91505092959194509250565b60008060408385031215611f9c57600080fd5b611fa583611d26565b9150611fb360208401611d26565b90509250929050565b600181811c90821680611fd057607f821691505b602082108103611ff057634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6040815260006120ee6040830185611cce565b90508260208301529392505050565b8082018082111561045d57634e487b7160e01b600052601160045260246000fd5b601f82111561063157600081815260208120601f850160051c810160208610156121455750805b601f850160051c820191505b8181101561216457828155600101612151565b505050505050565b815167ffffffffffffffff81111561218657612186611d6c565b61219a816121948454611fbc565b8461211e565b602080601f8311600181146121cf57600084156121b75750858301515b600019600386901b1c1916600185901b178555612164565b600085815260208120601f198616915b828110156121fe578886015182559484019460019091019084016121df565b508582101561221c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60006020828403121561228357600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60008351612339818460208801611caa565b83519083019061234d818360208801611caa565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611af790830184611cce565b60006020828403121561239b57600080fd5b815161198a81611c77565b600082516123b8818460208701611caa565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212203a406e84534a9bcd6e942f4a8f17fe13de3e6e4fb363dbcc599eab371d6a08bb64736f6c63430008130033";

type RadarVideoNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RadarVideoNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RadarVideoNFT__factory extends ContractFactory {
  constructor(...args: RadarVideoNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RadarVideoNFT & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RadarVideoNFT__factory {
    return super.connect(runner) as RadarVideoNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RadarVideoNFTInterface {
    return new Interface(_abi) as RadarVideoNFTInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RadarVideoNFT {
    return new Contract(address, _abi, runner) as unknown as RadarVideoNFT;
  }
}
