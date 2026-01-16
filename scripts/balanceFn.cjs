// scripts/balanceFn.cjs
require("dotenv/config");
const { SuiAgentKit } = require("@getnimbus/sui-agent-kit");

async function getBalanceText() {
  const agent = new SuiAgentKit(
    process.env.SUI_PRIVATE_KEY,
    process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443",
    process.env.AI_API_KEY // boleh diisi apa saja, Nimbus tidak akan dipakai LLM-nya di sini
  );

  const assets = await agent.getHoldings(); // ini sudah terbukti jalan di balance.cjs

  if (!assets.length) return "Wallet kamu tidak punya aset di jaringan ini.";

  return assets
    .map(
      (a) =>
        `${a.symbol} (${a.address}) : ${a.balance} (decimals ${a.decimals})`
    )
    .join("\n");
}

module.exports = { getBalanceText };
