import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "EternIA Server" });
});

// API to generate personalized song lyrics, narrative scripts, and storyboard visual prompts
app.post("/api/generate-story-script", async (req, res) => {
  try {
    const {
      category,
      recipientName,
      senderName,
      relationship,
      keyMoments,
      musicStyle,
      emotionalTone,
      specialPhrases,
    } = req.body;

    if (!recipientName || !keyMoments) {
      return res.status(400).json({ success: false, error: "Datos incompletos para generar la historia." });
    }

    // Context Economy (Regla 7): Limitar la longitud máxima de recuerdos
    const safeKeyMoments = keyMoments.substring(0, 1500);


    const ai = getGeminiClient();

    if (!ai) {
      // High-quality fallback if no API key is set yet
      return res.json({
        success: true,
        data: {
          title: `EternIA: Para ${recipientName || "un alma especial"} — ${category || "Recuerdos"}`,
          styleDescription: `Composición en ${musicStyle || "Balada Orquestal"} con tono ${emotionalTone || "Profundamente Emotivo"}. Cuerdas cálidas, piano íntimo y crescendo cinematográfico.`,
          lyrics: {
            verse1: `En cada paso que dimos juntos, el tiempo pareció detenerse.\n${safeKeyMoments || "Aquellas miradas que guardan mil promesas no se desvanecen jamás."}\nGuardo tu risa como el tesoro más puro del alma.`,
            chorus: `Porque hay momentos que merecen vivir para siempre,\nhistorias que el universo no puede apagar.\n${recipientName ? recipientName + ", eres" : "Eres"} la luz que ilumina este viaje,\nun lazo eterno que nada podrá quebrar.`,
            verse2: `Las huellas del camino se vuelven canciones,\ny en cada nota resuena tu voz con ternura.\n${specialPhrases || "Lo que construimos con amor perdura en el infinito."}`,
            bridge: `Ni los años ni la distancia cambiarán lo que fuimos y seremos.\nEste homenaje es nuestro eco en la eternidad.`,
            outro: `Para siempre en nuestro corazón. EternIA.`
          },
          storyboard: [
            {
              sceneNumber: 1,
              timecode: "00:00 - 00:15",
              visualPrompt: "Plano detalle de fotografías antiguas flotando suavemente en luz dorada cinematográfica, transición suave a primeros recuerdos.",
              voiceover: "Toda gran historia comienza con un instante que lo cambia todo...",
              musicalCues: "Apertura suave de piano acústico y sutil atmósfera ambiental de cuerdas."
            },
            {
              sceneNumber: 2,
              timecode: "00:15 - 00:45",
              visualPrompt: "Montaje emotivo de sonrisas genuinas, abrazos y momentos clave compartidos.",
              voiceover: `Con ${recipientName}, cada día se convirtió en un capítulo imborrable.`,
              musicalCues: "Entrada de chelo cálido y ritmo suave de percusión orgánica."
            },
            {
              sceneNumber: 3,
              timecode: "00:45 - 01:20",
              visualPrompt: "Crescendo visual con transiciones luminosas de partículas doradas y tomas en perspectiva 3D de alta definición.",
              voiceover: "Porque hay lazos que trascienden el tiempo.",
              musicalCues: "Crescendo orquestal con coro etéreo y violines en alta intensidad emotiva."
            },
            {
              sceneNumber: 4,
              timecode: "01:20 - 01:45",
              visualPrompt: "Cierre elegante con el monograma de EternIA y dedicatoria personalizada inscrita en tipografía de orfebrería.",
              voiceover: `Con todo mi amor, ${senderName || "tu familia"}. Por siempre y para siempre.`,
              musicalCues: "Resolución armónica en piano solista y acorde sostenido en paz."
            }
          ],
          creativeAdvice: "Recomendamos enviar de 8 a 15 fotos en alta resolución y un breve audio de voz para incluir en la introducción del video."
        }
      });
    }

    const prompt = `Eres el Director Creativo y Maestro Compositor de "EternIA — Momentos que merecen vivir para siempre".
Tu misión es transformar los recuerdos de un cliente en una obra de arte inolvidable: una canción personalizada y un guion cinematográfico para video.

DATOS DEL CLIENTE:
- Categoría EternIA: ${category || "Recuerdos"} (Ej: Bodas, Celebraciones, Bautizos, Homenajes, Recuerdos, Historias)
- Destinatario / Protagonista(s): ${recipientName || "Ser querido"}
- Quien dedica: ${senderName || "Alguien especial"}
- Relación: ${relationship || "Familiar / Pareja / Amigo"}
- Momentos clave y anécdotas: ${safeKeyMoments || "Momentos de amor, esfuerzo y complicidad"}
- Estilo musical deseado: ${musicStyle || "Balada Orquestal"}
- Tono emocional: ${emotionalTone || "Emotivo y Elegante"}
- Frases o mensajes especiales: ${specialPhrases || "Siempre juntos en el corazón"}

Genera una respuesta estructurada en formato JSON con la letra de la canción (con métrica poética y rima en español), la descripción acústica, el storyboard escena por escena para el video cinematográfico y recomendaciones creativas.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            styleDescription: { type: Type.STRING },
            lyrics: {
              type: Type.OBJECT,
              properties: {
                verse1: { type: Type.STRING },
                chorus: { type: Type.STRING },
                verse2: { type: Type.STRING },
                bridge: { type: Type.STRING },
                outro: { type: Type.STRING }
              },
              required: ["verse1", "chorus", "verse2", "bridge", "outro"]
            },
            storyboard: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  timecode: { type: Type.STRING },
                  visualPrompt: { type: Type.STRING },
                  voiceover: { type: Type.STRING },
                  musicalCues: { type: Type.STRING }
                },
                required: ["sceneNumber", "timecode", "visualPrompt", "voiceover", "musicalCues"]
              }
            },
            creativeAdvice: { type: Type.STRING }
          },
          required: ["title", "styleDescription", "lyrics", "storyboard", "creativeAdvice"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Error generating story script:", error);
    res.status(500).json({
      success: false,
      error: "No se pudo generar el guion personalizado en este momento."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EternIA Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
