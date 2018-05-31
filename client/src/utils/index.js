export const parseUrl = (url) => {
  const re = /watch\?v=([a-zA-Z0-9]*)/
  const match = url.match(re)
  if (match) {
    return match[1]
  }

  return match
}