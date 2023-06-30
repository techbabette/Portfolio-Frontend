<template>
    <ProjectList/>
</template>
<script>
import ProjectList from "../ProjectPreviewList.vue"
export default {
    name : "ProjectsPage",
    components : {
        ProjectList
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