const languages = {
  "public.plain-text": "text",
  "net.daringfireball.markdown": "markdown",
  "public.html": "html",
  "public.css": "css",
  "public.javascript-source": "javascript",
  "com.netscape.javascript-source": "javascript",
  "public.mpeg-2-transport-stream": "typescript",
  "public.php-script": "php",
}

const fallbackLanguage = "text"

const theme = {
  light: "github-light",
  dark: "github-dark",
}

export function isCodeMimetype(fileType) {
  return (fileType in languages)
}

export async function createCodeBlock(url, fileType = null) {
  // Create empty placeholder
  const empty = createEmptyCodeBlock()

  loadFile(url).then(({ content }) => {
    // Load file in the background
    const plain = createPlainCodeBlock(content)
    empty.replaceWith(plain)

    // Highlight code in the background
    createHighlightedCodeBlock(content, getCodeLanguage(fileType)).then((highlighted) => {
      plain.replaceWith(highlighted)
    })
  })

  // Return placeholder
  return empty
}

function createEmptyCodeBlock() {
  return document.createElement("pre")
}

function createPlainCodeBlock(content) {
  const text = document.createTextNode(content)
  const code = document.createElement("code")
  code.appendChild(text)
  const placeholder = document.createElement("pre")
  placeholder.appendChild(code)
  return placeholder
}

async function createHighlightedCodeBlock(content, language) {
  const { codeToHtml } = await import("shiki")

  const html = await codeToHtml(content, { lang: language, themes: theme })
  const codeBlock = document.createRange().createContextualFragment(html).querySelector("pre")
  codeBlock.classList.add(`language-${language}`)
  return codeBlock
}

async function loadFile(url) {
  const response = await fetch(url)
  const content = await response.text()
  const type = response.headers.get("Content-Type")
  return { content, type }
}

function getCodeLanguage(fileType) {
  return languages[fileType] || fileType || fallbackLanguage
}
