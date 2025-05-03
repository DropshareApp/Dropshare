import hljs from 'highlight.js/lib/core'
import markdown from 'highlight.js/lib/languages/markdown'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import php from 'highlight.js/lib/languages/php'

hljs.registerLanguage("markdown", markdown)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("php", php)

export async function createCodeBlock(url, language = "plaintext") {
  const { content } = await loadFile(url)
  const code = document.createElement("code")
  code.innerText = content
  code.classList.add(`language-${language}`)

  const pre = document.createElement("pre")
  pre.appendChild(code)

  return pre
}

export function highlightCodeBlocks() {
  hljs.highlightAll()
}

async function loadFile(url) {
  const response = await fetch(url)
  const content = await response.text()
  const type = response.headers.get("Content-Type")
  return { content, type }
}
