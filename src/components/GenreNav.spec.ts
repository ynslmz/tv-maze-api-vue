import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GenreNav from './GenreNav.vue'

const genres = ['Comedy', 'Drama', 'Sports']

describe('GenreNav.vue', () => {
  it('renders an "All" chip plus one chip per genre', () => {
    const wrapper = mount(GenreNav, { props: { genres, selected: null } })
    const chips = wrapper.findAll('.genre-chip')
    expect(chips).toHaveLength(genres.length + 1)
    expect(chips[0].text()).toBe('All')
  })

  it('marks the selected genre active', () => {
    const wrapper = mount(GenreNav, { props: { genres, selected: 'Drama' } })
    const active = wrapper.find('.genre-chip.active')
    expect(active.text()).toBe('Drama')
    expect(active.attributes('aria-pressed')).toBe('true')
  })

  it('emits select with the genre name when a chip is clicked', async () => {
    const wrapper = mount(GenreNav, { props: { genres, selected: null } })
    await wrapper.findAll('.genre-chip')[2].trigger('click') // Drama
    expect(wrapper.emitted('select')?.[0]).toEqual(['Drama'])
  })

  it('emits select with null when "All" is clicked', async () => {
    const wrapper = mount(GenreNav, { props: { genres, selected: 'Drama' } })
    await wrapper.findAll('.genre-chip')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([null])
  })
})
