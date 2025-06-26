# Azure OpenAI Fehlerbehebung

## Das Problem
Sie erhalten 401-Authentifizierungsfehler, was bedeutet, dass entweder:
- Der API-Schlüssel falsch ist
- Der Endpoint nicht korrekt ist
- Die Azure-Ressource nicht richtig konfiguriert ist

## Lösung: Schritt-für-Schritt-Anleitung

### 1. Azure Portal überprüfen
1. Gehen Sie zu https://portal.azure.com
2. Suchen Sie nach "m2022artist-ai-foundry-resource"
3. Klicken Sie auf die Ressource

### 2. API-Schlüssel überprüfen
1. In der Azure-Ressource, klicken Sie auf "Keys and Endpoint" (Schlüssel und Endpunkt)
2. Kopieren Sie "Key 1" oder "Key 2" 
3. Aktualisieren Sie Ihre .env Datei mit dem korrekten Schlüssel

### 3. Endpoint überprüfen
1. Im selben "Keys and Endpoint" Bereich finden Sie den Endpoint
2. Er sollte etwa so aussehen: `https://[name].openai.azure.com/`
3. Aktualisieren Sie Ihre .env Datei

### 4. Deployment erstellen (falls noch nicht vorhanden)
1. Klicken Sie auf "Go to Azure OpenAI Studio" oder "Model deployments"
2. Klicken Sie auf "Create new deployment"
3. Wählen Sie ein Modell (z.B. gpt-4o-mini oder gpt-35-turbo)
4. Geben Sie einen Namen ein (z.B. "gpt-4o-mini")
5. Klicken Sie auf "Create"

### 5. Code anpassen
Aktualisieren Sie Ihre .env Datei mit den korrekten Werten:

```
AZURE_OPENAI_API_KEY=[Ihr korrekter API-Schlüssel]
AZURE_OPENAI_ENDPOINT=[Ihr korrekter Endpoint]
```

Und das ai-foundry.js mit dem korrekten Deployment-Namen.

## Häufige Probleme
- **Ressourcentyp**: Stellen Sie sicher, dass es eine "Azure OpenAI" Ressource ist, nicht nur "Cognitive Services"
- **Region**: Manche Modelle sind nur in bestimmten Regionen verfügbar
- **Berechtigungen**: Stellen Sie sicher, dass Sie Zugriff auf die Ressource haben

Führen Sie nach der Korrektur erneut `node ai-foundry.js` aus.
