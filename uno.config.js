// uno.config.ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetTagify from '@unocss/preset-tagify'

export default defineConfig({
  // ...
  transformers: [
    transformerDirectives(),
  ],
  presets: [presetUno(), presetAttributify(),presetIcons(), presetTagify()]
})