export default {
    state: {
        currentlyActiveTab : 0
    },
    mutations : {
        changeCurrentlyActiveTab(state, newActiveTab){
            state.currentlyActiveTab = newActiveTab;
        }
    },
    getters: {
        getCurrentlyActiveTab(state){
            return state.currentlyActiveTab;
        }
    }
}