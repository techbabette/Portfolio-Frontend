<template>
    <div>
        <h2>Welcome to the admin panel</h2>
        <div class="row">
            <div class="d-flex gap-0" id="admin-tabs-holder">
                <AdminTabButton v-for="AdminTab, index in AdminTabs" :key="index"
                :Title="AdminTab.Title"
                :CurrentActiveTabIndex="CurrentActiveTab"
                :index ="index"/>
            </div>
        </div>
        <table>
            <thead>Tekst</thead>
        </table>
    </div>
</template>
<script>
import AdminTabButton from "../adminComponents/AdminTableTab"
export default {
    name : "AdminPage",
    components : {
        AdminTabButton
    },
    data(){
        return {
            AdminTabs : [
                {
                    Title : "Projects",
                },
                {
                    Title : "Users"
                }
            ]
        }
    },
    computed : {
        CurrentActiveTab : function(){
            return this.$store.getters.getCurrentlyActiveTab
        }
    }
}
</script>