import json
import re
import os

styles = [
    {"id": "acustico", "label": "🎵 Acústico: Alma y Cuerda", "file": "acustico.mp3", "img": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200", "cat": "bodas", "catL": "Bodas 💍", "catI": "💍"},
    {"id": "baile_boda", "label": "💃 Baile de Boda: Nuestro Momento", "file": "baile_boda.mp3", "img": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200", "cat": "bodas", "catL": "Bodas 💍", "catI": "💍"},
    {"id": "balada_pop_hombre", "label": "🎤 Balada Pop (Hombre): Voz del Corazón", "file": "balada_pop_hombre.mp3", "img": "https://images.unsplash.com/photo-1516280440502-86927d2c3755?q=80&w=1200", "cat": "recuerdos", "catL": "Recuerdos 💖", "catI": "💖"},
    {"id": "balada_pop_mujer", "label": "🎤 Balada Pop (Mujer): Sentimiento Profundo", "file": "balada_pop_mujer.mp3", "img": "https://images.unsplash.com/photo-1493225457124-a1a2a5f0a886?q=80&w=1200", "cat": "recuerdos", "catL": "Recuerdos 💖", "catI": "💖"},
    {"id": "balada_ranchera", "label": "🎸 Balada Ranchera: Pasión Regional", "file": "balada_ranchera.mp3", "img": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "banda", "label": "🎺 Banda: Fiesta y Alegría", "file": "banda.mp3", "img": "https://images.unsplash.com/photo-1520110120835-c96534a4c984?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "blues", "label": "🎹 Blues: Melancolía del Alma", "file": "blues.mp3", "img": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200", "cat": "homenajes", "catL": "Homenajes 🕊️", "catI": "🕊️"},
    {"id": "cumbia", "label": "🥁 Cumbia: Ritmo Tropical", "file": "cumbia.mp3", "img": "https://images.unsplash.com/photo-1533174000255-16c0b7d4cf11?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "cumpleanos", "label": "🎂 Cumpleaños: Un Año Más", "file": "cumpleanos.mp3", "img": "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "funeral", "label": "🕊️ Funeral: Recuerdo Eterno", "file": "funeral.mp3", "img": "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200", "cat": "homenajes", "catL": "Homenajes 🕊️", "catI": "🕊️"},
    {"id": "heavy_metal", "label": "🤘 Heavy Metal: Fuerza y Poder", "file": "heavy_metal.mp3", "img": "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200", "cat": "recuerdos", "catL": "Recuerdos 💖", "catI": "💖"},
    {"id": "iglesia", "label": "⛪ Iglesia: Canto Celestial", "file": "iglesia.mp3", "img": "https://images.unsplash.com/photo-1438032005730-c779502fac39?q=80&w=1200", "cat": "bautizos", "catL": "Bautizos 🕊️", "catI": "🕊️"},
    {"id": "infantil", "label": "🧸 Infantil: Dulces Sueños", "file": "infantil.mp3", "img": "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200", "cat": "bautizos", "catL": "Bautizos 🕊️", "catI": "🕊️"},
    {"id": "jazz", "label": "🎷 Jazz: Noche Sofisticada", "file": "jazz.mp3", "img": "https://images.unsplash.com/photo-1415201364774-f6b0bb8019b8?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "regueton", "label": "🕺 Reguetón: Flow Urbano", "file": "regueton.mp3", "img": "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "tango", "label": "💃 Tango: Pasión Porteña", "file": "tango.mp3", "img": "https://images.unsplash.com/photo-1544273574-d4fcc8c0e29b?q=80&w=1200", "cat": "celebraciones", "catL": "Celebraciones 🎉", "catI": "🎉"},
    {"id": "opera", "label": "🎭 Ópera: Drama Lírico", "file": "opera.mp3", "img": "https://images.unsplash.com/photo-1507676184212-d0330a151b14?q=80&w=1200", "cat": "homenajes", "catL": "Homenajes 🕊️", "catI": "🕊️"}
]

out = "export const INITIAL_FINISHED_STORIES: FinishedStory[] = [\n"
for i, s in enumerate(styles):
    style_label = s["label"].split(":")[0][2:].strip()
    out += f"""  {{
    id: 'cancion-{s["id"]}',
    title: '{s["label"]}',
    serviceType: 'cancion',
    category: '{s["cat"]}',
    categoryLabel: '{s["catL"]}',
    categoryIcon: '{s["catI"]}',
    audioUrl: '/audio/samples/{s["file"]}',
    thumbnailUrl: '{s["img"]}',
    duration: '02:30',
    protagonists: 'EternIA Portafolio',
    clientQuote: '"Un trabajo magistral que superó nuestras expectativas. ¡Gracias por hacer nuestra historia canción!"',
    synopsis: 'Muestra musical exclusiva de nuestro catálogo, producida por los artistas de EternIA.',
    soundtrackStyle: '{style_label}',
    emotionalTone: 'Auténtico y Real',
    tags: ['Portafolio', '{style_label.split(" ")[0]}', 'Muestra'],
    viewsCount: {1500 + (i*233)},
    likesCount: {400 + (i*60)},
    lyricsSnippet: 'Descubre el poder de tus memorias\\nconvertidas en una obra de arte sonoro...'
  }}"""
    if i < len(styles) - 1:
        out += ",\n"
    else:
        out += "\n"
out += "];\n"

os.system("git checkout src/data/mockStories.ts")

with open("C:\\EternIA\\src\\data\\mockStories.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Replace EVERYTHING between `export const INITIAL_FINISHED_STORIES: FinishedStory[] = [` and `];` 
# that comes BEFORE `export const PRICING_PLANS`
new_text = re.sub(r"export const INITIAL_FINISHED_STORIES: FinishedStory\[\] = \[.*?\];\n\nexport const PRICING_PLANS", out + "\nexport const PRICING_PLANS", text, flags=re.DOTALL)

with open("C:\\EternIA\\src\\data\\mockStories.ts", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Done.")
