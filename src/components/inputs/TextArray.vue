<template>
    <div>
        <label :for="id" v-if="label" class="form-label">{{ label }}</label>
        <input v-model="localValue" class="form-control" type="text" :placeholder="placeholder" :name="name" :id="id">
        <span class="btn btn-info mx-1 my-1" 
        v-for="ArrayElement, index in DisplayArrayForm" :key="index"
        @click="RemoveFromValue(ArrayElement)">
        {{ ArrayElement }}
        </span>
        <p v-if="errorMessage" class="alert alert-danger py-2 my-1">{{ errorMessage }}</p>
        <p v-if="ShowHint">{{ hint }}</p>
    </div>
</template>
<script>
export default {
    name : "SeparatedArrayInput",
    mounted(){
        this.localValue = this.value.join(",");
    },
    data(){
        return {
            id : Math.floor(Math.random() * 1000) + this.name,
            localValue : ""
        }
    },
    props: {
        value : {
            Type : Array
        },
        name : {
            Type : String,
            default : "arrayField"
        },
        placeholder : {
            Type : String,
            default : "Enter comma separated values"
        },
        separator : {
            Type : String,
            default : ","
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
    methods : {
        RemoveFromValue(Text){
            let regex = new RegExp(`,?${Text}?,`, "g")
            this.localValue = this.localValue.replaceAll(regex, "");
        }
    },
    computed : {
        ShowHint(){
            return this.hint && !this.errorMessage;
        },
        ArrayForm(){
            return this.localValue.split(this.separator);
        },
        DisplayArrayForm(){
            return this.ArrayForm.filter(el => el.trim() !== "");
        }
    },
    watch: {
        localValue : function() {
            let NewArrayValue = this.ArrayForm;
            this.$emit("input", NewArrayValue);
        },
        value : function(){
            this.localValue = this.value.join(",");
        }
    }
}
</script>