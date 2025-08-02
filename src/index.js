// Basic chatbot setup using OpenAI's API with no memory


import OpenAI from "openai";

const openai = new OpenAI();

console.log("Welcome to the chatbot! Type 'exit' to quit.");

// Listen for user input from the terminal
process.stdin.addListener("data", async (input) => {
  console.log("You: %s", input.toString());
  if (input.toString().trim() === "exit") {
    process.exit();
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: input.toString() },
    ],
  });
  console.log("Assistant: %s", response.choices[0].message.content);
});
