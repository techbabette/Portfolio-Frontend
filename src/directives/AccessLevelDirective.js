export default {
    inserted: function(el, binding, vnode) {
        let accessLevel = vnode.context.$store.getters.acitveUserAccessLevel

        let accessLevelRequired = binding.value;

        if(accessLevelRequired > accessLevel) {
            vnode.elm.classList.add("d-none");
        }
        else{
            vnode.elm.classList.remove("d-none");
        }
    },
    update: function(el, binding, vnode) {
        let accessLevel = vnode.context.$store.getters.acitveUserAccessLevel

        let accessLevelRequired = binding.value;

        if(accessLevelRequired > accessLevel) {
            vnode.elm.classList.add("d-none");
        }
        else{
            vnode.elm.classList.remove("d-none");
        }
    }
}