/**
 * Image generator for Pristine Pond Solutions.
 *
 * Uses Google's Gemini 2.5 Flash Image (the model nicknamed "Nano Banana")
 * to produce on-brand photography for the site. Output is saved as PNG to
 * public/images/ where Vite serves it from the root.
 *
 * Run with:    node scripts/generate-images.mjs
 * Filter run:  node scripts/generate-images.mjs hero
 *              (matches any target whose name includes the argument)
 *
 * Env: GEMINI_API_KEY in .env or process env.
 */

import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import { writeFile, mkdir, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images')

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error('Missing GEMINI_API_KEY. Add it to .env at the project root.')
  process.exit(1)
}

const MODEL = process.env.NANO_BANANA_MODEL || 'gemini-3.1-flash-image-preview'

/**
 * Targets define one image each. The prompt should describe the scene
 * concretely (subject, light, palette, framing) and end with constraints
 * the model honors well: "no text, no people" when those would add noise.
 */
const TARGETS = [
  {
    name: 'hero-pond-dawn',
    aspect: '16:9',
    prompt: [
      'Cinematic landscape photograph of a serene Louisiana cypress swamp at golden hour dawn.',
      'Tall bald cypress trees draped with Spanish moss, their silhouettes mirrored on perfectly still dark water.',
      'Soft warm golden light filtering through low morning mist hovering on the water surface.',
      'Distant treeline disappears into atmospheric haze. Calm, contemplative mood.',
      'Composition is wide horizontal, deep depth of field, low camera angle near the water.',
      'Color palette: warm amber, deep navy water, muted moss green, with a hint of gold from the sunrise.',
      'Photorealistic professional landscape photography, ultra-high detail, 16:9 widescreen.',
      'No people, no boats, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-dredging',
    aspect: '4:3',
    prompt: [
      'Documentary photograph of a small floating dredge barge working on a Louisiana pond.',
      'A clean mechanical excavator arm is lifting dark sediment from the bottom near the bank.',
      'One side of the pond shows visible improvement: clearer water and exposed clean shoreline.',
      'Surrounding green grasslands and a few oak trees in the background.',
      'Late afternoon sunlight, warm and even, casting long soft shadows.',
      'Slightly elevated three-quarter angle, photorealistic, professional.',
      'Color palette: warm earth tones, navy water, gold highlights on metal.',
      'No people visible, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'pond-pristine',
    aspect: '16:9',
    prompt: [
      'Pristine Louisiana pond at midday: crystal clear blue-green water with subtle reflections of cumulus clouds.',
      'Clusters of native lily pads near the shore, lush green grass banks, mature oak trees in the middle distance.',
      'A wooden dock extends slightly into the water on the right.',
      'Soft warm sunlight, vibrant natural saturation, calm air, no wind on the water.',
      'Photorealistic professional landscape photography, 16:9 widescreen, eye-level perspective.',
      'Color palette: vivid green, clear lake blue, warm sand, golden sun.',
      'No people, no text, no logos, no watermarks.',
    ].join(' '),
  },
]

const filterArg = process.argv[2]
const targets = filterArg
  ? TARGETS.filter((t) => t.name.includes(filterArg))
  : TARGETS

if (filterArg && targets.length === 0) {
  console.error(`No targets match "${filterArg}". Available:`)
  for (const t of TARGETS) console.error(`  - ${t.name}`)
  process.exit(1)
}

const ai = new GoogleGenAI({ apiKey })

await mkdir(OUT_DIR, { recursive: true })

let succeeded = 0
let failed = 0

for (const target of targets) {
  const outPath = join(OUT_DIR, `${target.name}.png`)
  process.stdout.write(`Generating ${target.name} (${target.aspect})... `)

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          parts: [
            {
              text: `${target.prompt}\n\nOutput an image with aspect ratio ${target.aspect}.`,
            },
          ],
        },
      ],
    })

    const candidate = response.candidates?.[0]
    const parts = candidate?.content?.parts ?? []
    const imagePart = parts.find(
      (p) => p.inlineData?.data || p.inline_data?.data,
    )
    if (!imagePart) {
      const textPart = parts.find((p) => p.text)
      throw new Error(
        textPart?.text ? `model returned text: ${textPart.text.slice(0, 200)}` : 'no image part in response',
      )
    }

    const data = imagePart.inlineData?.data || imagePart.inline_data?.data
    const buffer = Buffer.from(data, 'base64')
    await writeFile(outPath, buffer)

    const { size } = await stat(outPath)
    console.log(`ok (${(size / 1024).toFixed(0)} KB)`)
    console.log(`  → ${outPath}`)
    succeeded += 1
  } catch (err) {
    console.log('FAILED')
    console.error(`  ${err.message}`)
    failed += 1
  }
}

console.log()
console.log(
  `Done. ${succeeded} generated, ${failed} failed. Estimated cost: ~$${(
    succeeded * 0.04
  ).toFixed(2)}.`,
)
process.exit(failed === 0 ? 0 : 1)
