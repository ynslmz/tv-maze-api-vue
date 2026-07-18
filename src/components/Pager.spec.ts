import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Pager from './Pager.vue'

describe('Pager.vue', () => {
  it('emits pageChange with the next page when Next is clicked', async () => {
    const wrapper = mount(Pager, { props: { page: 2 } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([3])
  })

  it('emits pageChange with the previous page when Previous is clicked', async () => {
    const wrapper = mount(Pager, { props: { page: 2 } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([1])
  })

  it('disables Previous on the first page', () => {
    const wrapper = mount(Pager, { props: { page: 1 } })
    expect(wrapper.findAll('button')[0].attributes('disabled')).toBeDefined()
  })

  it('disables Next when there are no more pages', () => {
    const wrapper = mount(Pager, { props: { page: 5, hasNext: false } })
    expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
  })

  it('enables Next by default', () => {
    const wrapper = mount(Pager, { props: { page: 1 } })
    expect(wrapper.findAll('button')[1].attributes('disabled')).toBeUndefined()
  })
})
