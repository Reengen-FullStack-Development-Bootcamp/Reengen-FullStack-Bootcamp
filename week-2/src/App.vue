<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item href="/help">Help</b-nav-item>
        <router-link to="/profile">Profile </router-link>
        </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
	data() {
		return {
		}
	},
	methods: {
		addChar(e) {
			this.title = e
		}
	},
  watch: {
    $route(to, from) {
      console.log(to, from)
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
