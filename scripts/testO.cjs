require("dotenv/config");
import { SuiAgentKit, get_holding } from '@getnimbus/sui-agent-kit';

const agent = new SuiAgentKit(
    process.env.SUI_PRIVATE_KEY,
    process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io:443",
    process.env.AI_API_KEY
);

const assets = await get_holding(agent);

console.log('Wallets assets:', assets);