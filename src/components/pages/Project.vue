<template>
    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-6 p-4 SingleProject">
            <h2>{{ currentProject.Name }}</h2>
            <img :src="currentProject['Preview image link']" :alt="currentProject.name" class="img-fluid">
            <p class="my-1">{{ currentProject.Description }}</p>
            <div v-if="HasTechnologies">
                <p class="my-0">Technologies used: </p>
                <span class="btn btn-info mx-1 my-1" v-for="Technology,index in currentProject.Technologies" :key="index"> {{ Technology }}</span>
            </div>
            <p>Made in {{ currentProject.ProjectYearOfDevelopment }}</p>
            <div>
                <p class="my-0">Links: </p>
                <a class="btn PrimaryButton mx-1 my-1" v-if="currentProject['Github link']" :href="currentProject['Github link']">Github Link</a>
                <a class="mx-1 my-1 btn SecondaryButton" v-if="currentProject['Hosted link']" :href="currentProject['Hosted link']">Live demo</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "SingleProjectPage",
    data() {
        return {
            id : this.$route.params.id
        }
    },
    computed: {
        currentProject: function(){
            return this.$store.getters.getSpecificProject(this.id);
        },
        HasTechnologies : function(){
            return this.currentProject.ProjectTechnologies && this.currentProject.ProjectTechnologies.length > 0;
        }
    }
}
</script>
<style scoped>
.SingleProject{
    background-color: #292929; 
    color: #fafafa;
    border: 1px solid black;
    border-radius: 2px;
}
</style>