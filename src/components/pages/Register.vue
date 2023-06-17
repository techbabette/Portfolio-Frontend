<template>
    <div class="row">
        <form class="w-50 my-auto mx-auto">
            <h2>Register new account</h2>
            <div class="mb-3">
                <label for="usernameInput" class="form-label">Username</label>
                <input type="text" v-model="registrationRequestInformation.username" class="form-control" id="usernameInput">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" v-model="registrationRequestInformation.password" class="form-control" id="exampleInputPassword1">
            </div>
            <button @click="attemptRegistration()" class="btn PrimaryButton">Register</button>
        </form>
    </div>
</template>
<script>
export default{
    name : "RegisterPage",
    data() {
        return {
            registrationRequestInformation: {
                username: "pera1",
                password: "sifra1"
            }
        }
    },
    methods : {
        async attemptRegistration (){
            let successfulRegistration = await this.$store.dispatch("attemptRegistration", this.registrationRequestInformation);

            if(successfulRegistration){
                this.$router.push("/login");
            }
        }
    }
}
</script>