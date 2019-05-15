<template>
  <div class="api_app">
    <div class="api_nv">
      <br v-for="i in 5" :key="i">
      {{this.$store.getters.tasksk}}
    </div>
    <div class="BitCoin">
      <h2>Bitcoin Price Index</h2>
      <p v-for="val in info.data.bpi" :key="val">
        {{val.descriptions}}:
        <span v-html="val.symbol"></span>
        {{val.rate}}
      </p>
      <hr>
    </div>
    <router-view/>
    <input type="text" v-model="title" @keyup.enter="redirectTo">
    <button @click="redirectTo">検索</button>
    <br>
    <hr>
    <br>
    <table border="2" align="center">
      <tr>
        <th class="table_title">タイトル</th>
        <th class="table_writer">作者</th>
        <th class="table_day">出版日</th>
      </tr>
      <tr v-for="vl in this.$store.getters.info3.data['@graph'][0].items" :key="vl">
        <td>{{vl.title}}</td>
        <td>{{vl['dc:creator']}}</td>
        <td>{{vl['dc:date']}}</td>
      </tr>
    </table>
    <hr>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      info: [],
      info2: [],
      title: '',
    }
  },
  mounted() {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      //			.get('https://api.twitter.com/1.1/status/mentions_timeline')
      .then(response => (this.info = response))
    this.$store.commit('get_ajax', {
      one: this,
      nam: 'info2',
      ur: 'https://ci.nii.ac.jp/books/opensearch/search?title=' + this.$store.getters.tasks + '&format=json',
    })
    //		axios
    //			.get('https://ci.nii.ac.jp/books/opensearch/search?title='+this.$store.state.tasks)
    //			.then(response => (this.info2 = response))
  },
  methods: {
    redirectTo: function() {
      this.$store.commit('searchLib', this.title)
      //this.$router.push('API_Cat');
      this.$store.commit('get_ajax', {
        one: this,
        nam: 'info2',
        ur: 'https://ci.nii.ac.jp/books/opensearch/search',
        quer_title: this.$store.state.tasks,
        quer_form: 'json'
      })
      /*axios
				.get('https://ci.nii.ac.jp/books/opensearch/search?title='+this.$store.state.tasks+'&format=json')
			.then(response => (this.info2 = response))*/
    },
  },
}
</script>

<style>
table th{
	padding:5px;
	background-color: blanchedalmond;
}
table td{
	background-color: cornsilk;

}
table{
	border-collapse:collapse;
	width:600px;
}
.table_title{
	width:60%;
}
.table_writer{
	width:25%;
}
</style>
