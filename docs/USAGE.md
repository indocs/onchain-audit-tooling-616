# On-Chain Audit Tooling - Quick Start

This document provides a quick guide to deploying and using the On-Chain Audit Tooling project.

Prerequisites
- Node.js (>= 18)
- yarn or npm
- Hardhat project dependencies installed: npm install

1) Compile
- Run: npm run compile

2) Deploy
- Update deployment config if needed (networks, addresses).
- Run: npm run deploy
- The script will deploy the AuditTool contract to the configured network.

3) Tests
- Run: npm test
- The test suite uses Hardhat and Mocha/Chai for assertions.

4) Interacting with the contract
- You can interact with the deployed contract using the Hardhat console or scripts in scripts/
- Ensure you reference the correct network and deployed address.

Notes
- This repository focuses on incremental DX improvements and safe Solidity/Hardhat patterns. If you need to extend access control or add new features, consider adding tests and small, well-scoped changes to existing contracts.
