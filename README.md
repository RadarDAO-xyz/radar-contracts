# Radar Editions Contracts

## Things to note

- Radar Editions will use ERC1155 to represent the projects, where each project has it's own id and balance of tokens
- Each project has the following state
  1. whether the project has been launched
  2. the project mint fee
  3. total balance
- There is also a globally defined max mint fee (called protocol fee), that all project mint fees cannot exceed
- The `RadarVideoNFT` contract is tied to the `RadarEditions` contract, which is used to store the video metadata
  - The ID for each video in `RadarVideoNFT` is tied to the ID of each project in `RadarEditions`

## Test scripts

```sh
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 forge script script/Deploy.s.sol:Deploy --rpc-url https://optimism.publicnode.com
```


## TODO
- [ ] improve struct packing
- [ ] add tests
- [ ] use USDC instead of ETH
- [ ] implement splits
