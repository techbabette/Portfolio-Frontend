import axios from "axios"

export default {
    state: {
        projects : [],
        searchParams : {
            SearchText : "",
            AcceptedYears : [],
            AcceptedTechnologies : [],
            SortBy : 3
        },
        favoriteSearchParams : {
            SearchText : "",
            AcceptedYears : [],
            AcceptedTechnologies : ["Javascript"],
            SortBy : 3
        },
        sortOptions : [
            {
                id : 1,
                text : "Year (Newest first)"
            },
            {
                id : 2,
                text : "Year (Oldest first)"
            },
            {
                id : 3,
                text : "Number of technologies used (Highest first)"
            },
            {
                id : 4,
                text : "Number of technologies used (Lowest first)"
            }
        ]
    },
    actions : {
        async getProjectsFromApi({commit}){
            try{
                let response = await axios.get("https://zxcwmbjxzc.execute-api.eu-north-1.amazonaws.com/projects");
                commit("setProjects", response.data);
            }
            catch(err){
                console.log("There was an error communicating with the server");
            }
        },
        createNewProject({commit, state}, projectInformationSent){
            let result = {};

            let hasErrors = false;

            result.errors = {};

            if(!projectInformationSent.Name){
                result.errors.projectNameError = "Project name cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent["Preview image link"]){
                result.errors.imagePreviewError = "Preview image link cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent.Description){
                result.errors.projectDescriptionError = "Project description cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent["Year of development"]){
                result.errors.yodError = "Year of development cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent["Github link"]){
                result.errors.GithubLinkError = "Github link cannot be empty";
                hasErrors = true;
            }

            let currentYear = new Date().getFullYear();

            if(projectInformationSent["Year of development"] < 2000 || projectInformationSent["Year of development"] > currentYear){
                result.errors.yodError = "Year of development cannot be before the year 2002 or after the current year";
                hasErrors = true;
            }

            if(!hasErrors){
                projectInformationSent.Id = state.projects[state.projects.length - 1].Id + 1;
                commit("addNewProject", projectInformationSent);
            }

            return result;
        },
        editProject({commit, state}, projectInformationSent){
            let result = {};

            result.errors = {};

            let hasErrors = false;

            let existingProject = state.projects.find(project => project.Id === projectInformationSent.Id)

            if(!existingProject){
                result.errors.generalError = "Project with supplied ID does not exist";
                return result;
            }

            if(!projectInformationSent.Name){
                result.errors.projectNameError = "Project name cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent["Preview image link"]){
                result.errors.imagePreviewError = "Preview image link cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent.Description){
                result.errors.projectDescriptionError = "Project Description cannot be empty";
                hasErrors = true;
            }

            if(!projectInformationSent["Github link"]){
                result.errors.GithubLinkError = "Github link cannot be empty";
                hasErrors = true;
            }

            let currentYear = new Date().getFullYear();

            if(projectInformationSent["Year of development"] < 2000 || projectInformationSent["Year of development"] > currentYear){
                result.errors.yodError = "Year of development cannot be before the year 2002 or after the current year";
                hasErrors = true;
            }

            if(!hasErrors){
                commit("changeProject", projectInformationSent);
            }

            return result;
        },
        deleteProject({commit, state}, projectIdSent){
            let result = {};

            result.errors = {};

            let existingProject = state.projects.find(project => project.Id === projectIdSent)

            if(!existingProject){
                result.errors.generalError = "Project with supplied ID does not exist";
                return result;
            }

            commit("deleteProject", projectIdSent);

            return result;
        }
    },
    mutations : {
        addNewProject(state, newProject){
            state.projects.push(newProject);
        },
        changeProject(state, newProjectInformation){
            for(let [index, project] of state.projects.entries()){
                if(project.Id === newProjectInformation.Id){
                    state.projects[index] = newProjectInformation;
                    break;
                }
            }
        },
        deleteProject(state, projectId){
            state.projects = state.projects.filter(project => project.Id !== projectId);
        },
        setProjects(state, newArrayOfProjects){
            state.projects = newArrayOfProjects;
        }
    },
    getters: {
        getAllProjects(state){
            return state.projects;
        },
        getSpecificProject: (state) => (id) => {
            return state.projects.find(project => project.Id === parseInt(id));
        },
        getFilteredProjects(state, getters){
            let projectsToFilter = getters.getAllProjects;

            if(state.searchParams.SearchText){
                projectsToFilter = projectsToFilter.
                filter(project => 
                    project.Name.includes(state.searchParams.SearchText) ||
                    project.Technologies.some(tech => tech === state.searchParams.SearchText)
                );
            }

            if(state.searchParams.AcceptedTechnologies.length > 0){
                projectsToFilter = projectsToFilter.filter(project => 
                    project.Technologies.some(tech => state.searchParams.AcceptedTechnologies.includes(tech))
                );
            }

            if(state.searchParams.AcceptedYears.length > 0){
                projectsToFilter = projectsToFilter.filter(project => state.searchParams.AcceptedYears.includes(project['Year of development']));
            }

            return projectsToFilter
        },
        getSortedProjects : (state) => (projects) => {
            let projectsToSort = projects;

            let sortBy = state.searchParams.SortBy;

            if(sortBy === 1){
                return projectsToSort.sort((a, b) => {return b["Year of development"] - a["Year of development"]})
            }

            if(sortBy === 2){
                return projectsToSort.sort((a, b) => {return a["Year of development"] - b["Year of development"]})
            }

            if(sortBy === 3){
                return projectsToSort.sort((a, b) => {return b.Technologies.length > a.Technologies.length})
            }

            if(sortBy === 4){
                return projectsToSort.sort((a, b) => {return a.Technologies.length > b.Technologies.length})
            }

            return projectsToSort;
        },
        getFavoriteProjects : (state, getters, rootState, rootGetters) => (projects) => {
            let FavoriteProjectIds = rootGetters.UserFavorites;

            return projects.filter(project => FavoriteProjectIds.includes(project.Id))
        },
        getYearsOfProjects : () => (projects) => {
            return projects.map(project => {return project["Year of development"]});
        },
        getTechnologiesOfProjects : () => (projects) => {
            let technologies = []

            for(let project of projects){
                for(let tech of project.Technologies){
                    if(!technologies.includes(tech)){
                        technologies.push(tech)
                    }
                }
            }

            return technologies;
        },
        getAllYears(state, getters) {
            return getters.getYearsOfProjects(getters.getAllProjects)
        },
        getAllTechnologies(state, getters) {
            return getters.getTechnologiesOfProjects(getters.getAllProjects)
        },
        getYearsOfFavoriteProjects(state, getters){
            return getters.getYearsOfProjects(getters.getSortedFilteredFavoriteProjects)
        },
        getTechnologiesOfFavoriteProjects(state, getters){
            return getters.getTechnologiesOfProjectsx(getters.getSortedFilteredFavoriteProjects)
        },
        getSortedFilteredProjects(state, getters){
            let projectsToSort = getters.getFilteredProjects;

            return getters.getSortedProjects(projectsToSort);
        },
        getSortedFilteredFavoriteProjects(state, getters){
            return getters.getFavoriteProjects(getters.getSortedFilteredProjects)
        }
    }
}