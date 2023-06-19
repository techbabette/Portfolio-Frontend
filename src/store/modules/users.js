export default {
    state: {
      activeUser: { username : "Logged out", role: "loggedOut", accessLevel : 0, favoriteProjects : new Set() },
      userAccounts : [
        {
            "username": "pera",
            "password": "sifra1",
            "role": "admin",
            "accessLevel" : 2,
            'favoriteProjects' : new Set()
        },
        {
            "username": "mika",
            "password": "sifra1",
            "role": "user",
            "accessLevel" : 1,
            'favoriteProjects' : new Set()
        },
        {
            "username": "zika",
            "password": "sifra1",
            "role": "user",
            "accessLevel" : 1,
            'favoriteProjects' : new Set()
        }
        ],
    },
    actions : {
        attemptLogin({commit, state}, loginInformationSent){
            let attemptedUsername = loginInformationSent.username;

            let attemptedAccount = state.userAccounts.find(userAccount => userAccount.username === attemptedUsername) ?? null;

            if(!attemptedAccount) return false;

            if(attemptedAccount.password !== loginInformationSent.password) return false;

            commit("setActiveUser", attemptedAccount);

            return true;
        },
        attemptRegistration({commit}, registrationInformationSent){
            if(!registrationInformationSent) return false;

            let newUserAccount = registrationInformationSent;

            newUserAccount.role = "user";

            newUserAccount.accessLevel = "1";

            newUserAccount.favoriteProjects = new Set();

            commit("createNewUser", newUserAccount);

            return true;
        },
        signUserOut({commit}){
            commit("setActiveUser", null);

            return true;
        }
    },
    mutations: {
        createNewUser(state, newUserObject){
            state.userAccounts.push(newUserObject);
        },
        setActiveUser(state, newUserObject){
            if(!newUserObject){
                state.activeUser = { username : "Logged out", role: "loggedOut", accessLevel : 0, favoriteProjects : new Set() }
                return;
            }

            state.activeUser = newUserObject;
        }
    },
    getters: {
        username(state) {
            return state.activeUser.username
        },
        isAdmin(state) {
            return state.activeUser.accessLevel > 1
        },
        role(state) {
            return state.activeUser.role
        },
        users(state) {
            return state.userAccounts
        },
        acitveUserAccessLevel(state){
            return state.activeUser.accessLevel;
        }
    }
}