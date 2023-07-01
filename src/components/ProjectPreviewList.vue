<template>
    <div>
        <h1>{{ ProjectListLabel }}</h1>
        <div class="row" v-if="ShowSearchElements">
            <TextInput class="col-12 col-md-2" v-model="KeywordSearch" label="Search keyword"/>
            <SelectInput class="col-12 col-md-2" v-model="CurrentSort" :items="SortOptions" textProperty="text" valueProperty="id" label="Sort by"/>
        </div>
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
import TextInput from "./inputs/Text.vue"
import SelectInput from "./inputs/Select.vue"
export default {
    name : "FavoriteProjectsPage",
    components : {
        ProjectPreview,
        TextInput,
        SelectInput
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
        PageIdentifier : {
            Type : String,
            default : "Default page"
        },
        FavoritesOnly : {
            Type : Boolean,
            default : false
        }
    },
    computed : {
        Projects : function(){
            return this.$store.getters[this.ProjectListGetter];
        },
        HasProjects : function(){
            return this.Projects && this.Projects.length > 0;
        },
        ProjectListGetter : function(){
            return this.ShowSearchElements ? "getProjectsForPreviewList" : "getAllProjects"
        },
        SortOptions : function(){
            return this.$store.getters.getProjectSortOptions
        },
        CurrentSort : {
            get () { 
                return this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier].SortBy;
            },
            set (value) {
                this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier].SortBy = value;
            }
        },
        KeywordSearch : {
            get () { 
                return this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier].SearchText;
            },
            set (value) {
                this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier].SearchText = value;
            }
        }
    },
    beforeMount(){
        if(!this.ShowSearchElements){
            this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier] = 
            {
                SearchText : "",
                AcceptedYears : [],
                AcceptedTechnologies : [],
                SortBy : 1,
                FavoritesOnly : this.FavoritesOnly
            }
            this.$store.state.projects.activePage = this.PageIdentifier

            return
        }

        let searchParamsAlreadyExist = false;

        if(this.$store.state.projects.searchParamsForEachPage){
            searchParamsAlreadyExist = this.PageIdentifier in this.$store.state.projects.searchParamsForEachPage
        }

        if(this.ShowSearchElements && searchParamsAlreadyExist){
            this.$store.state.projects.activePage = this.PageIdentifier

            return
        }

        this.$store.state.projects.searchParamsForEachPage[this.PageIdentifier] = 
            {
                SearchText : "",
                AcceptedYears : [],
                AcceptedTechnologies : [],
                SortBy : 1,
                FavoritesOnly : this.FavoritesOnly
            }
            this.$store.state.projects.activePage = this.PageIdentifier
    }
}
</script>
<style>
.ProjectBorder{
    padding: 0 30px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #292929;
    margin: 15px 0;
}
@media only screen and (min-width: 992px) {
    .ProjectBorder{
        margin: 10px 0;
    }
}
</style>