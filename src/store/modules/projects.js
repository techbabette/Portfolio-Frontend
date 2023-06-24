export default {
    state: {
        projects : [
            {"id":1,"Name":"NYCEstate","Description":"A dynamic real estate website made with javascript on the frontend and php on the backend\nAll website content is dynamic and modifiable by admins through the admin panel","Github link":"https://github.com/techbabette/NYCEstateE","Hosted link":"https://nycestate.000webhostapp.com/","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["PHP","MySQL","Javascript","Bootstrap"]},
            {"id":2,"Name":"Library Site","Description":"A front-end only application that lets users view and save their favorite books from the local library.","Github link":"https://github.com/techbabette/library-site","Hosted link":"https://techbabette.github.io/library-site/","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["Javascript","jQuery","Bootstrap"]},
            {"id":3,"Name":"ARPS","Description":"Multiplayer Advanced Rock Paper Scissors","Github link":"https://github.com/techbabette/Advanced-Rock-Paper-Scissors","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["NodeJS","Socket.io"]},
            {"id":4,"Name":"Personal Anki","Description":"Allows users to practice any of the languages available in the wordlists folder","Github link":"https://github.com/techbabette/Personal-Anki","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["Python"]},
            {"id":5,"Name":"Library database","Description":"A scalable database complete with, activity logging, triggers, users, optimum design and easy to read documentation","Github link":"https://github.com/techbabette/library-database","Preview image link":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg","Technologies":["MSSQL"]}
        ]
    },
    mutations : {
        addNewProject(state, newProject){
            state.projects.push(newProject);
        }
    },
    getters: {
        getAllProjects(state){
            return state.projects;
        }
    }
}