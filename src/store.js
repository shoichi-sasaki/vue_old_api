import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

const URL_BASE = 'https://ci.nii.ac.jp/books/opensearch/';
//module.exports 
	const store2 = new Vue({
	data: {
		//JSONデータ格納用
		search_list: [],
		taskkk: "Here is a task for you!"
	},
	methods: {
		//Ajax通信
		//取得後にGET_AJAX_COMPLETEで通知
		get_ajax(url,name) {
			return axios.get(URL_BASE+url)
			.then((res) => {
				Vue.set(this, name,res.data);
				this.$emit('GET_AJAX_COMPLETE');
			});
		},
		//プロパティを指定してデータを取得
		get_data(name){
			return this.$data[name];
		}
	}
	});
		
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		task: "タスクHere",
		input_msg: "",
		info3:"",
		search_list: [],
		tasksk: "Here is a task for you!",
	},
	getters:{
		task:state => state.task,
		input_msg:state => state.input_msg,
		info3:state => state.info3,
		search_list:state => state.search_list,
		tasksk:state => state.tasksk
	},
	mutations: {
		searchLib (state,inputed_msg){
			state.tasks = inputed_msg
		},
		get_ajax(state,payload){
			console.log(payload.quer_form+payload.ur+"Here is title:"+payload.quer_title);
			/*const myHttpClient = axios.create({
				title : '阿武松',//payload.quer_title,
				format : 'json'//payload.quer_form
			});
			return myHttpClient.get(payload.ur)*/
			return axios.get(payload.ur,{
				params: {
					title: payload.quer_title,
					format: payload.quer_form
				}	
			})
			.then((res) => {
				//Vue.set(this,payload.nam,res.data);
				console.log(res);
				state.info3 = res;
				payload.one.info2 = "here";
				console.log('Here is url:'+payload.ur);
			});
		}
	},
	actions:{
		get_ajaxAction(ctx){
			ctx.commit('get_ajax')
		}
	}
})
export default store
//export default store2
