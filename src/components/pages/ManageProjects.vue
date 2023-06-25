<template>
    <div class="row">
        <TextInput v-model="localProjectInformation.Name" label="Project name*"/>
        <TextInput v-model="localProjectInformation['Preview image link']" label="Project image*"/>
        <img :src="localProjectInformation['Preview image link']" alt="Image placeholder" class="img-fluid w-25 my-2"/>
        <label class="form-label" for="ProjectDescription">Description*</label>
        <textarea required="required" class="form-control" id="ProjectDescription" v-model="localProjectInformation.Description"></textarea>
        <TextInput v-model="localProjectInformation['Github link']" label="Github link*"/>
        <TextInput v-model="localProjectInformation['Hosted link']" label="Hosted link"/>
        <TextArrayInput v-model="localProjectInformation.Technologies" label="Technologies used"/>
        <button @click="SubmitChanges" class="btn PrimaryButton col-2">{{ SubmitButtonText }}</button>
    </div>
</template>
<script>
import TextInput from "../inputs/Text.vue"
import TextArrayInput from "../inputs/TextArray.vue"
export default {
    name : "ManageProjectsPage",
    components : {
        TextInput,
        TextArrayInput
    },
    data(){
        return {
            id : this.$route.params.id,
            localProjectInformation : {
                Name : "",
                Description : "",
                "Github link" : "",
                "Hosted link" : "",
                "Preview image link" : "",
                Technologies : []
            },
        }
    },
    mounted(){
        if(this.id==="new"){
            return
        }

        this.localProjectInformation = this.$store.getters.getSpecificProject(this.id);
    },
    computed : {
        dispatchTarget : function(){
            return this.id === "new" ? "createNewProject" : "editProject"
        },
        SubmitButtonText : function(){
            return this.dispatchTarget === "createNewProject" ? "Create project" : "Edit project"
        }
    },
    methods : {
        // async attemptRegistration (e)
        async SubmitChanges(e){
            e.preventDefault();

            this.localProjectInformation.Technologies = this.localProjectInformation.Technologies.filter(tech => tech !== "");

            let result = await this.$store.dispatch(this.dispatchTarget, this.localProjectInformation);

            let success = Object.keys(result.errors).length < 1; 

            if(success){
                this.$router.push("/admin");
                return;
            }
        }
    }
}
</script>