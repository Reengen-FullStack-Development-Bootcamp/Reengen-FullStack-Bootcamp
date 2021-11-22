import { mount } from '@vue/test-utils'
import ProfilePage from '@/components/ProfilePage.vue'

describe('ProfilePage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ProfilePage)
    expect(wrapper.vm).toBeTruthy()
  })

  test('case 1', () => {
    const wrapper = mount(ProfilePage)

    const input = wrapper.find('[data-test-id="title-input"]')

    const title = 'patika'

    input.setValue(title)
    wrapper.trigger('submit')

    const emitCall = wrapper.emitted('formSubmit')
    expect(emitCall).toHaveLength(1)

    const value = { title }
    expect(wrapper.emitted('formSubmit')[0][0]).toMatchObject(value)
  })
})
