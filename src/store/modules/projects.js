import axios from "axios"

export default {
    state: {
        projects : []
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
        getFavoriteProjectsForActiveUser(state, getters, rootState, rootGetters){
            let FavoriteProjectIds = rootGetters.UserFavorites;

            return getters.getAllProjects.filter(project => FavoriteProjectIds.includes(project.Id));
        }
    },
    actions : {
        async getProjectsFromApi({commit}){
            try{
                let response = await axios.get("http://localhost:3000/projects");
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
    }
}