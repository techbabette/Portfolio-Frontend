<template>
    <div class="row align-content-center form-group">
        <TextInput v-model="localUserInformation.username" :errorMessage="errors.usernameError" label="Username*" class="my-2"/>
        <TextInput v-model="localUserInformation.password" :errorMessage="errors.passwordError" label="Password (Unchanged if left empty)" class="my-2"/>
        <div>
            <label for="userRoleSelect" class="form-label">Permission level</label>
            <select class="form-control" id="userRoleSelect" name="permissionSelect*" v-model="localUserInformation.role">
            <option v-for="userRole, index in allRolesAvailable" :key="index" :value="userRole">{{ makeUpperCase(userRole) }}</option>
            </select>
        </div>
        <button @click="SubmitChanges" class="btn PrimaryButton col-2 my-2">Edit user</button>
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
    computed : {
        allRolesAvailable : function(){
            return this.$store.getters.getAllUserRoles;
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
        makeUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}
</script>