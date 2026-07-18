import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SearchBar from './SearchBar.vue'
import { useShowStore } from '@/store/show'
import { getMockShowResults } from '@/utils/test-data.mock'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

function mountSearchBar() {
  return mount(SearchBar, {
    global: { stubs: { RouterLink: true } }
  })
}

describe('SearchBar.vue keyboard navigation', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    push.mockClear()
  })

  it('navigates to the highlighted result on Enter', async () => {
    const store = useShowStore()
    store.$patch({ searchResults: getMockShowResults(2) })

    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.trigger('keydown', { key: 'ArrowDown' }) // highlight first result
    await input.trigger('keydown', { key: 'Enter' })

    expect(push).toHaveBeenCalledWith('/detail/1')
  })

  it('sets aria-activedescendant to the highlighted option', async () => {
    const store = useShowStore()
    store.$patch({ searchResults: getMockShowResults(2) })

    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.trigger('keydown', { key: 'ArrowDown' })

    expect(input.attributes('aria-activedescendant')).toBe('search-option-1')
  })

  it('clears results on Escape', async () => {
    const store = useShowStore()
    store.$patch({ searchResults: getMockShowResults(2) })

    const wrapper = mountSearchBar()
    const input = wrapper.find('input')

    await input.trigger('keydown', { key: 'Escape' })

    expect(store.getSearchResults).toEqual([])
  })
})
