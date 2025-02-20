# NFT Marketplace

A decentralized NFT marketplace built with Solidity, enabling users to create, buy, and sell NFTs on the Ethereum blockchain.

## 🚀 Features

- NFT creation (ERC721 standard)
- List NFTs for sale
- Purchase NFTs
- Withdraw NFTs from sale
- ETH transaction support
- Deployment on Sepolia testnet

## 🛠 Technology Stack

- Solidity ^0.8.0
- Truffle v5.11.5
- Node.js v20.11.0
- Web3.js v1.10.0
- OpenZeppelin Contracts
- React.js (Frontend)

## 📋 Prerequisites

- Node.js
- Truffle Suite
- MetaMask Wallet
- Git

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/YourUsername/nft-marketplace.git
cd nft-marketplace
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure `.env` with your values
```
INFURA_PROJECT_ID=your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_key
MNEMONIC=your_wallet_mnemonic
```

## 🚀 Deployment

### Local Deployment

1. Start local blockchain
```bash
truffle develop
```

2. Migrate contracts
```bash
truffle migrate
```

### Testnet Deployment (Sepolia)

```bash
truffle migrate --network sepolia
```

## 🧪 Running Tests

```bash
truffle test
```

## 📜 Smart Contracts

### NFT Contract
- ERC721 implementation
- Minting functionality
- Token URI management

### Marketplace Contract
- NFT listing functionality
- Buy/Sell operations
- Fee handling

## 🌐 Deployed Contracts (Sepolia Testnet)

- NFT Contract: `0x...`
- Marketplace Contract: `0x...`

## 📝 License

This project is licensed under the MIT License.

## 👥 Author

Carine Hohmann
- GitHub: [@CarineHoh](https://github.com/CarineHoh)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

## 📝 Notes

- This project is for educational purposes and should be thoroughly tested before production use
- Ensure you have sufficient testnet ETH
- Keep your private keys secure

## 🔍 Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure you're on the correct network
   - Verify the chain ID

2. **Deployment Errors**
   - Check your .env configuration
   - Ensure you have enough ETH


## 🛣 Project Structure

```
nft-marketplace/
├── contracts/
│   ├── NFT.sol
│   └── Marketplace.sol
├── migrations/
│   ├── 1_initial_migration.js
│   ├── 2_deploy_nft.js
│   └── 3_deploy_marketplace.js
├── test/
│   ├── NFT.test.js
│   └── Marketplace.test.js
├── truffle-config.js
├── package.json
└── README.md
```

## 🔄 Smart Contract Workflow

1. User mints NFT
2. Owner lists NFT for sale
3. Buyer purchases NFT
4. Contract handles transfer and payment

## 🔐 Security Considerations

- Reentrancy protection
- Access control implementation
- Secure fund handling
- Input validation

## 🎯 Future Improvements

- [ ] Batch minting functionality
- [ ] Royalty system implementation
- [ ] Advanced search features
- [ ] Mobile app integration
