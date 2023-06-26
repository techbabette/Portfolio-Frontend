export default {
    state: {
      activeUserId: 0,
      userRoles : {
        "admin" : {
            accessLevel : 2
        },
        "user" : {
            accessLevel : 1
        },
        "logged out (blocked)" : {
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

            let accessLevel = state.userRoles[attemptedAccount.role].accessLevel;

            if(accessLevel < 1){
                result.errors.loginError = "Account blocked";
                return result;
            }

            if(attemptedAccount.password !== loginInformationSent.password) {
                result.errors.loginError = "Invalid username/password";
                return result;
            }

            commit("setActiveUser", attemptedAccount.id);

            console.log(result);

            return result;
        },
        attemptRegistration({commit, state}, registrationInformationSent){
            let result = {};

            result.errors = {};

            if(state.userAccounts.some(account => account.username == registrationInformationSent.username)){
                result.errors.usernameError = "Account with this username already exists"
                return result;
            }

            if(registrationInformationSent.username.length < 4){
                result.errors.passwordError = "Username cannot be shorter than six characters"
                return result;
            }

            if(registrationInformationSent.password.length < 6){
                result.errors.passwordError = "Password cannot be shorter than six characters"
                return result;
            }

            let newUserAccount = JSON.parse(JSON.stringify(registrationInformationSent));

            newUserAccount.role = "user";

            newUserAccount.favoriteProjects = new Set();

            commit("createNewUser", newUserAccount);

            return result;
        },
        signUserOut({commit}){
            commit("setActiveUser", 0);

            return true;
        },
        editUser({commit, state}, userInformationSent){
            let result = {};

            result.errors = {};

            let hasErrors = false;

            let changingPassword = false;

            let existingUser = state.userAccounts.find(user => user.id === userInformationSent.id);

            if(!existingUser){
                result.errors.generalError = "User does not exist";
                hasErrors = true;
            }

            if(!userInformationSent.username){
                result.errors.usernameError = "Username cannot be shorter than six characters";
                hasErrors = true;
            }

            if(!userInformationSent.role){
                result.errors.roleError = "User role cannot be empty";
                hasErrors = true;
            }

            if(userInformationSent.password){
                changingPassword = true;
            }

            if(changingPassword && userInformationSent.password.length < 6){
                result.errors.passwordError = "Password cannot be shorter than six characters"
                hasErrors = true;
            }

            if(!changingPassword){
                userInformationSent.password = existingUser.password;
            }

            if(!hasErrors){
                commit("changeUserInformation", userInformationSent);
            }

            return result;
        },
        deleteUser({commit, state}, userIdSent){
            let result = {};

            result.errors = {};

            let existingUser = state.userAccounts.find(user => user.id === userIdSent)

            if(!existingUser){
                result.errors.generalError = "User with supplied ID does not exist";
                return result;
            }

            commit("deleteUser", userIdSent);

            return result;
        }
    },
    mutations: {
        createNewUser(state, newUserObject){
            state.userAccounts.push(newUserObject);
        },
        setActiveUser(state, newUserId){
            if(!newUserId){
                state.activeUserId = 0
                return;
            }

            state.activeUserId = newUserId;
        },
        changeUserInformation(state, newUserObject){
            for(let [index, user] of state.userAccounts.entries()){
                if(user.id === newUserObject.id){
                    state.userAccounts[index] = newUserObject;
                    break;
                }
            }
        },
        deleteUser(state, userId){
            state.userAccounts = state.userAccounts.filter(user => user.id !== userId);
        }
    },
    getters: {
        activeUser(state){
            if(!state.activeUserId) 
            return {
                "id" : 0,
                "username" : "Logged out",
                "password" : "",
                "role" : "logged out (blocked)",
                "favoriteProjects" : new Set()
            }
            return state.userAccounts.find(user => user.id === state.activeUserId);
        },
        username(state, getters) {
            return getters.activeUser.username
        },
        role(state, getters) {
            return getters.activeUser.role
        },
        users(state) {
            return state.userAccounts
        },
        userAccounts(state, getters){
            return getters.users.filter(user => user.id !== 0);
        },
        getSpecificUser: (state) => (id) => {
            return state.userAccounts.find(user => user.id === parseInt(id));
        },
        userCopyWithoutPassword: (state, getters) => (id) => {
            let copy = {...getters.getSpecificUser(id)};
            copy.password = "" 
            return copy;
        },
        acitveUserAccessLevel(state, getters){
            return state.userRoles[getters.role].accessLevel;
        }
    }
}