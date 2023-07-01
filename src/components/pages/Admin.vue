<template>
    <div>
        <h2>Welcome to the admin panel, {{ CurrentUsername }}</h2>
        <div class="row">
            <div class="d-flex gap-0" id="admin-tabs-holder">
                <AdminTabButton v-for="AdminTab, index in AdminTabs" :key="index"
                :Title="AdminTab.Title"
                :CurrentActiveTabIndex="CurrentActiveTabIndex"
                :index ="index"/>
            </div>
        </div>
        <AdminGenericTable :Items="CurrentItems" :Headers="CurrentHeaders" 
        :IdentificationField="CurrentActiveTab.IdentificationField"  :Options="CurrentActiveTab.Options"
        :TableOptions="CurrentActiveTab.TableOptions"/>
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
            AdminTabs : [
                {
                    Title : "Projects",
                    ItemGetter : "getProjectsForAdminPanel",
                    IdentificationField : "Id",
                    Headers : [
                        {
                            Text : "Project name",
                            Field : "Name"
                        },
                        {
                            Text : "Short description",
                            Field : "Description",
                            Change : function(text){
                                let maxLength = 30;
                                if(text.length <= maxLength) return text;
                                let wordsInText = text.split(" ");
                                let shortenedText = "";
                                for(let word of wordsInText){
                                    if(word.length + shortenedText.length <= maxLength) shortenedText += word + ' ';
                                    else{
                                        shortenedText = shortenedText.trim() + '...';
                                        break;
                                    }
                                }
                                return shortenedText;
                            }
                        },
                        {
                            Text : "Technologies used",
                            Field : "Technologies",
                            Change : function(arrayOfTechnologies){
                                let technologiesString = arrayOfTechnologies.join(", ");
                                return technologiesString.length > 0 ? technologiesString : "/"
                            }
                        }
                    ],
                    TableOptions : [
                        {
                            Name : "Create new project",
                            class : "btn btn-success my-1",
                            onClick : () => {
                                this.$router.push({name : "Manage projects", params : {id : "new"}})
                            }
                        }
                    ],
                    Options : [
                        {
                            Name : "Edit",
                            class : "btn btn-dark mx-1", 
                            onClick : (event) => {
                                let requestedId = parseInt(event.target.dataset.id)

                                this.$router.push({name : "Manage projects", params : {id : requestedId}})
                            }
                        },
                        {
                            Name : "Delete",
                            class : "btn btn-danger",
                            onClick : (event) => {
                                let requestedId = parseInt(event.target.dataset.id);

                                this.$store.commit("deleteProject", requestedId);
                            }
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
                            Text : "Permissions",
                            Field : "role",
                            Change : function(value){
                                return value.charAt(0).toUpperCase() + value.slice(1);
                            }
                        }
                    ],
                    Options : [
                        {
                            Name : "Edit",
                            class : "btn btn-dark mx-1", 
                            onClick : (event) => {
                                let requestedId = parseInt(event.target.dataset.id)

                                this.$router.push({name : "Manage users", params : {id : requestedId}})
                            }
                        },
                        {
                            Name : "Delete",
                            class : "btn btn-danger", 
                            onClick : (event) => {
                                let requestedId = parseInt(event.target.dataset.id)

                                this.$store.commit("deleteUser", requestedId);
                            }
                        }
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
        },
        CurrentUsername : function(){
            return this.$store.getters.username
        }
    }
}
</script>