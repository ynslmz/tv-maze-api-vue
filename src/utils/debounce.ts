/**
 * Creates a debounced wrapper around `fn`. Each call resets a timer that is
 * private to this wrapper, so multiple debounced functions never share state.
 * Arguments from the latest call are forwarded to `fn` when it fires.
 */
export function createDebounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: TArgs) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, delay)
  }
}
