let timer: number | null = null

export function debounce(f: () => void, time: number) {
  if (timer) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f()
    }, time)
  } else {
    timer = setTimeout(() => {
      f()
    }, time)
  }
}
