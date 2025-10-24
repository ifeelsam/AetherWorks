// Mock ABI for campaign and escrow contracts
export const CAMPAIGN_CONTRACT_ABI = [
  {
    name: "publishCampaign",
    type: "function",
    inputs: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "budgetPerCreator", type: "uint256" },
      { name: "creatorsNeeded", type: "uint256" },
      { name: "metadataURI", type: "string" },
    ],
    outputs: [{ name: "campaignId", type: "uint256" }],
  },
  {
    name: "getCampaign",
    type: "function",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [
      { name: "title", type: "string" },
      { name: "creator", type: "address" },
      { name: "budget", type: "uint256" },
      { name: "status", type: "uint8" },
    ],
  },
]

export const ESCROW_CONTRACT_ABI = [
  {
    name: "depositFunds",
    type: "function",
    inputs: [
      { name: "campaignId", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "token", type: "address" },
    ],
    outputs: [],
  },
  {
    name: "releaseFunds",
    type: "function",
    inputs: [
      { name: "campaignId", type: "uint256" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "getEscrowBalance",
    type: "function",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
]

// Token addresses on BASE
export const TOKEN_ADDRESSES = {
  USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  USDT: "0xfde4C96c8593536E31F26A3d5cac40ff63546477",
  SOL: "0x2e8f70dbf5e223715d0974e3e0c1247888d860f7", // Wrapped SOL on BASE
}

// Contract addresses on BASE (example addresses)
export const CONTRACT_ADDRESSES = {
  CAMPAIGN: "0x1234567890123456789012345678901234567890",
  ESCROW: "0x0987654321098765432109876543210987654321",
}
