// Basic chatbot setup using OpenAI's API with no memory

import OpenAI from "openai";

const openai = new OpenAI();

const context = [];
context.push({ role: "system", content: "You are a helpful assistant." });

console.log("Welcome to the chatbot! Type 'exit' to quit.");

// Listen for user input from the terminal
process.stdin.addListener("data", async (input) => {
  console.log("You: %s", input.toString());
  if (input.toString().trim() === "exit") {
    process.exit();
  }

  context.push({ role: "user", content: input.toString() });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: context
  });

  context.push({ role: "assistant", content: response.choices[0].message.content });
  console.log("Assistant: %s", response.choices[0].message.content);
});
