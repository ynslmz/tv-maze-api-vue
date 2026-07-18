/**
 * Creates a debounced wrapper around `fn`. Each call resets a timer that is
 * private to this wrapper, so multiple debounced functions never share state.
 * Arguments from the latest call are forwarded to `fn` when it fires.
 *
 * The returned function exposes `.cancel()` to drop any pending invocation —
 * used to stop an in-flight search from repopulating results after the input
 * is cleared or reset.
 */
export function createDebounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: TArgs) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, delay)
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounced
}
