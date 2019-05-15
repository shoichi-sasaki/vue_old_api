<template>
	<div class="api">
		<h2>{{api_msg}}</h2>
		{{store_msg}}
		{{info}}
		<apis/>
		<button @click = "api">api</button>
	</div>
</template>

<script>
import Apis from "@/components/Apis"
import axios from 'axios'
export default{
	data(){
		return{
			api_msg: "このページでAPIを搭載していきます",
			store_msg: this.$store.state.task,
			info: null
		}
	},
	components:{Apis},
	methods: {
		api: function(){
			axios
			.get('http://weather.livedoor.com/forecast/webservice/json/v1?city=400040')
			.then(reponse => (this.info = reponse))
		}
	}
}
</script>

