import { createElement, FileCode, FileDown, FileText, PackageOpen } from 'lucide'

const icons = {
  "public.plain-text": FileText,
  "public.rtf": FileText,
  "net.daringfireball.markdown": FileText,

  "public.html": FileCode,
  "public.css": FileCode,
  "public.javascript-source": FileCode,
  "com.netscape.javascript-source": FileCode,
  "public.mpeg-2-transport-stream": FileCode, // *.ts
  "public.php-script": FileCode,

  "public.zip-archive": PackageOpen,
}

const fallbackIcon = FileDown

function getIconForType(type) {
  return icons[type] || fallbackIcon
}

export function createIcon(fileType) {
  const icon = getIconForType(fileType)
  const el = createElement(icon)
  el.classList.add("icon")
  return el
}
