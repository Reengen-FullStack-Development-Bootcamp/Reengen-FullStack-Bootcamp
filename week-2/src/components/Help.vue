<template>
  <div>
    <h2>Help</h2>
    <div>

      <b-col class="my-4">
        <b-form-input
            v-model="$v.name.$model"
            placeholder="Name"
            ref="nameInput"
        />
        <b-alert :show="!$v.name.required" variant="danger">Field is required</b-alert>
        <b-alert :show="!$v.name.minLength" variant="danger">Name must have at least {{ $v.name.$params.minLength.min }}
          letters.
        </b-alert>
      </b-col>

      <b-col class="my-4">
        <b-form-input
            v-model.trim="$v.age.$model"
            placeholder="Age"
        />
        <b-alert :show="!$v.age.between" variant="danger">Must be between {{ $v.age.$params.between.min }} and
          {{ $v.age.$params.between.max }}
        </b-alert>
      </b-col>
      <b-col>
        <b-button @click="sendData" :disabled="$v.$invalid" block variant="outline-primary">Button</b-button>
      </b-col>
    </div>
<!--    <component :is="comp" />-->
    <b-col v-show="show">
      <h3 class="my-4" ref="title">{{ text|capitalize }} 'Beyin Feedbacki</h3>
      <b-form-textarea
          id="textarea"
          v-model="text"
          ref="modalInput"
          placeholder="Send Us Your Feedback..."
          rows="3"
          max-rows="6"
      />
    </b-col>
  </div>
</template>

<script>
import {global} from '@/mixins/global'
import Profile from "@/components/Profile";

export default {
  name: "Help",
  props: {
    msg: {
      type: String
    }
  },
  mixins: [global],
  data() {
    return {
      name: '',
      age: null,
      componetName: 'About',
      text: null,
      show: true
    }
  },
  computed: {
    comp() {
      const About = () => import(`@/components/${this.componetName}`)
      if(this.name) return About
      else return Profile
    }
  },
  methods: {
    sendData() {
      // console.log(this.$refs.title.style)
      // alert(this.$refs.nameInput.value)
      // this.show = true
      this.$refs.modalInput.focus()
      this.text = this.$refs.nameInput.value
      this.$refs.title.style.color = 'blue'
      this.$refs.title.style.fontSize = '40px'
    }
  }
}
</script>

<style scoped>

</style>
