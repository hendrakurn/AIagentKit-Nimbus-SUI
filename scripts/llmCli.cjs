require("dotenv/config");
const Groq = require("groq-sdk");
const readline = require("readline");
const { getBalanceText } = require("./balanceFn.cjs");

const groq = new Groq({ apiKey: process.env.AI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function handlePrompt(prompt) {
  if (/saldo|balance/i.test(prompt)) {
    const balance = await getBalanceText();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // atau model Groq lain yang kamu pakai [web:159][web:151]
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten wallet Sui. Jawab singkat dalam bahasa Indonesia dan jelaskan saldo berdasarkan data yang diberikan.",
        },
        {
          role: "user",
          content: `User bertanya: "${prompt}". Data saldo wallet:\n${balance}`,
        },
      ],
    });

    console.log("\nJawaban AI:\n", completion.choices[0].message.content);
  } else {
    console.log("Untuk sekarang aku hanya mengerti pertanyaan tentang saldo.");
  }
}

async function main() {
  rl.question("Tanyakan sesuatu ke AI wallet: ", async (q) => {
    await handlePrompt(q);
    rl.close();
  });
}

main().catch(console.error);
