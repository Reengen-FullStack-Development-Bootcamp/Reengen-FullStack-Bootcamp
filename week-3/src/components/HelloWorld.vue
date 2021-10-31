<template>
	<div>
		{{ title }}
		<div>
			<input v-model="value" type="number"/>
		</div>
		<button @click="getNumSum">Get Sum</button>
		<div>
			toplam: {{ calNumber }}
		</div>
		<div>
			<span v-html="$italicHTML('toplam plugins ile')" />
			: {{ $numberSum(5) }}
		</div>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
	data() {
		return {
			value: 0
		}
	},
	computed: {
		title() {
			return this.$store.state.title
		},
		calNumber() {
			return this.$store.state.number
		}
	},
	methods: {
		getNumSum() {
			this.$store.dispatch("getNumber", parseInt(this.value));
		}
	}
};
</script>
