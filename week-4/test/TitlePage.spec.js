import { mount } from '@vue/test-utils'
import TitlePage from '@/components/TitlePage'

describe('TitlePage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TitlePage)
    expect(wrapper.vm).toBeTruthy()
  })

  test('inital button visibility must be false', () => {
    const wrapper = mount(TitlePage)
    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  test('show me', async () => {
    const wrapper = mount(TitlePage)
    await wrapper.setData({ showMe: true })

    expect(wrapper.vm.showMe).toBe(true)
  })
})
