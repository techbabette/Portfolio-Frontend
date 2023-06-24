import axios from "axios"

export default {
    state: {
        projects : []
    },
    mutations : {
        addNewProject(state, newProject){
            state.projects.push(newProject);
        },
        setProjects(state, newArrayOfProjects){
            state.projects = newArrayOfProjects;
        }
    },
    getters: {
        getAllProjects(state){
            return state.projects;
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
        }
    }
}