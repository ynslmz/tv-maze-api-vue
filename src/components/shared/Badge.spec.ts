import Badge from '@/components/shared/Badge.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Badge.vue', () => {
  it('renders the badge with a text correctly', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: ['Test']
      }
    })
    console.log(wrapper.text())
    expect(wrapper.text()).toContain('Test')
  })
})
