<template>
    <p>this is dashboard page</p>
    <p>hello <span class="uName">{{ username }}</span></p>
    <button v-on:click="logout">Logout</button>
</template>
<script>
export default{
    name:'dashboardView',
    data(){
        return{
            username:null
        };
    },
    created(){
        const user = JSON.parse(localStorage.getItem('user'));
        this.username = user.username
    },
    methods:{
        logout(){
            localStorage.removeItem('user')
            this.$router.push('/')
        }
    }

}
</script>
<style>
.uName{
    color: rgb(41, 41, 198);
    font-weight: bold;
}
</style>