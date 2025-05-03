import { createIcon } from "./icons.js"
import { isCodeMimetype, createCodeBlock } from "./code.js"
import { isVideoMimetype } from "./video.js"

const previewContainer = "#preview"
const previewMedia = "img, video, iframe"

export async function updatePreview() {
  const { fileType, filePath } = document.body.dataset
  const preview = document.querySelector(previewContainer)
  const hasPreview = !!preview.querySelector(previewMedia)
  const isVideo = isVideoMimetype(fileType)
  const isCode = isCodeMimetype(fileType)

  if (hasPreview && !isCode) return

  preview.innerHTML = ""

  if (isCode) {
    preview.appendChild(await createCodeBlock(filePath, fileType))
  } else if (isVideo) {
    preview.appendChild(createVideo(filePath))
  } else {
    preview.appendChild(createIcon(fileType))
  }
}
