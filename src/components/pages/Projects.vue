<template>
    <div>
        <h1>My projects</h1>
        <div class="ProjectBorder">
        <Project v-for="Project,index in Projects" :key = "index" 
        :ProjectId="Project.Id" :ProjectYearOfDevelopment="Project['Year of development']"
        :ProjectName ="Project.Name" :ProjectDescription="Project.Description" :ProjectTechnologies="Project.Technologies"
        :ProjectThumbnailImage = "Project['Preview image link']" :NumberByOrder="index"
        :ProjectRepositoryLink = "Project['Github link']" :ProjectDemoLink="Project['Hosted link']"/>
        </div>
    </div>
</template>
<script>
import Project from "../Project.vue"
export default {
    name : "ProjectsPage",
    components : {
        Project
    },
    computed : {
        Projects : function(){
            return this.$store.getters.getAllProjects;
        }
    }
}
</script>
<style scoped>
.ProjectBorder{
    padding: 0 30px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #292929;
}
</style>