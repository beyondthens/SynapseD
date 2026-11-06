import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  // API endpoint for SynapseMed AI Assistant Demo
  app.post('/api/ai-consult', async (req, res) => {
    try {
      const { prompt, mode } = req.body;
      
      if (!apiKey) {
        return res.json({
          result: "[Demo Mode] SynapseMed AI Assistant: Patient vitals normal. ICD-10 Code J45.9 (Asthma, unspecified) validated with Discovery Health. Claim probability of approval: 98.4%. Recommended follow-up in 14 days."
        });
      }

      const systemInstruction = mode === 'billing' 
        ? "You are SynapseMed Billing & ICD-10 AI Expert. Given a clinical scenario, provide exact ICD-10 codes, tariff codes, medical aid scheme alignment (Discovery, Bonitas, Momentum), and estimate claim success probability."
        : "You are SynapseMed Clinical AI Scribe. Summarize the doctor's rough notes into a structured SOAP note (Subjective, Objective, Assessment, Plan) with high clinical precision.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt || "Patient presents with persistent cough and fatigue.",
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error('AI Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI response' });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SynapseMed server running on http://localhost:${PORT}`);
  });
}

startServer();
