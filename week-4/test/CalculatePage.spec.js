import { mount } from '@vue/test-utils'
import CalculatePage from '@/components/CalculatePage.vue'

describe('CalculatePage', () => {
  test('is a Vue instance & span html', () => {
    const wrapper = mount(CalculatePage)
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.html()).toContain('<span>0</span>')
  })

  test('case 1', async () => {
    const wrapper = mount(CalculatePage)
    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    const randomNumber = parseInt(wrapper.find('span').element.textContent)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThan(10)
  })

  test('case 2', async () => {
    const min = 1000
    const max = 2000
    const wrapper = mount(CalculatePage, {
      propsData: {
        min,
        max,
      },
    })
    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    const randomNumber = parseInt(wrapper.find('span').element.textContent)
    expect(randomNumber).toBeGreaterThanOrEqual(min)
    expect(randomNumber).toBeLessThan(max)
  })
})
