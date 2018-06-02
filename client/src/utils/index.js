export const getMinutes = seconds => {
  return Math.floor(seconds / 60)
}

const pad = num => {
  return num < 10 ? `0${num}` : num
}

export const getSeconds = seconds => {
  return Math.floor(seconds % 60)
}

export const getTime = seconds => {
  return {
    min: getMinutes(seconds),
    sec: pad(getSeconds(seconds))
  }
}

export const parseUrl = url => {
  const re = /watch\?v=([a-zA-Z0-9]*)/
  const shortRe = /youtu.be\/([a-zA-Z0-9]*)/
  const match = url.match(re)
  const shortMatch = url.match(shortRe)
  let isUrl = true
  let value = url

  if (match) {
    value = match[1]
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

export const getWidth = width => {
  return Math.max(480, width)
}

export const getHeight = width => {
  return Math.max(270, (9 / 16) * width)
}
