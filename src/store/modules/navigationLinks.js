export default {
    state: {
        currentlyActiveRouteName : "Home page",
        navigationLinks : [
            {
                "Title" : "Home",
                "Route" : "/",
                "RouteName" : "Home page",
                "Position" : "Navbar",
                "Access level required" : 0
            },
            {
                "Title" : "Projects",
                "Route" : "/projects",
                "RouteName" : "My projects",
                "Position" : "Navbar",
                "Access level required" : 0
            },
            {
                "Title" : "Project",
                "Route" : "/project",
                "RouteName" : "Project",
                "Position" : "Hidden",
                "Access level required" : 0
            },
            {
                "Title" : "Admin panel",
                "Route" : "/admin",
                "RouteName" : "Admin panel",
                "Position" : "Navbar",
                "Access level required" : 2
            },
            {
                "Title" : "Manage projects",
                "Route" : "/projects/manage",
                "RouteName" : "Manage projects",
                "Position" : "Hidden",
                "Access level required" : 2
            },
            {
                "Title" : "Manage users",
                "Route" : "/users/manage",
                "RouteName" : "Manage users",
                "Position" : "Hidden",
                "Access level required" : 2
            },
            {
                "Title" : "Text array test page",
                "Route" : "/tArray",
                "RouteName" : "Text array test page",
                "Position" : "Navbar",
                "Access level required" : 2
            },
            // {
            //     path : "/tArray", component: TextArrayTestPage, name : "Text array test page"
            //   }
            {
                "Title" : "Login",
                "Route" : "/login",
                "RouteName" : "Login",
                "Position" : "Navbar",
                "Access level required" : -1
            },
            {
                "Title" : "Register",
                "Route" : "/register",
                "RouteName" : "Register",
                "Position" : "Navbar",
                "Access level required" : -1
            }
        ]
    },
    mutations : {
        changeCurrentlyActiveRouteName(state, newActiveRouteName){
            state.currentlyActiveRouteName = newActiveRouteName;
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
        getNavbarLinksForActiveUser(state, getters){
            return getters.getNavigationLinksForActiveUser.filter(Link => Link.Position === "Navbar");
        },
        getCurrentlyActiveLink(state){
            return state.currentlyActiveRouteName;
        }
    }
}