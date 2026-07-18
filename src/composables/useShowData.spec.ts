import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, h, reactive } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getMockShow } from '@/utils/test-data.mock'

const ctx = vi.hoisted(() => ({
  replace: vi.fn(),
  fetchShowById: vi.fn(),
  show: null as unknown,
  route: { params: { id: '1' } } as { params: { id: string } }
}))

vi.mock('vue-router', () => ({
  useRoute: () => ctx.route,
  useRouter: () => ({ replace: ctx.replace })
}))
vi.mock('@/store/show', () => ({
  useShowStore: () => ({
    fetchShowById: ctx.fetchShowById,
    get show() {
      return ctx.show
    }
  })
}))

import { useShowData } from './useShowData'

const Host = defineComponent({
  setup() {
    useShowData()
    return () => h('div')
  }
})

describe('useShowData', () => {
  beforeEach(() => {
    ctx.replace.mockClear()
    ctx.fetchShowById.mockReset()
    ctx.show = null
    ctx.route = reactive({ params: { id: '1' } })
  })

  it('fetches the show for the current route id on mount', async () => {
    ctx.fetchShowById.mockImplementation(() => {
      ctx.show = getMockShow(1)
    })

    mount(Host)
    await flushPromises()

    expect(ctx.fetchShowById).toHaveBeenCalledWith('1')
    expect(ctx.replace).not.toHaveBeenCalled()
  })

  it('redirects to /notfound when the show cannot be loaded', async () => {
    ctx.fetchShowById.mockResolvedValue(undefined) // leaves show null

    mount(Host)
    await flushPromises()

    expect(ctx.replace).toHaveBeenCalledWith('/notfound')
  })

  it('refetches when the route id changes', async () => {
    ctx.fetchShowById.mockImplementation(() => {
      ctx.show = getMockShow(1)
    })

    mount(Host)
    await flushPromises()
    ctx.fetchShowById.mockClear()

    ctx.route.params.id = '2'
    await flushPromises()

    expect(ctx.fetchShowById).toHaveBeenCalledWith('2')
  })
})
