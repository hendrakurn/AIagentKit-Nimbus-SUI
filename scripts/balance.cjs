// scripts/balance.cjs
require("dotenv/config");
const { SuiAgentKit } = require("@getnimbus/sui-agent-kit");

async function main() {
  const agent = new SuiAgentKit(
    process.env.SUI_PRIVATE_KEY,
    process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443",
    process.env.AI_API_KEY
  );

  
  const assets = await agent.getHoldings();   

  console.log("Wallet assets:", JSON.stringify(assets, null, 2));
}

main().catch(console.error);
