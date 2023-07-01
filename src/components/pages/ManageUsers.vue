<template>
    <div class="row align-content-center form-group">
        <TextInput v-model="localUserInformation.username" :errorMessage="errors.usernameError" label="Username*" class="my-2"/>
        <TextInput v-model="localUserInformation.password" :errorMessage="errors.passwordError" label="Password (Unchanged if left empty)" class="my-2"/>
        <SelectInput label="Permission level" v-model="localUserInformation.role" :items="allRolesAvailable"/>
        <button @click="SubmitChanges" class="btn PrimaryButton col-2 mx-2 my-2">Edit user</button>
        <button @click="GoBack" class="btn AccentButton col-2 mx-2 my-2">Back</button>
    </div>
</template>
<script>
import TextInput from "../inputs/Text.vue"
import SelectInput from "../inputs/Select.vue"
export default {
    name : "ManageUsersPage",
    components : {
        TextInput,
        SelectInput
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
    beforeMount(){
        this.localUserInformation = this.$store.getters.userCopyWithoutPassword(this.localUserInformation.id);
    },
    computed : {
        allRolesAvailable : function(){
            return this.$store.getters.getAllUserRoles.map(role => {return {text : role, value : role}});
        }
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
        },
        GoBack(e){
            e.preventDefault();

            this.$router.back();
        },
        makeUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}
</script>