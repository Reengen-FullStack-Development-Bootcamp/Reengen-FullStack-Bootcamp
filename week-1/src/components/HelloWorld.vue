<template>
  <div >
    <h5>{{ msg }}</h5>
    <div v-show="checkboxValue">
      {{content }} / customize this project,<br>
	  <div v-for="(item,i) in items" :key="'name-'+ i" >
		  {{ item.name }} - {{ item.note }}
	  </div>
	</div>
	  <input v-model="checkboxValue" type="radio" id="html" name="fav_language" value="HTML">
	  <label for="html">HTML</label><br>
	  <input v-model="checkboxValue" type="radio" id="css" name="fav_language" value="CSS">
	  <label for="css">CSS</label><br>
	  <input v-model="checkboxValue" type="radio" id="javascript" name="fav_language" value="JavaScript">
	  <label for="javascript">JavaScript</label><br>

	  <span :class="className">
	    {{ checkboxValue }} - {{ className }}
	  </span>
  </div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: {
			default: 'hello',
			required: true,
			type: String
		},
		usd: Number,
	},
	data() {
  		return {
  			show: true,
  			content: 'For a guide and recipes on how to configure',
			items: [
				{ name: 'turhan', note: 10},
				{ name: 'canberk', note: 10},
				{ name: 'ata', note: 10},
			],
			contentHtml: `<h2>Html content</h2>`,
			checkboxValue: null,
			name: 'canberk'
		}
	},
	computed: {
		value() {
			console.log("computed-")
			return this.usd * 9.2
		},
		className() {
			if (this.checkboxValue === 'HTML') {
				return 'html-content'
			} else if (this.checkboxValue === 'CSS') {
				return 'css-content'
			} else return ''
		}
	},
	beforeCreate() {
		console.log("beforeCreate-")
	},
	created() {
		this.loglama("created")
	},
	beforeMount() {
		this.loglama("beforeMount")
	},
	mounted() {
		this.loglama("mounted")
	},
	beforeUpdate() {
		this.loglama("beforeUpdate")
	},
	updated() {
		this.loglama("beforeUpdate")
	},
	beforeDestroy() {
		this.loglama("beforeDestroy")
	},
	destroyed() {
		this.loglama("destroyed")
	},
	methods: {
		chanceValue() {
			this.checkboxValue = !this.checkboxValue
			this.loglama('logggg--'+ this.value)
		},
		loglama(val) {
			console.log(val)
		}
	},
	watch: {
		checkboxValue( val) {
			console.log("yenideğer-"+val)
			this.loglama("watch")
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 50px 0 0;
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
.edit-area {
 margin: 0 10px;
	font-size: 30px;
}
.html-content {
	font-size: 30px;
}
.css-content {
	font-size: 60px;
}
</style>
