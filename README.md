# SPV User Workshop

SPV User Workshop is a **Next.js** template repository for building applications with **SPV Wallet** integration. This repo provides a simple and efficient setup for managing user wallets and interacting with **xPub keys**.

## 🚀 Features
- **Next.js 13+ (App Router Support)**
- **SPV Wallet Integration**
- **xPub Key Generation**
- **Client-Side Routing**
- **Minimal Setup with `npm install`**

## 🛠️ Installation
To get started, clone this repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/timechainlabs/spv-user-workshop.git

# Navigate to the project directory
cd spv-user-workshop

# Install dependencies
npm install
```

## 🔑 Generate xPub Key
To generate an xPub key, run:
```sh
npm run generate-keys
```
This will create a new **xPub key** using a randomly generated mnemonic phrase.

## 🎨 Run the Frontend Application
To start the Next.js development server, use:
```sh
npm run dev
```
The application will be available at **http://localhost:3000/**.

## 📂 Project Structure

```
spv-user-workshop/
│-- public/               # Static assets (e.g., images, fonts)
│-- src/
│   ├── app/              # Application routes and pages
│   ├── components/       # Reusable UI components
│   ├── styles/           # Global and component-specific styles
│   └── utils/            # Utility functions and helpers
│-- .env                  # Environment variables
│-- .gitignore            # Git ignore rules
│-- generate-keys.ts      # Script for generating xPub keys
│-- next.config.ts        # Next.js configuration
│-- package-lock.json     # Lockfile for npm dependencies
│-- package.json          # Project dependencies and scripts
│-- postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📖 Further Implementation
For additional functionality and best practices, refer to the **examples** folder of the **SPV-wallet-js-client** repository:
🔗 [SPV Wallet JS Client - Examples](https://github.com/bitcoin-sv/spv-wallet-js-client/tree/main/examples)

For detailed SPV wallet documentation, visit:
📖 [SPV Wallet Documentation](https://docs.bsvblockchain.org/network-topology/applications/spv-wallet)

## 🤝 Contributing
Feel free to fork the repo and submit a pull request with improvements! Contributions are welcome.

## 📜 License
This project is licensed under the **MIT License**.

---
Happy coding! 🚀
