<template>
    <div class="row SingleProject my-3 animated bounce infinite" :data-aos="SlideDirection" data-aos-delay="100" style="background-color: #292929; color: #fafafa;" 
    :class="{'flex-row-reverse' : IsOdd, 'EvenProjectBorder' : !IsOdd, 'OddProjectBorder' : IsOdd}">
        <div class="col-12 col-md-4 p-2 border-black">
            <img :src="ProjectThumbnailImage" :alt="ProjectName" class="img-fluid">
        </div>
        <div class="col-12 col-md-8 p-2 px-4">
            <h2 :class="{'PrimaryTextColor' : IsOdd, 'SecondaryTextColor' : !IsOdd}">{{ ProjectName }}</h2>
            <p>{{ ProjectDescription }}</p>
            <p>Technologies used:
                <span v-for="Technology, index in ProjectTechnologies" :key="index">{{ Technology }} </span>
            </p>
            <p>Made in 2023</p>
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
        ProjectName : {
            Type : String,
            required : true
        },
        ProjectDescription : {
            Type : String,
            required : true
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
    computed : {
        IsOdd : function(){
            return this.NumberByOrder % 2 === 0;
        },
        SlideDirection : function(){
            return this.IsOdd ? "slide-right" : "slide-left"
        }
    }
}
</script>
<style scoped>
.SingleProject{
    border: 1px solid black;
    transition: scale 2s; /* Animation */
    border-radius: 2px;
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