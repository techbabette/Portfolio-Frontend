<template>
    <div>
        <h1>My projects</h1>
        <Project v-for="Project,index in Projects" :key = "index" 
        :ProjectName ="Project.Name" :ProjectDescription="Project.Description" :ProjectTechnologies="Project.Technologies"
        :ProjectThumbnailImage = "Project['Preview image link']" :NumberByOrder="index"
        :ProjectRepositoryLink = "Project['Github link']" :ProjectDemoLink="Project['Hosted link']"/>
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