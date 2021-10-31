<template>
	<div>
		<div v-if="movieDetails !== []">
			<h4>{{ movieDetails.title }}</h4>
			<div v-if="movieDetails.image">
				<b-img :src="movieDetails.image.url" fluid />
			</div>
		</div>
		<b-spinner v-else variant="primary" />
	</div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
	name: "MovieDetails",
	computed: {
		...mapState(['movieDetails'])
	},
	methods: {
		...mapActions(['getMovieDetail']),
		...mapMutations(['SET_MOVIE_DETAIL'])
	},
	created() {
		if (this.$route.params.id) {
			this.getMovieDetail(this.$route.params.id)
		}
	},
	beforeDestroy() {
		this.getMovieDetail({type: 'del'})
	}
}
</script>

<style scoped>

</style>
