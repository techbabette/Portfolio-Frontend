<template>
    <div class="row SingleProject my-3 animated bounce infinite" :data-aos="SlideDirection" data-aos-delay="100"
    :class="{'flex-row-reverse' : IsOdd, 'EvenProjectBorder' : !IsOdd, 'OddProjectBorder' : IsOdd}">
        <div class="col-12 col-md-4 p-2 border-black">
            <img :src="ProjectThumbnailImage" :alt="ProjectName" class="img-fluid img-round">
        </div>
        <div class="col-12 col-md-8 p-2 px-4">
            <h2 :class="{'PrimaryTextColor' : IsOdd, 'SecondaryTextColor' : !IsOdd}" role="button" @click="OpenProjectPage(ProjectId)">{{ ProjectName }}</h2>
            <p>{{ ProjectDescription }}</p>
            <p v-if="HasTechnologies">Technologies used:
                <span class="btn btn-info mx-1 my-1" v-for="Technology, index in ProjectTechnologies" :key="index">{{ Technology }} </span>
            </p>
            <p>Made in {{ ProjectYearOfDevelopment }}</p>
            <p>
                <a class="btn" :class="{'AccentButton' : !IsOdd, 'PrimaryButton': IsOdd}" :href="ProjectRepositoryLink">Github Link</a>
                <a class="mx-2 btn SecondaryButton" v-if="ProjectDemoLink" :href="ProjectDemoLink">Live demo</a>
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
        }
    }
}
</script>
<style scoped>
.SingleProject{
    background-color: #292929; 
    color: #fafafa;
    border: 1px solid black;
    transition: scale 2s; /* Animation */
    border-radius: 20px;
}
.img-round{
    padding: 20px;
    border-radius: 8%;
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
</style>