<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld :msg="title" :usd="5"/>-->
	  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
		  <template #button-content>
			  &#128722;
			  <b-badge variant="light">{{ basketAllItemCount }}</b-badge>
		  </template>
		  <b-dropdown-item v-show="basket.length === 0">
			  sepet boş
		  </b-dropdown-item>
		  <b-dropdown-item v-for="(el,i) in basket" :key="i">
			  {{ el.title }} - {{ (el.price * el.count).toFixed(2) }}$
			  <b-button class="mx-2" @click="productCal({value: el, type: '-'})" variant="dark" size="sm">-</b-button>
			  <b-button class="mx-2" @click="productCal({value: el, type: '+'})" variant="success" size="sm">+</b-button>
			  <b-button @click="productCal({value: el, type: 'del'})" variant="danger" size="sm">X</b-button>
		  </b-dropdown-item>
	  </b-dropdown>
	<b-row class="d-flex flex-row justify-content-around">
		<product-card
			v-for="(item, i) in productInfoList"
			:key="i"
			:info="item"
			@addProduct="productCal({value: $event, type: 'add'})"
		/>
	</b-row>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ProductCard from './components/ProductCard'
export default {
	name: 'App',
	components: {
	  ProductCard
	},
	data () {
		return{
			title: 'Welcome to Your Vue.js App',
			productInfoList: [
				{ title: 'Erikli', summary: 'Uludağın zirvesinden', rating: 4, price: 1.2},
				{ title: 'Sultan', summary: 'Suların sultanı', rating: 3, price: 1.3},
				{ title: 'Hayat', summary: 'Su hayattır, hayat güzeldir', rating: 4, price: 1.2},
				{ title: 'Musluk', summary: 'Pratiğim', rating: 5, price: 0.4},
			],
			basket: []
		}
	},
	computed: {
		basketAllItemCount() {
			let count = 0
			for (let i = 0; i < this.basket.length; i++) {
				count += this.basket[i].count
			}
			return count
		}
	},
	methods: {
		productCal(val) {
			let index = this.basket.findIndex(el => el.title === val.value.title)
			switch (val.type) {
				case 'add':
					if (index >= 0) {
						this.basket[index].count++
					} else {
						this.basket.unshift({...val.value, count: 1 })
					}
					break;
				case '+':
					this.basket[index].count++
					break;
				case '-':
					if (this.basket[index].count > 1) {
						this.basket[index].count--
					} else {
						this.basket.splice(index,1)
					}
					break;
				case 'del':
					this.basket.splice(index,1)
					break;
				default:
			}
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
