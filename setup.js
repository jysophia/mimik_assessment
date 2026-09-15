import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

console.log("\nWelcome to the mimik Assessment Chatbot setup!\n");

const endpoint = await ask("Enter your mimOE API endpoint: ");
const apiKey = await ask("Enter your API key: ");
const model = await ask("Enter the AI model to use: ");

if (!endpoint || !apiKey || !model) {
  console.error("Error: All fields are required. Please provide the endpoint, API key, and model.");
  rl.close();
  process.exit(1);
}

const env = `VITE_API_BASE_URL=${endpoint}\nVITE_API_KEY=${apiKey}\nVITE_AI_MODEL="${model}"\n`;

fs.writeFileSync(".env", env);

console.log("\n.env file created. Run `npm run dev` to start the app.\n");

rl.close();
