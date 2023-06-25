export default {
    state: {
      activeUser: {username : "Logged out", role: "loggedOut", accessLevel : 0, favoriteProjects : new Set() },
      userRoles : {
        "admin" : {
            accessLevel : 2
        },
        "user" : {
            accessLevel : 1
        },
        "loggedOut" : {
            accessLevel : 0
        }
      },
      userAccounts : [
        {
            "id" : 1,
            "username": "pera",
            "password": "sifra1",
            "role": "admin",
            'favoriteProjects' : new Set()
        },
        {
            "id" : 2,
            "username": "mika",
            "password": "sifra1",
            "role": "user",
            'favoriteProjects' : new Set()
        },
        {
            "id" : 3,
            "username": "zika",
            "password": "sifra1",
            "role": "user",
            'favoriteProjects' : new Set()
        }
        ],
    },
    actions : {
        attemptLogin({commit, state}, loginInformationSent){
            let result = {};

            result.errors = {};

            let attemptedUsername = loginInformationSent.username;

            let attemptedAccount = state.userAccounts.find(userAccount => userAccount.username === attemptedUsername) ?? null;

            if(!attemptedAccount) {
                result.errors.loginError = "Invalid username/password";
                return result;
            }

            if(attemptedAccount.password !== loginInformationSent.password) {
                result.errors.loginError = "Invalid username/password";
                return result;
            }

            commit("setActiveUser", attemptedAccount);

            return result;
        },
        attemptRegistration({commit, state}, registrationInformationSent){
            let result = {};

            result.errors = {};

            if(state.userAccounts.some(account => account.username == registrationInformationSent.username)){
                result.errors.usernameError = "Account with this username already exists"
                return result;
            }

            let newUserAccount = JSON.parse(JSON.stringify(registrationInformationSent));

            newUserAccount.role = "user";

            newUserAccount.favoriteProjects = new Set();

            commit("createNewUser", newUserAccount);

            return result;
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
                state.activeUser = { username : "Logged out", role: "loggedOut", favoriteProjects : new Set() }
                return;
            }

            state.activeUser = newUserObject;
        }
    },
    getters: {
        username(state) {
            return state.activeUser.username
        },
        role(state) {
            return state.activeUser.role
        },
        users(state) {
            return state.userAccounts
        },
        acitveUserAccessLevel(state, getters){
            return state.userRoles[getters.role].accessLevel;
        }
    }
}