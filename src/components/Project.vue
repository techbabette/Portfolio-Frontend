<template>
    <div class="row" :class="{'flex-row-reverse' : IsOdd}">
        <div class="col-12 col-md-4">
            <img :src="ProjectThumbnailImage" :alt="ProjectName" class="img-fluid">
        </div>
        <div class="col-12 col-md-8">
            <h2>{{ ProjectName }}</h2>
            <p>{{ ProjectDescription }}</p>
            <p>Technologies used:
                <span v-for="Technology, index in ProjectTechnologies" :key="index">{{ Technology }} </span>
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
        NumberByOrder : {
            Type : Number,
            required : true
        }
    },
    computed : {
        IsOdd : function(){
            return this.NumberByOrder % 2 === 0;
        }
    }
}
</script>