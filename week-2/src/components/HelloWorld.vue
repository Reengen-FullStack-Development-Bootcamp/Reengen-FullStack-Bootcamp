<template>
  <div class="hello">
    <h2>2. hafta</h2>
    {{ number }}
    <div>
      <slot name="header"/>
      <button @click="alertTitle(title)">click</button>
      <button @click="number++">+</button>
      <button @click="addChar">add</button>
      <slot name="content" ./>
      {{ titleSize }}
    </div>
    <div>
   <span v-font-size.foo="45">
   {{ name | capitalize }}
   </span>
    </div>
    <div>
   <span v-font-size.foo="45">
   {{ basket | convertUsd | addParity }} -  {{ basket }}
   </span>
    </div>
    <div>
      --------------------------------
      <span v-font-size.foo="45">
   {{ parityValue }}
   </span>
    </div>
  </div>
</template>

<script>
import {global} from '@/mixins/global'

export default {
  name: 'HelloWorld',
  mixins: [global],
  props: {
    title: String,
  },
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    convertUsd(value) {
      if (!value) return ''
      return (value * 9.60).toFixed(2)
    },
    addParity(value) {
      if (!value) return ''
      return value + ' $'
    },
  },
  data() {
    return {
      name: 'patika',
      basket: 12
    }
  },
  methods: {
    addChar() {
      this.title = this.title + '+'
      this.$emit('addChar', this.title)
    }
  },
  computed: {
    parityValue() {
      let value = this.basket
      return (value * 9.60).toFixed(2) + ' $'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
