import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// Test mit verschiedenen Endpoint-Formaten
const endpoints = [
  "https://m2022artist-ai-foundry-resource.cognitiveservices.azure.com/",
  "https://m2022artist-ai-foundry-resource.openai.azure.com/",
  "https://m2022artist-ai-foundry-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o",
];

const deployments = ["gpt-4o", "gpt-35-turbo", "gpt-4", "gpt-4o-mini"];

export async function main() {
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2024-02-01";

  console.log("API Key:", apiKey ? "***" + apiKey.slice(-4) : "NOT SET");
  
  for (const endpoint of endpoints) {
    console.log(`\n🔍 Testing endpoint: ${endpoint}`);
    
    for (const deployment of deployments) {
      console.log(`  Testing deployment: ${deployment}`);
      
      try {
        const client = new AzureOpenAI({ 
          endpoint, 
          apiKey, 
          apiVersion, 
          deployment 
        });

        const result = await client.chat.completions.create({
          messages: [
            { role: "user", content: "Hi" }
          ],
          max_tokens: 10
        });

        console.log(`  ✅ SUCCESS: ${endpoint} + ${deployment} works!`);
        console.log(`  Response: ${result.choices[0].message.content}`);
        return { endpoint, deployment };
        
      } catch (error) {
        console.log(`  ❌ ${error.status || 'Error'}: ${error.message?.substring(0, 60)}...`);
      }
    }
  }
  
  console.log("\n❌ No working combination found.");
  console.log("You may need to:");
  console.log("1. Verify your API key in Azure Portal");
  console.log("2. Check the correct resource endpoint");
  console.log("3. Create a deployment in Azure OpenAI Studio");
}

main().catch(console.error);
