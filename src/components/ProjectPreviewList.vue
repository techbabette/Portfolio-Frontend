<template>
    <div>
        <h1>{{ ProjectListLabel }}</h1>
        <div v-if="HasProjects" class="ProjectBorder">
        <ProjectPreview v-for="Project,index in Projects" :key = "index" 
        :ProjectId="Project.Id" :ProjectYearOfDevelopment="Project['Year of development']"
        :ProjectName ="Project.Name" :ProjectDescription="Project.Description" :ProjectTechnologies="Project.Technologies"
        :ProjectThumbnailImage = "Project['Preview image link']" :NumberByOrder="index"
        :ProjectRepositoryLink = "Project['Github link']" :ProjectDemoLink="Project['Hosted link']"/>
        </div>
        <p v-else>No projects found</p>
    </div>
</template>
<script>
import ProjectPreview from "./ProjectPreview.vue"
export default {
    name : "FavoriteProjectsPage",
    components : {
        ProjectPreview
    },
    props : {
        ProjectListLabel : {
            Type : String,
            default : "My projects"
        },
        ShowSearchElements : {
            Type : Boolean,
            default : true
        },
        ProjectListGetter : {
            Type : String,
            default : "getAllProjects"
        }
    },
    computed : {
        Projects : function(){
            return this.$store.getters[this.ProjectListGetter];
        },
        HasProjects : function(){
            return this.Projects && this.Projects.length > 0;
        }
    }
}
</script>
<style>
.ProjectBorder{
    padding: 0 30px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #292929;
}
</style>