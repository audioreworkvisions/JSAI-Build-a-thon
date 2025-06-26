import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function main() {
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2024-02-01";
  const deployment = "gpt-4o"; // Möglicherweise muss dieser Name angepasst werden

  console.log("Endpoint:", endpoint);
  console.log("API Key:", apiKey ? "***" + apiKey.slice(-4) : "NOT SET");
  console.log("Deployment:", deployment);

  const client = new AzureOpenAI({ 
    endpoint, 
    apiKey, 
    apiVersion, 
    deployment 
  });

  try {
    const stream = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "I am going to Paris, what should I see?" }
      ],
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      stream: true
    });

    console.log("\n🎉 Streaming response:\n");
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        process.stdout.write(content);
      }
    }
    
    console.log("\n\n✅ Stream completed successfully!");
    
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    
    if (error.status === 404) {
      console.log("\n💡 Das Deployment 'gpt-4o' wurde nicht gefunden.");
      console.log("Mögliche Lösungen:");
      console.log("1. Überprüfen Sie den Deployment-Namen in Azure OpenAI Studio");
      console.log("2. Erstellen Sie ein neues Deployment falls noch keines existiert");
      console.log("3. Verwenden Sie einen anderen Deployment-Namen wie 'gpt-35-turbo' oder 'gpt-4'");
    } else if (error.status === 401) {
      console.log("\n💡 Authentifizierungsfehler (401)");
      console.log("Mögliche Lösungen:");
      console.log("1. Überprüfen Sie Ihren API-Schlüssel");
      console.log("2. Überprüfen Sie den Endpoint");
      console.log("3. Stellen Sie sicher, dass das Deployment existiert");
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
