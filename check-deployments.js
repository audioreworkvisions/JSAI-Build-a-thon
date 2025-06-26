import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2025-01-01-preview";

console.log("Testing Azure OpenAI connection...");
console.log("Endpoint:", endpoint);
console.log("API Version:", apiVersion);

// Häufige Deployment-Namen zum Testen
const commonDeployments = [
    "gpt-4o",
    "gpt-4o-mini", 
    "gpt-4",
    "gpt-35-turbo",
    "gpt-3.5-turbo",
    "text-davinci-003",
    "davinci",
    "curie",
    "babbage",
    "ada"
];

async function testDeployment(deploymentName) {
    try {
        const client = new AzureOpenAI({ 
            endpoint, 
            apiKey, 
            apiVersion, 
            deployment: deploymentName 
        });

        console.log(`\nTesting deployment: ${deploymentName}`);
        
        const result = await client.chat.completions.create({
            messages: [
                { role: "user", content: "Hi" }
            ],
            max_tokens: 10
        });

        console.log(`✅ SUCCESS: Deployment '${deploymentName}' works!`);
        console.log("Response:", result.choices[0].message.content);
        return deploymentName;
    } catch (error) {
        if (error.status === 404) {
            console.log(`❌ Deployment '${deploymentName}' not found`);
        } else {
            console.log(`❌ Error with '${deploymentName}':`, error.message);
        }
        return null;
    }
}

async function findWorkingDeployment() {
    console.log("Searching for working deployments...\n");
    
    for (const deployment of commonDeployments) {
        const result = await testDeployment(deployment);
        if (result) {
            console.log(`\n🎉 Found working deployment: ${result}`);
            console.log(`You can use this deployment name in your ai-foundry.js file.`);
            return;
        }
    }
    
    console.log("\n❌ No working deployments found from common names.");
    console.log("You may need to:");
    console.log("1. Check your Azure OpenAI Studio for the correct deployment name");
    console.log("2. Create a new deployment in Azure OpenAI Studio");
    console.log("3. Verify your endpoint and API key are correct");
}

findWorkingDeployment().catch(console.error);
