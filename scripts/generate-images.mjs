/**
 * Image generator for Pristine Pond Solutions.
 *
 * Calls Google's Gemini 2.5 Flash Image (the model nicknamed "Nano Banana")
 * to produce on-brand photography. The pipeline saves the raw PNG returned
 * by the model, then immediately converts to WebP via ffmpeg and removes the
 * PNG so only the optimized asset is committed. WebP at quality 82 is
 * roughly 8 to 12 times smaller than the PNG with no perceptible loss.
 *
 * Run with:    node scripts/generate-images.mjs
 * Filter run:  node scripts/generate-images.mjs hero
 *              (matches any target whose name includes the argument)
 *
 * Env: GEMINI_API_KEY in .env or process env.
 *      NANO_BANANA_MODEL optionally overrides the default model.
 */

import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import { writeFile, mkdir, stat, unlink, readFile } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images')

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error('Missing GEMINI_API_KEY. Add it to .env at the project root.')
  process.exit(1)
}

const MODEL = process.env.NANO_BANANA_MODEL || 'gemini-3.1-flash-image-preview'
const WEBP_QUALITY = Number(process.env.WEBP_QUALITY ?? 82)

/**
 * Targets define one image each. Prompts describe the scene concretely
 * (subject, light, palette, framing) and end with constraints like
 * "no text, no people" when those would add noise.
 *
 * Optional fields:
 *   model           — override the default MODEL for this target
 *   referenceImages — array of image paths (relative to project root)
 *                     to send alongside the prompt as visual context
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
  {
    name: 'services-water-quality',
    aspect: '3:2',
    prompt: [
      'Macro photograph of a clear pond surface in shallow water at golden hour.',
      'Sun rays piercing through the water column, illuminating clean sand and small smooth pebbles on the bottom.',
      'A few air bubbles rising. Subtle ripples on the surface catching warm sunlight.',
      'Colors are clear blue-green water and warm sand below.',
      'Photorealistic, very high detail, half-underwater feeling, calm and pristine.',
      'No people, no fish, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-fountains-aeration',
    aspect: '3:2',
    prompt: [
      'Estate pond at golden hour with an elegant tall white fountain spraying a graceful arching pattern of water skyward.',
      'Fine mist catches the warm light, reflecting in the pond surface.',
      'Mature live oak trees framing the background, manicured grass banks.',
      'Calm, refined, luxurious country-estate atmosphere.',
      'Photorealistic professional landscape photography, three-quarter angle, deep depth of field.',
      'Color palette: warm gold light, deep navy water, lush moss green.',
      'No people, no buildings, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-aquatic-plants',
    aspect: '3:2',
    prompt: [
      'Close macro photograph of native white water lilies blooming on a dark calm pond.',
      'Several round green lily pads floating, two open white blooms with golden centers in soft focus background.',
      'Morning dew drops on the petals catching warm sunlight from a low angle.',
      'Photorealistic, ultra-high detail, shallow depth of field, ethereal mood.',
      'Color palette: deep green pads, white petals, gold center, near-black water.',
      'No people, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-fisheries',
    aspect: '3:2',
    prompt: [
      'Underwater photograph of a healthy adult largemouth bass swimming through clear pond water.',
      'Sunlight from above creates soft caustic light patterns on the bass and the sandy bottom.',
      'Background fades into deeper green water with a hint of submerged vegetation.',
      'Side profile of the fish, clear detail of scales and fins, peaceful, not aggressive.',
      'Photorealistic professional wildlife photography, three-quarter angle.',
      'Color palette: olive-green fish, blue-green water, golden caustic highlights.',
      'No people, no fishing gear, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-fish-stocking',
    aspect: '3:2',
    prompt: [
      'A clear plastic transport bag full of small live silver-and-olive fingerling fish being lowered into the shallow edge of a pond.',
      'Splashes of water and tiny fish silhouettes visible through the bag.',
      'Soft warm afternoon light, green grass bank in foreground.',
      'Documentary style, three-quarter angle, very high detail.',
      'Color palette: clear water, silver fish, warm green and gold surroundings.',
      'No people visible above frame, hands cropped out, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'hero-pond-louisiana-hd',
    aspect: '4:3',
    model: 'gemini-3-pro-image-preview',
    referenceImages: ['public/images/hero-pond-louisiana.webp'],
    prompt: [
      'Recreate this exact landscape photograph at high resolution and ultra-sharp detail.',
      'Preserve the composition exactly: the same camera angle, same horizon line,',
      'same trees in the same positions, same cumulus cloud arrangement,',
      'same water reflections, same color palette, same lighting, same time of day.',
      'Do not add or remove any elements. Do not change framing or perspective.',
      'Output as a professional landscape photograph at maximum native resolution,',
      'with crisp foliage detail, defined cloud edges, and clean water reflections.',
      'Photorealistic, ultra-high detail, deep depth of field. No text, no logos.',
    ].join(' '),
  },
  {
    name: 'hero-pond-daytime',
    aspect: '16:9',
    prompt: [
      'Cinematic landscape photograph of a serene Louisiana pond on a clear summer afternoon.',
      'Foreground: calm clear pond water reflecting the sky and clouds.',
      'Mid-ground: a small grassy far shoreline.',
      'Background: tall southern pine trees and live oaks under a vivid blue sky',
      'with bright white cumulus clouds.',
      'Soft natural sunlight, warm and even, light breeze creating subtle ripples.',
      'Wide horizontal composition, eye-level perspective, deep depth of field.',
      'Color palette: vivid blue sky, crisp white clouds, navy water, lush green grass, dark pine.',
      'Photorealistic professional landscape photography, ultra-high detail, 16:9 widescreen.',
      'No people, no boats, no buildings, no text, no logos, no watermarks.',
    ].join(' '),
  },
  {
    name: 'services-consulting',
    aspect: '3:2',
    prompt: [
      'Top-down photograph of a topographic survey map of a property laid flat on weathered wooden dock planks.',
      'On top of the map: a brass compass, a small notebook with a leather cover, a yellow pencil, a pair of binoculars, and a steel coffee mug.',
      'Soft natural daylight from one side casting gentle shadows.',
      'In the corner of the frame, a glimpse of calm pond water through gaps between the dock planks.',
      'Photorealistic, very high detail, flat-lay style, considered composition.',
      'Color palette: warm wood, off-white map, brass, deep navy water glimpse.',
      'No people, no text legible on the map, no logos, no watermarks.',
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

const ffmpegAvailable = await hasFFmpeg()
if (!ffmpegAvailable) {
  console.warn('ffmpeg not found on PATH. Will save raw PNGs instead of WebP.')
  console.warn('Install ffmpeg to get ~10x smaller files automatically.\n')
}

let succeeded = 0
let failed = 0

for (const target of targets) {
  const pngPath = join(OUT_DIR, `${target.name}.png`)
  const webpPath = join(OUT_DIR, `${target.name}.webp`)
  process.stdout.write(`Generating ${target.name} (${target.aspect})... `)

  try {
    const parts = []
    for (const ref of target.referenceImages ?? []) {
      const refPath = resolve(__dirname, '..', ref)
      const bytes = await readFile(refPath)
      parts.push({
        inlineData: {
          mimeType: mimeFromExt(ref),
          data: bytes.toString('base64'),
        },
      })
    }
    parts.push({
      text: `${target.prompt}\n\nOutput an image with aspect ratio ${target.aspect}.`,
    })

    const response = await ai.models.generateContent({
      model: target.model || MODEL,
      contents: [{ parts }],
    })

    const candidate = response.candidates?.[0]
    const responseParts = candidate?.content?.parts ?? []
    const imagePart = responseParts.find(
      (p) => p.inlineData?.data || p.inline_data?.data,
    )
    if (!imagePart) {
      const textPart = responseParts.find((p) => p.text)
      throw new Error(
        textPart?.text
          ? `model returned text: ${textPart.text.slice(0, 200)}`
          : 'no image part in response',
      )
    }

    const data = imagePart.inlineData?.data || imagePart.inline_data?.data
    const buffer = Buffer.from(data, 'base64')
    await writeFile(pngPath, buffer)

    let finalPath = pngPath
    if (ffmpegAvailable) {
      await pngToWebp(pngPath, webpPath, WEBP_QUALITY)
      await unlink(pngPath)
      finalPath = webpPath
    }

    const { size } = await stat(finalPath)
    console.log(`ok (${(size / 1024).toFixed(0)} KB)`)
    console.log(`  → ${finalPath}`)
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

/* ----- helpers ----- */

function pngToWebp(pngPath, webpPath, quality) {
  return new Promise((resolve, reject) => {
    const ff = spawn(
      'ffmpeg',
      [
        '-hide_banner',
        '-loglevel',
        'error',
        '-y',
        '-i',
        pngPath,
        '-c:v',
        'libwebp',
        '-quality',
        String(quality),
        webpPath,
      ],
      { stdio: 'inherit' },
    )
    ff.on('error', reject)
    ff.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)),
    )
  })
}

function hasFFmpeg() {
  return new Promise((resolve) => {
    const ff = spawn('ffmpeg', ['-version'], { stdio: 'ignore' })
    ff.on('error', () => resolve(false))
    ff.on('exit', (code) => resolve(code === 0))
  })
}

function mimeFromExt(filename) {
  const ext = extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  return 'application/octet-stream'
}
