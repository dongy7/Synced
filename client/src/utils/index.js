export const parseUrl = (url) => {
  const re = /watch\?v=([a-zA-Z0-9]*)/
  const shortRe = /youtu.be\/([a-zA-Z0-9]*)/
  const match = url.match(re)
  const shortMatch = url.match(shortRe)
  let isUrl = true
  let value = url

  if (match) {
    value =  match[1]
  } else if (shortMatch) {
    value = shortMatch[1]
  } else {
    isUrl = false
  }

  return {
    isUrl,
    value
  }
}

export const getWidth = (width) => {
  return Math.max(480, width)
}

export const getHeight = (width) => {
  return Math.max(270, 9/16*width)
}