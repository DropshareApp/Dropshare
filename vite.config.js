import { defineConfig } from "vite"
import { ViteMinifyPlugin as minifyHtml } from "vite-plugin-minify"
import { viteSingleFile as inlineAssets } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    inlineAssets(),
    minifyHtml(),
  ],
  root: "src",
  build: {
    outDir: "../",
    emptyOutDir: false,
    terserOptions: {
      format: {
        comments: false
      }
    },
    rollupOptions: {
      external: ["shiki"],
      output: {
        paths: {
          "shiki": "https://esm.sh/shiki@1.6.4"
        }
      }
    }
  },
  esbuild: {
    legalComments: "none"
  }
})
