# 🔒 Anti-Procrastination Vault

A decentralized application (dApp) built on **IOTA blockchain** that uses behavioral psychology to help you beat procrastination. Stake your IOTA tokens on a commitment - complete your task on time to get your money back, or lose it if you fail!
Contrac address: https://explorer.iota.org/object/0xc0e447054ede5a213d75764fb806bc7464af16e9166484c892526d4a3362bcbf?network=testnet
## 🎯 Overview

This project leverages the **Loss Aversion** principle - humans fear losing money more than they enjoy gaining it. By putting real value at stake, you create powerful motivation to follow through on your commitments.

### Key Features

- 💰 **Stake IOTA tokens** on your commitments
- 👤 **Assign an arbiter** (friend, mentor, colleague) to verify completion
- ⏰ **Set deadlines** for your tasks
- ✅ **Get refunded** when you complete on time
- ❌ **Lose your stake** if you fail (sent to charity or burn address)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- IOTA wallet (with devnet tokens for testing)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Hieuab1308/Anti-Procrastination-Vault.git
cd Anti-Procrastination-Vault

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Deploy Smart Contract (Optional)

If you want to deploy your own instance of the smart contract:

```bash
# Deploy to IOTA devnet
npm run iota-deploy
```

After deployment, update the `PACKAGE_ID` in `lib/config.ts` with your new package ID.

## 📁 Project Structure

```
anti_procrastination/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── AntiProcrastinationVault.tsx   # Main vault component
│   ├── CreateCommitmentForm.tsx       # Form to create new commitment
│   ├── CommitmentCard.tsx             # Display commitment details
│   ├── ActionButtons.tsx              # Arbiter action buttons
│   ├── LoadCommitmentForm.tsx         # Load existing commitment
│   ├── Provider.tsx                   # IOTA providers wrapper
│   └── Wallet-connect.tsx             # Wallet connection button
│
├── hooks/
│   └── useAntiProcrastination.ts      # Custom hook for contract interaction
│
├── lib/
│   └── config.ts                      # Network & contract configuration
│
├── contract/                     # ⭐ SMART CONTRACT
│   └── anti_procrastination/
│       ├── Move.toml                  # Move package manifest
│       └── sources/
│           └── anti_procrastination.move  # ⭐ Main smart contract code
│
└── scripts/                      # Deployment scripts
    ├── iota-deploy-wrapper.js
    └── iota-generate-prompt-wrapper.js
```

## 📜 Smart Contract

**Location:** `contract/anti_procrastination/sources/anti_procrastination.move`

The smart contract is written in **Move language** and deployed on IOTA blockchain.

### Contract Functions

| Function | Description | Who can call |
|----------|-------------|--------------|
| `create_commitment` | Create a new commitment with stake | Anyone |
| `confirm_completed` | Mark task as completed, refund stake | Arbiter only |
| `confirm_failed` | Mark task as failed, send stake to penalty recipient | Arbiter only |
| `claim_expired` | Claim expired commitment after deadline | Anyone |

### Contract Parameters

When creating a commitment:
- **stake**: Amount of IOTA to lock (in MIST, 1 IOTA = 1,000,000,000 MIST)
- **arbiter**: Wallet address of the person who will verify completion
- **penalty_recipient**: Address to receive stake if task fails
- **description**: Description of your commitment
- **deadline**: Unix timestamp (milliseconds) when commitment expires

### Deployed Contract

- **Network:** IOTA Testnet
- **Package ID:** `0x531b1a0cffce328dccb78192539a8f82c5eeb650051a3860c045ffffbf135925`

## 🔄 How It Works

```
┌─────────────────┐
│  1. CREATE      │  User stakes IOTA + sets arbiter + deadline
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. DO WORK     │  User completes their task
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. VERIFY      │  Arbiter checks if task is done
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│SUCCESS│ │FAILED │
│Refund │ │Penalty│
└───────┘ └───────┘
```

## 🛠 Tech Stack

- **Blockchain:** IOTA (Move-based)
- **Frontend:** Next.js 15, React 19, TypeScript
- **Wallet:** @iota/dapp-kit
- **UI:** Radix UI, Tailwind CSS
- **Smart Contract:** Move Language

## 📚 Resources

- [IOTA Documentation](https://wiki.iota.org/)
- [IOTA dApp Kit](https://docs.iota.org/ts-sdk/dapp-kit)
- [Move Language Book](https://move-language.github.io/move/)

## 📧 Contact

- **Email:** 22010104@st.phenikaa-uni.edu.vn
- **GitHub:** [@Hieuab1308](https://github.com/Hieuab1308)

## 📄 License

MIT License - feel free to use this project for learning and development!
