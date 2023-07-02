<template>
                <a class="btn admin-tab"
                :class="{'PrimaryButton' : !isCurrentlyActive, 'PrimaryButtonActive' : isCurrentlyActive}"
                @click="changeActiveTabToSelf">
                {{ Title }}
                </a>
</template>
<script>
export default {
    name : "AdminTableTab",
    props : {
        index : {
            Type : Number,
            require : true
        },
        Title : {
            Type : String,
            require : true
        }
    },
    computed : {
        CurrentActiveTabIndex : function(){
            return this.$store.getters.getCurrentlyActiveTab
        },
        isCurrentlyActive : function(){
            return this.index === this.CurrentActiveTabIndex
        }
    },
    methods : {
        changeActiveTabToSelf : function(){
            this.$store.commit("changeCurrentlyActiveTab", this.index);
        }
    }
}
</script>
<style scoped>
.admin-tab{
    border-radius: 15px 2px 2px 2px;
    margin-right: 2px;
}
</style>