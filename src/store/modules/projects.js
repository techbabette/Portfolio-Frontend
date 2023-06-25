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
        editProject({commit, state}, projectInformationSent){
            let result = {};

            result.errors = {};

            let existingProject = state.projects.find(project => project.Id === projectInformationSent.Id)

            if(!existingProject){
                result.errors.generalError = "Project with supplied ID does not exist";
                return result;
            }

            commit("changeProject", projectInformationSent);

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