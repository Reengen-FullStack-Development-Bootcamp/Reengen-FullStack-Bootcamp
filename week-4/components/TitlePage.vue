<template>
  <div>
    <h3>Test Page</h3>
    <button v-show="showMe">BtnText</button>
  </div>
</template>

<script>
export default {
  name: 'TitlePage',
  props: {
    maxLength: {
      type: Number,
    }
  },
  data () {
    return {
      showMe: false
    }
  }
}
</script>

