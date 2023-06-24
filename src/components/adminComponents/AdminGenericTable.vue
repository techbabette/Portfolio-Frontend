<template>
<div class="table-responsive">
    <table v-if="ShowTable" class="table table-responsive table-hover" id="element-table">
        <thead>
            <tr id="header-table-row">
                <th>#</th>
                <th v-for="Header, index in Headers" :key="index">{{ Header.Text }}</th>
                <th v-if="Options">Options</th>
            </tr>
        </thead>
        <tbody id="table-result-holder">
            <tr v-for="Item, index in Items" :key="index">
                <td>{{ index + 1 }}</td>
                <td v-for="Header, hIndex in Headers" :key="hIndex">{{ Item[Header.Field] }}</td>
                <td v-if="Options">
                    <a v-for="Option, oIndex in Options" :id="Item[IdentificationField]" :key="oIndex" :class="Option.class" @click="Option.onClick">{{ Option.Name }}</a>
                </td>
            </tr>
        </tbody>
    </table>
    <p v-else>No items found</p>
</div>
</template>
<script>
export default {
    name : "AdminGenericTable",
    props : {
        Items : {
            Type: Array
        },
        Headers : {
            Type : Array
        },
        Options : {
            Type : Array
        },
        IdentificationField : {
            Type : String,
            default : "id"
        }
    },
    computed : {
        ShowTable : function(){
            return this.Items && this.Items.length > 0;
        }
    }
}
</script>