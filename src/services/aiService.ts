import { z, ZodError } from 'zod';
import { StoryDraft, GeneratedStoryResult } from '../types';

// Zod Schema that mirrors the Expected GeneratedStoryResult interface
const GeneratedStorySchema = z.object({
  title: z.string(),
  styleDescription: z.string(),
  lyrics: z.object({
    verse1: z.string(),
    chorus: z.string(),
    verse2: z.string(),
    bridge: z.string(),
    outro: z.string()
  }),
  storyboard: z.array(
    z.object({
      sceneNumber: z.number().optional(),
      timecode: z.string(),
      visualPrompt: z.string(),
      voiceover: z.string(),
      musicalCues: z.string()
    })
  ),
  creativeAdvice: z.string()
});

export const generateStoryScript = async (
  formData: StoryDraft
): Promise<{ success: boolean; data?: GeneratedStoryResult; errorMsg?: string }> => {
  let responseData: any = null;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const res = await fetch('/api/generate-story-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 429) {
        return { success: false, errorMsg: 'Nuestros compositores están muy ocupados. Espera un momento y vuelve a intentar.' };
      }
      return { success: false, errorMsg: 'Hubo un inconveniente de conexión con el estudio inteligente. Intenta nuevamente.' };
    }

    const data = await res.json();
    responseData = data;

    if (data.success && data.data) {
      // Validate runtime schema with Zod
      const parsedData = GeneratedStorySchema.parse(data.data);
      return { success: true, data: parsedData };
    } else {
      return { success: false, errorMsg: data.error || 'No se pudo generar la propuesta. Intenta nuevamente.' };
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.error('[Zod Validation]', {
        errors: error.errors,
        received: responseData?.data,
        timestamp: new Date().toISOString()
      });
      return { success: false, errorMsg: 'El compositor creó una estructura inesperada. Por favor, intenta regenerar la obra.' };
    }
    
    if (error.name === 'AbortError') {
      console.error('[Network Timeout] La petición excedió el límite de 30s');
      return { success: false, errorMsg: 'El proceso está tomando más tiempo del esperado. Por favor, revisa tu conexión e intenta de nuevo.' };
    }
    
    console.error('[Network/Parsing Error]', error);
    return { success: false, errorMsg: 'Error de conexión. Revisa tu internet e intenta nuevamente.' };
  }
};
