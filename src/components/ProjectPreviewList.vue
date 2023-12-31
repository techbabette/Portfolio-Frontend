<template>
    <div>
        <h1>{{ ProjectListLabel }}</h1>
        <div class="row SearchHolder" v-if="ShowSearchElements">
            <TextInput class="col-12 col-lg-3" v-model="KeywordSearch" label="Search keyword"/>
            <CheckboxDropdownInput label="Search years" v-model="AcceptedYears" :items="YearOptions" class="col-12 col-lg-3"/>
            <CheckboxDropdownInput label="Search by technology" v-model="AcceptedTechnologies" :items="TechOptions" class="col-12 col-lg-3"/>
            <SelectInput class="col-12 col-lg-3" v-model="CurrentSort" :items="SortOptions" textProperty="text" valueProperty="id" label="Sort by"/>
        </div>
        <div v-if="HasProjects" class="ProjectBorder">
        <ProjectPreview v-for="Project,index in Projects" :key = "index" 
        :ProjectId="Project.Id" :ProjectYearOfDevelopment="Project['Year of development']"
        :ProjectName ="Project.Name" :ProjectDescription="Project.Description" :ProjectTechnologies="Project.Technologies"
        :ProjectThumbnailImage = "Project['Preview image link']" :NumberByOrder="index"
        :ProjectRepositoryLink = "Project['Github link']" :ProjectDemoLink="Project['Hosted link']"
        @TechnologyClicked="addTechnologyToFilter"/>
        </div>
        <p v-else>No projects found</p>
    </div>
</template>
<script>
import ProjectPreview from "./ProjectPreview.vue"
import TextInput from "./inputs/Text.vue"
import SelectInput from "./inputs/Select.vue"
import CheckboxDropdownInput from "./inputs/CheckboxDropdown.vue"
export default {
    name : "FavoriteProjectsPage",
    components : {
        ProjectPreview,
        TextInput,
        SelectInput,
        CheckboxDropdownInput
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
        YearOptions : function(){
            return this.$store.getters.getAllYears.map(year => {return {text : year, value : year}})
        },
        TechOptions : function(){
            return this.$store.getters.getAllTechnologies.map(tech => {return {text : tech, value : tech}})
        },
        AcceptedYears : {
            get () { 
                return this.$store.getters.getCurrentSearchParamValue("AcceptedYears");
            },
            set (value) {
                this.$store.commit("changeCurrentSearchParams", {prop : "AcceptedYears", value})
            }
        },
        AcceptedTechnologies : {
            get () { 
                return this.$store.getters.getCurrentSearchParamValue("AcceptedTechnologies");
            },
            set (value) {
                this.$store.commit("changeCurrentSearchParams", {prop : "AcceptedTechnologies", value})
            }
        },
        CurrentSort : {
            get () { 
                return this.$store.getters.getCurrentSearchParamValue("SortBy");
            },
            set (value) {
                this.$store.commit("changeCurrentSearchParams", {prop : "SortBy", value})
            }
        },
        KeywordSearch : {
            get () { 
                return this.$store.getters.getCurrentSearchParamValue("SearchText");
            },
            set (value) {
                this.$store.commit("changeCurrentSearchParams", {prop : "SearchText", value})
            }
        }
    },
    methods : {
        addTechnologyToFilter(tech){
            if(!this.ShowSearchElements){
                return;
            }

            let currentParams = this.$store.state.projects.activePage

            let currentTechnologiesFilter = this.$store.getters.getCurrentSearchParamValue("AcceptedTechnologies")

            if(currentTechnologiesFilter.includes(tech)){
                this.$store.state.projects.searchParamsForEachPage[currentParams].AcceptedTechnologies = currentTechnologiesFilter.filter(cTech => cTech !== tech);
            }

            else{
                this.$store.state.projects.searchParamsForEachPage[currentParams].AcceptedTechnologies.push(tech);
            }
        }
    },
    beforeMount(){
        let emptySearchParams = {
                SearchText : "",
                AcceptedYears : [],
                AcceptedTechnologies : [],
                SortBy : 1,
                FavoritesOnly : this.FavoritesOnly
        }
        if(!this.ShowSearchElements){
            this.$set(this.$store.state.projects.searchParamsForEachPage, this.PageIdentifier,emptySearchParams)
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

        this.$set(this.$store.state.projects.searchParamsForEachPage, this.PageIdentifier,emptySearchParams)
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
.SearchHolder{
    padding: 10px 30px;
    border-radius: 10px;
    background-color: #292929;
    margin: 15px 0;
    color: #FFF;
}
@media only screen and (min-width: 992px) {
    .ProjectBorder{
        margin: 10px 0;
    }
    .SearchHolder{
        margin: 10px 0;
    }
}
</style>