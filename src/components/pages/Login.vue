<template>
    <div class="row">
        <form class="w-50 my-auto mx-auto">
        <h2>Log in to your account</h2>
        <div class="mb-3">
            <label for="usernameInput" class="form-label">Username</label>
            <input type="text" v-model="loginRequestInformation.username" class="form-control" id="usernameInput">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" v-model="loginRequestInformation.password" class="form-control" id="exampleInputPassword1">
        </div>
        <button @click="attemptLogin()" class="btn PrimaryButton">Attempt login</button>
</form>
    </div>
</template>
<script>
export default{
    name : "LoginPage",
    data() {
        return {
            loginRequestInformation: {
                username: "pera",
                password: "sifra1"
            }
        }
    },
    methods : {
        async attemptLogin (){
            let successfulLogin = await this.$store.dispatch("attemptLogin", this.loginRequestInformation);

            if(successfulLogin){
                this.$router.push("/");
            }
        }
    }
}
</script>