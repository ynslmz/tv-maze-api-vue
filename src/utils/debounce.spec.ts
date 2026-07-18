import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createDebounce } from './debounce'

describe('createDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('invokes the function only after the delay elapses', () => {
    const fn = vi.fn()
    const debounced = createDebounce(fn, 300)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('coalesces rapid calls into a single invocation with the latest args', () => {
    const fn = vi.fn()
    const debounced = createDebounce((v: string) => fn(v), 300)

    debounced('a')
    debounced('b')
    debounced('c')
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('keeps separate timers per instance (no shared module state)', () => {
    const first = vi.fn()
    const second = vi.fn()
    const debouncedFirst = createDebounce(first, 300)
    const debouncedSecond = createDebounce(second, 300)

    debouncedFirst()
    debouncedSecond()
    vi.advanceTimersByTime(300)

    // With a shared timer the first call would have been cancelled by the second.
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
  })
})
