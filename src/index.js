import OpenAI from "openai";
import chalk from "chalk";
import readline from "node:readline/promises";
// import { stdin as input, stdout as output } from "node:process";

const openai = new OpenAI();

const input = process.stdin;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.blue("You: "),
});

const context = [{ role: "system", content: "You are a helpful assistant." }];

console.log(chalk.green("Welcome to the chatbot! Type 'exit' to quit."));
rl.prompt();

rl.on("line", async (userInput) => {
  const userText = userInput.trim();
  if (userText.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }

  context.push({ role: "user", content: userText });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or your preferred model
    messages: context,
  });

  const assistantMsg = response.choices[0].message.content;
  context.push({ role: "assistant", content: assistantMsg });

  console.log(chalk.yellowBright(`Assistant: `),assistantMsg);


  if (context.length > 3) {
    context.splice(1,2)
  }
  
  rl.prompt();
});



