import { mount } from '@vue/test-utils'
import Loading from './Loading.vue'
import { describe, expect, it } from 'vitest'

describe('Loading.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Loading)
    expect(wrapper.exists()).toBe(true)
  })
})
