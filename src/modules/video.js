const videoTypes = [
  "public.movie",
  "public.video",
  "com.apple.quicktime-movie",
  "public.mpeg-4",
]

export function isVideoMimetype(type) {
  return videoTypes.includes(type)
}

export function createVideo(url) {
  const video = document.createElement("video")
  video.controls = true
  video.src = url
  return video
}
