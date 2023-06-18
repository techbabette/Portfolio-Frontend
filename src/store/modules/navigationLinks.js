export default {
    state: {
        currentlyActiveRoute : "/",
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
        changeCurrentlyActiveRoute(state, newActiveRoute){
            state.currentlyActiveRoute = newActiveRoute;
        }
    },
    getters: {
        getNavigationLinksForActiveUser(state, getters, rootState, rootGetters){
            let activeUserLevel = rootGetters.acitveUserAccessLevel;

            //If user is logged out, show all links below or at access level
            if(activeUserLevel === 0){
                return state.navigationLinks.filter(link => link["Access level required"] <= activeUserLevel);
            }

            //If user is logged in, show all links below or at access level bar the ones only shown to logged out users (Where access level required is -1);
            return state.navigationLinks.filter(link => link["Access level required"] <= activeUserLevel && link["Access level required"] != -1);
        },
        getCurrentlyActiveLink(state){
            return state.currentlyActiveRoute;
        }
    }
}