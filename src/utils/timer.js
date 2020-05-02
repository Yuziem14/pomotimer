export function formatMinutes(time) {
  const minutes = Math.floor(time / 60)
  return minutes < 10 ? `0${minutes}` : `${minutes}`
}

export function formatSeconds(time) {
  const seconds = Math.floor(time % 60)
  return seconds < 10 ? `0${seconds}` : `${seconds}`
}
