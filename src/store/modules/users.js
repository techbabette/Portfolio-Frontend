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
            'favoriteProjects' : []
        },
        {
            "id" : 2,
            "username": "mika",
            "password": "sifra1",
            "role": "user",
            'favoriteProjects' : []
        },
        {
            "id" : 3,
            "username": "zika",
            "password": "sifra1",
            "role": "user",
            'favoriteProjects' : []
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

            return result;
        },
        attemptRegistration({commit, state}, registrationInformationSent){
            let result = {};

            result.errors = {};

            if(registrationInformationSent.username.length < 4){
                result.errors.usernameError = "Username cannot be shorter than four characters"
                return result;
            }

            let usernameLetterRegex = /[A-Za-z]/ 
            let usernameTotalRegex = /^[A-Za-z0-9]{4,15}$/

            if(!usernameLetterRegex.test(registrationInformationSent.username)){
                result.errors.usernameError = "Username must contain at least a single letter"
                return result;
            }
            
            if(!usernameTotalRegex.test(registrationInformationSent.username)){
                result.errors.usernameError = "Username must be between four and fifteen characters long and can only include letters and numbers"
                return result;
            }

            if(state.userAccounts.some(account => account.username == registrationInformationSent.username)){
                result.errors.usernameError = "Account with this username already exists"
                return result;
            }

            if(registrationInformationSent.password.length < 6){
                result.errors.passwordError = "Password cannot be shorter than six characters"
                return result;
            }

            let passwordNumberRegex = /[0-9]/;
            let passwordLowercaseRegex = /[a-z]/;
            let passwordUppercaseRegex = /[A-Z]/;
            let passwordTotalRegex = /^[A-Za-z0-9]{6,30}$/

            if(!passwordNumberRegex.test(registrationInformationSent.password)){
                result.errors.passwordError = "Password must contain at least one number"
                return result;
            }

            if(!passwordLowercaseRegex.test(registrationInformationSent.password)){
                result.errors.passwordError = "Password must contain at least one lowercase letter"
                return result;
            }

            if(!passwordUppercaseRegex.test(registrationInformationSent.password)){
                result.errors.passwordError = "Password must contain at least one uppercase letter"
                return result;
            }

            if(!passwordTotalRegex.test(registrationInformationSent.password)){
                result.errors.passwordError = "Password must be between six and thirty characters and can only include letters and numbers"
                return result;
            }

            let newUserAccount = JSON.parse(JSON.stringify(registrationInformationSent));

            newUserAccount.id = state.userAccounts[state.userAccounts.length - 1].id + 1;

            newUserAccount.role = "user";

            newUserAccount.favoriteProjects = []

            commit("createNewUser", newUserAccount);

            return result;
        },
        signUserOut({commit}){
            commit("setActiveUser", 0);

            return true;
        },
        flipUserProjectFavorite({commit, getters}, projectId){
            let activeUser = getters.activeUser

            let commitInformation = {activeUser, projectId};

            if(activeUser.favoriteProjects.includes(projectId)){
                commit("RemoveFromFavoriteProjects", commitInformation);
                return;
            }
            commit("AddToFavoriteProjects", commitInformation);
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

            if(!userInformationSent.username || userInformationSent.username.length < 4){
                result.errors.usernameError = "Username cannot be shorter than four characters";
                hasErrors = true;
            }

            let usernameLetterRegex = /[A-Za-z]/ 
            let usernameTotalRegex = /^[A-Za-z0-9]{4,15}$/

            if(!usernameLetterRegex.test(userInformationSent.username)){
                result.errors.usernameError = "Username must contain at least a single letter"
                hasErrors = true;
            }
            
            if(!usernameTotalRegex.test(userInformationSent.username)){
                result.errors.usernameError = "Username must be between four and fifteen characters long and can only include letters and numbers"
                hasErrors = true;
            }

            if(!userInformationSent.role){
                result.errors.roleError = "User role cannot be empty";
                hasErrors = true;
            }

            if(userInformationSent.password){
                changingPassword = true;
            }

            if(changingPassword){
                let passwordNumberRegex = /[0-9]/;
                let passwordLowercaseRegex = /[a-z]/;
                let passwordUppercaseRegex = /[A-Z]/;
                let passwordTotalRegex = /^[A-Za-z0-9]{6,30}$/
    
                
                if(userInformationSent.password.length < 6){
                    result.errors.passwordError = "Password cannot be shorter than six characters";
                    hasErrors = true;
                }

                if(!passwordNumberRegex.test(userInformationSent.password)){
                    result.errors.passwordError = "Password must contain at least one number"
                    hasErrors = true;
                }
    
                if(!passwordLowercaseRegex.test(userInformationSent.password)){
                    result.errors.passwordError = "Password must contain at least one lowercase letter"
                    hasErrors = true;
                }
    
                if(!passwordUppercaseRegex.test(userInformationSent.password)){
                    result.errors.passwordError = "Password must contain at least one uppercase letter"
                    hasErrors = true;
                }
    
                if(!passwordTotalRegex.test(userInformationSent.password)){
                    result.errors.passwordError = "Password must be between six and thirty characters and can only include letters and numbers"
                    hasErrors = true;
                }
    
                if(changingPassword){
                    existingUser.password = userInformationSent.password;
                }
            }

            existingUser.username = userInformationSent.username;

            existingUser.role = userInformationSent.role;

            if(!hasErrors){
                commit("changeUserInformation", existingUser);
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
        },
        RemoveFromFavoriteProjects(state, commitInformation){
            let user = commitInformation.activeUser;

            let projectId = commitInformation.projectId;

            user.favoriteProjects = user.favoriteProjects.filter(project => project != projectId);
        },
        AddToFavoriteProjects(state, commitInformation){
            let user = commitInformation.activeUser;

            let projectId = commitInformation.projectId;

            user.favoriteProjects.push(projectId);
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
                "favoriteProjects" : []
            }
            return state.userAccounts.find(user => user.id === state.activeUserId);
        },
        username(state, getters) {
            return getters.activeUser.username
        },
        role(state, getters) {
            return getters.activeUser.role
        },
        getAllUserRoles(state){
            return Object.keys(state.userRoles);
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
        UserFavorites(state, getters) {
            return getters.activeUser.favoriteProjects;
        },
        IsInUserFavorites: (state, getters) => (id) => {
            return getters.UserFavorites.includes(id);
        },
        acitveUserAccessLevel(state, getters){
            return state.userRoles[getters.role].accessLevel;
        }
    }
}