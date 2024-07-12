export function generateShifts() {
  function getNearestInterval(now) {
    const intervals = [
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0),
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0),
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0)
    ]
    for (let interval of intervals) {
      if (now < interval) {
        return interval
      }
    }
    // If it's past the last interval of the day, return the first interval of the next day
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 6, 0, 0)
  }

  const now = new Date()
  const shifts = []
  const shiftDurations = [8, 8, 8] // Duration of each shift in hours

  const nextInterval = getNearestInterval(now)
  let currentTime = nextInterval

  for (let i = 0; i < shiftDurations.length * 3; i++) {
    let duration = shiftDurations[i % 3] * 60 * 60 * 1000
    let start = new Date(currentTime)
    let end = new Date(currentTime.getTime() + duration)

    shifts.push({
      _span: [start, end],
      _type: (() => {
        const startHour = start.getHours()
        if (startHour === 6) {
          return 'morning'
        } else if (startHour === 14) {
          return 'evening'
        } else {
          return 'night'
        }
      })()
    })
    currentTime = end
  }
  console.debug({ shifts })

  return shifts
}
export function formatShift([start, end]) {
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' }
  const startStr = start.toLocaleString(undefined, options)
  const endStr = end.toLocaleString(undefined, options)
  return `${startStr} - ${endStr}`
}
