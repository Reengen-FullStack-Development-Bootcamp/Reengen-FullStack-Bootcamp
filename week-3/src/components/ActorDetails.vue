<template>
	<div>
		<div v-if="actorDetails !== []">
			<h3>{{ actorDetails.name }}</h3>
			<b-row>
				<b-col>
					<b-img :src="actorDetails.image.url" fluid ></b-img>
				</b-col>
				<b-col>
					<p>Birthday: {{ actorDetails.birthDate }}</p>
					<p>Birdplace: {{ actorDetails.birthDate }}</p>
					<p>Height: {{ actorDetails.heightCentimeters }}cm</p>
					<p>{{ actorDetails.miniBios[0].text }}</p>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: "ActorDetails",
	computed: {
		...mapState(['actorDetails'])
	},
	methods: {
		...mapActions(['getActorDetails'])
	},
	created() {
		if (this.$route.params.id) {
			this.getActorDetails(this.$route.params.id)
		}
	},
}
</script>

<style scoped>

</style>
