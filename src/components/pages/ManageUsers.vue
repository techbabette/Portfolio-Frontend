<template>
    <div class="row align-content-center">
        <TextInput v-model="localUserInformation.username" :errorMessage="errors.usernameError" label="Username*"/>
        <TextInput v-model="localUserInformation.password" :errorMessage="errors.passwordError" label="Password"/>
        <button @click="SubmitChanges" class="btn PrimaryButton col-2">Edit user</button>
    </div>
</template>
<script>
import TextInput from "../inputs/Text.vue"
export default {
    name : "ManageUsersPage",
    components : {
        TextInput
    },
    data(){
        return {
            localUserInformation : {
                id : this.$route.params.id,
                username : "",
                role : "",
                password : "",
            },
            errors : {}
        }
    },
    mounted(){
        this.localUserInformation = this.$store.getters.userCopyWithoutPassword(this.localUserInformation.id);
    },
    methods : {
         async SubmitChanges(e){
            e.preventDefault();

            let result = await this.$store.dispatch("editUser", this.localUserInformation);

            let success = Object.keys(result.errors).length < 1; 

            this.errors = result.errors;

            if(success){
                this.$router.push("/admin");
                return;
            }
        }
    }
}
</script>