<template>
    <div class="row">
        <form class="w-50 my-auto mx-auto">
            <h2>Register new account</h2>
            <div class="mb-3">
                <TextInput v-model="registrationRequestInformation.username" :errorMessage="errors.usernameError" type="Text" label="Username"/>
            </div>
            <div class="mb-3">
                <TextInput v-model="registrationRequestInformation.password" :errorMessage="errors.passwordError" type="password" label="Password"/>
            </div>
            <button @click="attemptRegistration" class="btn PrimaryButton">Register</button>
        </form>
    </div>
</template>
<script>
import TextInput from "../inputs/Text.vue"
export default{
    name : "RegisterPage",
    components : {
        TextInput
    },
    data() {
        return {
            registrationRequestInformation: {
                username: "pera1",
                password: "sifra1"
            },
            errors : {},
        }
    },
    methods : {
        async attemptRegistration (e){
            e.preventDefault();

            let registrationResult = await this.$store.dispatch("attemptRegistration", this.registrationRequestInformation);

            let registrationSuccess = Object.keys(registrationResult.errors).length < 1; 

            this.errors = registrationResult.errors

            if(registrationSuccess){
                this.$router.push("/login");
                return;
            }
        }
    }
}
</script>