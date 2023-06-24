<template>
    <div>
        <h2>Welcome to the admin panel</h2>
        <div class="row">
            <div class="d-flex gap-0" id="admin-tabs-holder">
                <AdminTabButton v-for="AdminTab, index in AdminTabs" :key="index"
                :Title="AdminTab.Title"
                :CurrentActiveTabIndex="CurrentActiveTabIndex"
                :index ="index"/>
            </div>
        </div>
        <AdminGenericTable :Items="CurrentItems" :Headers="CurrentHeaders" :Options="CurrentActiveTab.Options"/>
    </div>
</template>
<script>
import AdminTabButton from "../adminComponents/AdminTableTab"
import AdminGenericTable from "../adminComponents/AdminGenericTable"
export default {
    name : "AdminPage",
    components : {
        AdminTabButton,
        AdminGenericTable
    },
    data(){
        return {
            that : this,
            AdminTabs : [
                {
                    Title : "Projects",
                    ItemGetter : "users",
                    Headers : [
                        {
                            Text : "Project name",
                            Field : "username"
                        }
                    ]
                },
                {
                    Title : "Users",
                    ItemGetter : "users",
                    Headers : [
                        {
                            Text : "Username",
                            Field : "username"
                        },
                        {
                            Text : "Access level",
                            Field : "accessLevel"
                        }
                    ],
                    Options : [
                        {Name : "Edit", onClick : (event) => console.log(event.target), class : "btn btn-dark"},
                        {Name : "Delete", onClick : function(){alert("Clicked a button!")}, class : "btn btn-danger"}
                    ]
                }
            ]
        }
    },
    computed : {
        CurrentActiveTabIndex : function(){
            return this.$store.getters.getCurrentlyActiveTab
        },
        CurrentActiveTab : function(){
            return this.AdminTabs[this.CurrentActiveTabIndex];
        },
        CurrentHeaders : function(){
            return this.CurrentActiveTab.Headers
        },
        CurrentItems : function(){
            return this.$store.getters[this.CurrentActiveTab.ItemGetter]
        }
    },
    methods : {
        ConsoleThis : function(){
            console.log(this.CurrentActiveTabIndex);
        }
    }
}
</script>