<template>
    <div class="pagenono">
        <h1>NoPage Here!!</h1>
        <h2>{{title}}</h2>
        <div class="mindmap">
            <div class="inputspace">
                <input type="text"><button v-on:click="add">追加</button>
            </div>
            <div>
                <hr>
                {{inf.data['@graph'][0].items}}
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const city = 'https://ci.nii.ac.jp/books/opensearch/search?';
//const city = 'http://weather.livedoor.com/forecast/webservice/json/v1?';
//const city = 'https://api.coindesk.com/v1/bpi/currentprice.json';
export default {
    data(){
        return{
            title: "MindMap",
            inf: null
        }
    },
    mounted(){
        axios.get(city,{
            params:{
                title: 'popo',
                format: 'json'
            }
        }
        ).then(resp => {this.inf = resp})
    },
    methods:{
        add: function() {
            axios.get(city).then((response) => {
                this.textone = reponse;
                return 1;
            });
        }
    }
}
</script>
