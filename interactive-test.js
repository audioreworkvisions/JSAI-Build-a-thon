import { AzureOpenAI } from "openai";
import dotenv from "dotenv";
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

export async function main() {
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://martist2022.openai.azure.com/";
  const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<REPLACE_WITH_YOUR_KEY_VALUE_HERE>";
  const apiVersion = "2025-01-01-preview";
  
  console.log("Azure OpenAI Endpoint:", endpoint);
  console.log("\nUm herauszufinden, welche Deployments verfügbar sind:");
  console.log("1. Besuchen Sie https://portal.azure.com");
  console.log("2. Navigieren Sie zu Ihrer Azure OpenAI-Ressource");
  console.log("3. Klicken Sie auf 'Model deployments' oder 'Go to Azure OpenAI Studio'");
  console.log("4. Sehen Sie sich die Liste der Deployments an\n");
  
  const deployment = await question("Bitte geben Sie den Namen Ihres Deployments ein (z.B. gpt-4o, gpt-35-turbo): ");
  
  try {
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

    console.log(`\nVerbinde mit Deployment: ${deployment}...`);
    
    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "Sie sind KI-Assistent und helfen Personen, Informationen zu finden." },
        { role: "user", content: "Hallo" },
      ],
      max_tokens: 150,
      temperature: 1,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("\n✅ Erfolgreich verbunden!");
    console.log("Antwort:", result.choices[0].message.content);
    console.log("\nVollständige Antwort:");
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error("\n❌ Fehler:", error.message);
    if (error.status === 404) {
      console.log("\nDas Deployment wurde nicht gefunden. Mögliche Lösungen:");
      console.log("- Überprüfen Sie den Deployment-Namen in Azure OpenAI Studio");
      console.log("- Erstellen Sie ein neues Deployment falls noch keines existiert");
    }
  }
  
  rl.close();
}

main().catch((err) => {
  console.error("Das Beispiel hat einen Fehler:", err);
  rl.close();
});
