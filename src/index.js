process.stdin.addListener("data", async (input) => {
  console.log("Received input:", input.toString().trim());
});
