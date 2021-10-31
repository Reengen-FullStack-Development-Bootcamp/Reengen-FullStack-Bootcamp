<template>
  <div>
    About
    <button @click="goHelp">Go Help</button>
    {{ $route.params }}
  </div>
</template>

<script>
export default {
  name: "About",
  methods: {
    goHelp() {
      this.$router.push({path: '/help', params: {msg: 'patika'}})
    },
  },
  created() {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>
