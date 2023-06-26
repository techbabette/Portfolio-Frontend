<template>
    <div class="row">
        <form class="w-50 my-auto mx-auto">
        <h2>Log in to your account</h2>
        <div class="mb-3">
            <TextInput v-model="loginRequestInformation.username" label="Username"/>
        </div>
        <div class="mb-3">
            <TextInput v-model="loginRequestInformation.password" type="password" label="Password"/>
        </div>
        <p v-if="errors.loginError" class="alert alert-danger py-2 my-1">{{ errors.loginError }}</p>
        <button @click="attemptLogin" class="btn PrimaryButton">Attempt login</button>
</form>
    </div>
</template>
<script>
import TextInput from "../inputs/Text.vue"
export default{
    name : "LoginPage",
    components : {
        TextInput
    },
    data() {
        return {
            loginRequestInformation: {
                username: "pera",
                password: "sifra1"
            },
            errors : {}
        }
    },
    methods : {
        async attemptLogin (e){
            e.preventDefault();

            let loginResult = await this.$store.dispatch("attemptLogin", this.loginRequestInformation);

            let loginSuccess = Object.keys(loginResult.errors).length < 1;

            this.errors = loginResult.errors

            if(loginSuccess){
                this.loginAttemptError = "";
                this.$router.push("/");
                return;
            }
        }
    }
}
</script>