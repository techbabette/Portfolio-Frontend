export default {
    state: {
        currentlyActiveLink : "/",
        navigationLinks : [
            {
                "Title" : "Home",
                "Route" : "/",
                "Access level required" : 0
            },
            {
                "Title" : "Projects",
                "Route" : "/projects",
                "Access level required" : 0
            },
            {
                "Title" : "Admin panel",
                "Route" : "/admin",
                "Access level required" : 2
            },
            {
                "Title" : "Login",
                "Route" : "/login",
                "Access level required" : -1
            },
            {
                "Title" : "Register",
                "Route" : "/register",
                "Access level required" : -1
            }
        ]
    },
    mutations : {
        changeCurrentlyActiveLink(state, newActiveLinkPath){
            state.currentlyActiveLink = newActiveLinkPath;
        }
    },
    getters: {
        getNavigationLinksForActiveUser(state, getters, rootState, rootGetters){
            let activeUserLevel = rootGetters.acitveUserAccessLevel;

            if(activeUserLevel === 0){
                return state.navigationLinks.filter(link => link["Access level required"] <= activeUserLevel);
            }

            return state.navigationLinks.filter(link => link["Access level required"] <= activeUserLevel && link["Access level required"] != -1);
        },
        getCurrentlyActiveLink(state){
            return state.currentlyActiveLink;
        }
    }
}