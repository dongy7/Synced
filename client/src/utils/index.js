export const parseUrl = (url) => {
  const re = /watch\?v=([a-zA-Z0-9]*)/
  const match = url.match(re)
  if (match) {
    return match[1]
  }

  return match
}

export const getWidth = (width) => {
  return Math.max(480, width)
}

export const getHeight = (width) => {
  return Math.max(270, 9/16*width)
}