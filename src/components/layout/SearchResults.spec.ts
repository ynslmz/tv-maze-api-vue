import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchResults from './SearchResults.vue'
import { getMockShowResults } from '../../utils/test-data.mock'

const mockSearchResults = getMockShowResults(5)

describe('SearchResults', () => {
  it('renders a list without crashing', () => {
    const wrapper = mount(SearchResults, {
      props: {
        list: mockSearchResults
      }
    })
    expect(wrapper.findAll('.result-item').length).toBe(mockSearchResults.length)
  })

  it('shows no results text when no results are found', () => {
    const wrapper = mount(SearchResults, {
      props: {
        list: []
      }
    })
    expect(wrapper.find('.no-result-text').text()).toContain('No Results')
  })
})
