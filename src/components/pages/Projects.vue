<template>
    <div>
        <h1>Projects page</h1>
        <Project v-for="Project,index in Projects" :key = "index" 
        :ProjectName ="Project.Name" :ProjectDescription="Project.Description" :ProjectTechnologies="Project.Technologies"
        :ProjectThumbnailImage = "Project['Preview image link']" :NumberByOrder="index"/>
    </div>
</template>
<script>
import Project from "../Project.vue"
export default {
    name : "ProjectsPage",
    components : {
        Project
    },
    data() {
        return {
            Projects : [{"Id":1,"Name":"NYCEstate","Description":"A dynamic real estate website made with javascript on the frontend and php on the backend\nAll website content is dynamic and modifiable by admins through the admin panel","Github link":"https://github.com/techbabette/NYCEstateE","Hosted link":"https://nycestate.000webhostapp.com/","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["PHP","MySQL","Javascript","Bootstrap"]},{"Id":2,"Name":"Library Site","Description":"A front-end only application that lets users view and save their favorite books from the local library.","Github link":"https://github.com/techbabette/library-site","Hosted link":"https://techbabette.github.io/library-site/","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["Javascript","jQuery","Bootstrap"]},{"Id":3,"Name":"ARPS","Description":"Multiplayer Advanced Rock Paper Scissors","Github link":"https://github.com/techbabette/Advanced-Rock-Paper-Scissors","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["NodeJS","Socket.io"]},{"Id":4,"Name":"Personal Anki","Description":"Allows users to practice any of the languages available in the wordlists folder","Github link":"https://github.com/techbabette/Personal-Anki","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["Python"]},{"Id":5,"Name":"Library database","Description":"A scalable database complete with, activity logging, triggers, users, optimum design and easy to read documentation","Github link":"https://github.com/techbabette/library-database","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["MSSQL"]}]
        }
    },
    mounted(){
        // let that = this;
        // this.$axios.get("/projects").then((result)=>{console.log(result.data); that.Projects = result.data})
    }
}
</script>