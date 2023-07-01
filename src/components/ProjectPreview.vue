<template>
    <div class="row SingleProject my-3 animated bounce infinite" :data-aos="SlideDirection" data-aos-delay="100"
    :class="{'flex-row-reverse' : IsOdd, 'EvenProjectBorder' : !IsOdd, 'OddProjectBorder' : IsOdd}">
        <div class="col-12 col-md-4 p-2 border-black position-relative img-padding">
            <img :src="ProjectThumbnailImage" :alt="ProjectName" class="img-fluid img-round">
            <div class="SaveIcon" role="button" @click="flipUserProjectFavorite" :class="{'SaveIconRight' : IsOdd, 'SaveIconLeft' : !IsOdd}" v-accessLevel="1">
                <IconifyIcon :icon="SaveIconClass" />
            </div>
        </div>
        <div class="col-12 col-md-8 p-2 px-4">
            <h2 class="d-inline" :class="{'PrimaryTextColor' : IsOdd, 'SecondaryTextColor' : !IsOdd}" role="button" @click="OpenProjectPage(ProjectId)">{{ ProjectName }}</h2>
            <div v-accessLevel="2" class="d-inline" @click="OpenProjectEditPage(ProjectId)">
                <span class="iconify mx-1" role="button" data-icon="lucide:edit"></span>
            </div>
            <p>{{ ProjectDescription }}</p>
            <p v-if="HasTechnologies">Technologies used:
                <span class="btn btn-info mx-1 my-1" v-for="Technology, index in ProjectTechnologies" @click="addTechnologyToFilter(Technology)" :key="index">{{ Technology }} </span>
            </p>
            <p>Made in {{ ProjectYearOfDevelopment }}</p>
            <p>
                <a class="btn" :class="{'AccentButton' : !IsOdd, 'PrimaryButton': IsOdd}" :href="ProjectRepositoryLink">Github Link</a>
                <a class="mx-md-2 btn SecondaryButton" v-if="ProjectDemoLink" :href="ProjectDemoLink">Live demo</a>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name : "SingleProject",
    props : {
        ProjectId : {
            Type : Number,
            required : true
        },
        ProjectName : {
            Type : String,
            required : true
        },
        ProjectDescription : {
            Type : String,
            required : true
        },
        ProjectYearOfDevelopment : {
            Type : Number,
            default : 2023
        },
        ProjectTechnologies : {
            Type: Array,
            required : false
        },
        ProjectThumbnailImage : {
            Type : String,
            required : true
        },
        ProjectRepositoryLink : {
            Type : String,
            required : true
        },
        ProjectDemoLink : {
            Type: String,
            required : false
        },
        NumberByOrder : {
            Type : Number,
            required : true
        }
    },
    methods : {
        OpenProjectPage(id){
            this.$router.push({name : "Project", params : {id}})
        },
        OpenProjectEditPage(id){
            this.$router.push({name : "Manage projects", params : {id}})
        },
        flipUserProjectFavorite(){
            this.$store.dispatch("flipUserProjectFavorite", this.ProjectId);
        },
        addTechnologyToFilter(tech){
            let currentParams = this.$store.state.projects.activePage

            let currentTechnologiesFilter = this.$store.state.projects.searchParamsForEachPage[currentParams].AcceptedTechnologies;

            if(currentTechnologiesFilter.includes(tech)){
                this.$store.state.projects.searchParamsForEachPage[currentParams].AcceptedTechnologies = currentTechnologiesFilter.filter(tech => tech !== tech);
            }

            else{
                this.$store.state.projects.searchParamsForEachPage[currentParams].AcceptedTechnologies.push(tech);
            }
        }
    },
    computed : {
        IsOdd : function(){
            return this.NumberByOrder % 2 === 0;
        },
        SlideDirection : function(){
            return this.IsOdd ? "slide-right" : "slide-left"
        },
        HasTechnologies : function(){
            return this.ProjectTechnologies && this.ProjectTechnologies.length > 0;
        },
        IsInUserFavorites : function(){
            return this.$store.getters.IsInUserFavorites(this.ProjectId);
        },
        SaveIconClass : function(){
            return this.IsInUserFavorites ? "teenyicons:save-solid" : "teenyicons:save-outline"
        } 
    }
}
</script>
<style scoped>
.SingleProject{
    background-color: #fafafa; 
    color: #292929;
    border: 1px solid black;
    transition: scale 2s; /* Animation */
    border-radius: 20px;
}
.SaveIcon{
    color: white;
    font-size: 1.5rem;
    position: absolute;
    top: 20px;
    transition: scale 0.5;
}
.SaveIcon:hover{
    scale: 1.2;
}
.SaveIconRight{
    left: 20px;
}
.SaveIconLeft{
    left: 20px;
}
.img-padding{
    padding: 20px;
}
.img-round{
    border-radius: 20px;
}
.SingleProject:hover{
    scale : 1.01;
}
.OddProjectBorder{
    border: 2px solid #8fb4ff;
}
.EvenProjectBorder{
    border: 2px solid #ff8f94;
}
@media only screen and (min-width: 992px) {

    .SaveIcon{
        font-size: 2rem;
    }
    .SaveIconRight{
        left: 30px;
    }
    .SaveIconLeft{
        left:auto;
        right: 30px;
    }
}
</style>