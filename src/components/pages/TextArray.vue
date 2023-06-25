<template>
    <TextArrayInput label="Technologies used" v-model="ParentArray"/>
</template>
<script>
import TextArrayInput from "../inputs/TextArray.vue"
export default {
    name : "TextArrayTestPage",
    components : {
        TextArrayInput
    },
    data(){
        return {
            ParentArray : ["MsSQL", "PHP"]
        }
    }
}
</script>