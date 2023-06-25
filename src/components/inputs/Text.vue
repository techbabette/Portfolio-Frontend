<template>
    <div>
        <label :for="id" v-if="label" class="form-label">{{ label }}</label>
        <input v-model="localValue" class="form-control" :placeholder="placeholder" :type="type" :name="name" :id="id">
        <p v-if="errorMessage" class="alert alert-danger py-2 my-1">{{ errorMessage }}</p>
        <p v-if="ShowHint">{{ hint }}</p>
    </div>
</template>
<script>
export default {
    name : "TextInput",
    mounted(){
        this.localValue = this.value;
    },
    data(){
        return {
            id : Math.floor(Math.random() * 1000) + this.name,
            localValue : ""
        }
    },
    props: {
        value : {
            Type : String
        },
        name : {
            Type : String,
            default : "field"
        },
        placeholder : {
            Type : String
        },
        type : {
            Type : String,
            default : "text"
        },
        label : {
            Type : String
        },
        hint : {
            Type : String
        },
        errorMessage : {
            Type : String
        }
    },
    computed : {
        ShowHint(){
            return this.hint && !this.errorMessage;
        }
    },
    watch: {
        localValue : function() {
            this.$emit("input", this.localValue)
        },
        value : function(){
            this.localValue = this.value;
        }
    }
}
</script>