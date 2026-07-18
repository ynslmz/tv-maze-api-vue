import { mount } from '@vue/test-utils'
import Image from './Image.vue'
import { describe, expect, it } from 'vitest'
import { getMockImage } from '../../utils/test-data.mock'
import { noImageUrl } from '../../utils/constValues'

const mockImageProps = {
  image: getMockImage(),
  alt: 'Test alt',
  size: 'medium',
  style: { border: '1px solid black' }
}

describe('Image.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Image, {
      props: {
        ...mockImageProps
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders img with correct props', () => {
    const wrapper = mount(Image, {
      props: {
        ...mockImageProps
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('medium.jpg')
    expect(img.attributes('alt')).toBe('Test alt')
    expect(img.attributes('style')).toContain('border: 1px solid black')
  })

  it('image URL computed correctly', () => {
    const wrapper = mount(Image, {
      props: {
        ...mockImageProps,
        size: 'original'
      }
    })
    const img = wrapper.find('img')

    expect(img.attributes('src')).toBe('original.jpg')
  })

  it('shows a placeholder image if image prop is not provided', () => {
    const wrapper = mount(Image, {
      props: {
        ...mockImageProps,
        image: undefined
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(noImageUrl)
  })
})
