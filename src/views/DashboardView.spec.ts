import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'
import GenreNav from '@/components/GenreNav.vue'
import { useShowStore } from '@/store/show'

function mountDashboard() {
  return mount(DashboardView, {
    global: {
      stubs: { GenreCard: true, Pager: true }
    }
  })
}

describe('DashboardView.vue', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('renders one GenreCard per genre', () => {
    const store = useShowStore()
    store.$patch({
      genres: ['Comedy', 'Drama'],
      orderedShows: { Comedy: [], Drama: [] }
    })

    const wrapper = mountDashboard()
    expect(wrapper.findAllComponents({ name: 'GenreCard' })).toHaveLength(2)
  })

  it('shows an error message with a retry button when the store has an error', () => {
    const store = useShowStore()
    store.$patch({ error: 'Unable to load shows. Please try again.' })

    const wrapper = mountDashboard()
    expect(wrapper.find('[role="alert"]').text()).toContain('Unable to load shows')
    expect(wrapper.find('.retry').exists()).toBe(true)
  })

  it('shows an empty message when there are no genres and it is not loading', () => {
    useShowStore() // empty state by default

    const wrapper = mountDashboard()
    expect(wrapper.find('.state-message').text()).toBe('No shows to display.')
  })

  it('filters to a single genre when one is selected in the nav', async () => {
    const store = useShowStore()
    store.$patch({
      genres: ['Comedy', 'Drama', 'Sports'],
      orderedShows: { Comedy: [], Drama: [], Sports: [] }
    })

    const wrapper = mountDashboard()
    expect(wrapper.findAllComponents({ name: 'GenreCard' })).toHaveLength(3)

    wrapper.findComponent(GenreNav).vm.$emit('select', 'Drama')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAllComponents({ name: 'GenreCard' })).toHaveLength(1)
  })
})
