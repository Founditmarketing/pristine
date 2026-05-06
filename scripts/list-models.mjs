import 'dotenv/config'

const apiKey = process.env.GEMINI_API_KEY
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
)
const json = await res.json()
const imageModels = (json.models ?? []).filter(
  (m) =>
    m.name?.includes('image') ||
    m.supportedGenerationMethods?.some?.((s) => s.toLowerCase().includes('image')),
)
console.log('Image-capable models:')
for (const m of imageModels) {
  console.log(`  ${m.name}`)
  console.log(`    methods: ${(m.supportedGenerationMethods || []).join(', ')}`)
}
