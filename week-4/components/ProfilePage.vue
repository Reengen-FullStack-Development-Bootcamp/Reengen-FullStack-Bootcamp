<template>
  <form @submit.prevent="onSubmit">
    <input v-model="title" type="text" data-test-id="title-input"/>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('formSubmit', {title: this.title})
    }
  }
}
</script>

