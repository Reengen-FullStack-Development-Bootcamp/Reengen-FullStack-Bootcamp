<template>
	<b-card
		:title="info.title"
		img-src="https://picsum.photos/600/300/?image=25"
		img-alt="Image"
		img-top
		tag="article"
		style="max-width: 20rem;"
		class="mb-2"
	>
		<b-card-text>
			{{ info.summary }}
		</b-card-text>
		<b-row class="justify-content-around">
			<div class="d-flex flex-row align-items-center justify-center">
				<span v-for="(el,i) in info.rating"
					  :key="i"
					  class="fa fa-star checked" />
				<span v-for="(el,i) in (5 - info.rating)"
					  :key="'empty-'+i"
					  class="fa fa-star" />
			</div>
			<b-button @click="addToBasket(info)" variant="warning">
				Buy <b-badge variant="light">{{ info.price }} $</b-badge>
			</b-button>
		</b-row>
	</b-card>
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		info: Object
	},
	data() {
		return {

		}
	},
	methods: {
		addToBasket(val) {
			this.$emit('addProduct', val)
		}
	}
}
</script>

<style scoped>
.checked {
	color: orange;
}
</style>
