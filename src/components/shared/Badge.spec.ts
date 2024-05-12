import Badge from './Badge.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Badge.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Badge, {
      slots: { default: [] }
    })
    expect(wrapper.exists()).toBe(true)
  })
  it('renders the badge with a text correctly', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: ['Test']
      }
    })
    expect(wrapper.text()).toContain('Test')
  })
})
