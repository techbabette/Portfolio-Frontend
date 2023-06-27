<template>
    <div class="row">
        <TextInput v-model="localProjectInformation.Name" :errorMessage="errors.projectNameError" label="Project name*"/>
        <TextInput v-model="localProjectInformation['Preview image link']" :errorMessage="errors.imagePreviewError" label="Project image*"/>
        <img :src="localProjectInformation['Preview image link']" alt="Image preview" class="img-fluid w-25 my-2"/>
        <label class="form-label my-0" for="ProjectDescription">Description*</label>
        <textarea required="required" class="form-control" id="ProjectDescription" v-model="localProjectInformation.Description"></textarea>
        <p v-if="errors.projectDescriptionError" class="alert alert-danger py-2 my-1">{{ errors.projectDescriptionError }}</p>
        <TextInput v-model="localProjectInformation['Github link']" :errorMessage="errors.GithubLinkError" label="Github link*"/>
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
            errors : {}
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
        async SubmitChanges(e){
            e.preventDefault();

            this.localProjectInformation.Technologies = this.localProjectInformation.Technologies.filter(tech => tech !== "");

            let result = await this.$store.dispatch(this.dispatchTarget, this.localProjectInformation);

            let success = Object.keys(result.errors).length < 1; 

            this.errors = result.errors

            if(success){
                this.$router.back();
                return;
            }
        }
    }
}
</script>