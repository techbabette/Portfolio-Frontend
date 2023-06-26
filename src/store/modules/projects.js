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
            for(let project of state.projects){
                if(project.Id === newProjectInformation.Id){
                    project = newProjectInformation;
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

            if(!projectInformationSent["Github link"]){
                result.errors.GithubLinkError = "Github link cannot be empty";
                hasErrors = true;
            }

            projectInformationSent.Id = state.projects[state.projects.length - 1].Id + 1;

            if(!hasErrors){
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

            if(!hasErrors){
                console.log("here");
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