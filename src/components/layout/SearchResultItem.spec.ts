import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchResultItem from './SearchResultItem.vue'
import { getMockShow } from '../../utils/test-data.mock'

const mockShow = getMockShow()

const mockPropData = {
  item: mockShow
}

describe('SearchResultItem.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(SearchResultItem, {
      props: {
        ...mockPropData
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays correct data when given a result prop', () => {
    const wrapper = mount(SearchResultItem, {
      props: {
        ...mockPropData
      }
    })
    expect(wrapper.find('.result-item-details-title').text()).toBe(mockShow.name)
    expect(wrapper.find('img').attributes('src')).toBe(mockShow.image?.medium)
    expect(wrapper.find('.badge').text()).toContain(mockShow.rating?.average)
  })
})
