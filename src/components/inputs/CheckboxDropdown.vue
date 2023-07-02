<template>
<div>
    <label :for="id" v-if="label" class="form-label d-block">{{ label }}</label>
    <div class="btn-group d-block">
        <button class="btn btn-light text-start bg-white form-select" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            {{buttonText}}
        </button>
        <div class="dropdown-menu border">
            <div class="form-check" v-for="item in items" :key="item[valueProperty]">
            <input class="form-check-input" v-model="localValue" type="checkbox" :value="item[valueProperty]" :id="item[textProperty] + id">
            <label class="form-check-label" :for="item[textProperty] + id">
                {{ item[textProperty] }}
            </label>
        </div>
    </div>
    </div>
    <p v-if="errorMessage" class="alert alert-danger py-2 my-1">{{ errorMessage }}</p>
</div>

</template>
<script>
export default {
    name : "CheckboxDropdownInput",
    props: {
       errorMessage: {
           type: String
       },
       value: {
           type: Array
       },
       name : {
            Type : String,
            default : "CheckboxDropdown"
        },
       textProperty: {
           type: String,
           default: "text"
       },
       valueProperty: {
           type: String,
           default: "value"
       },
       label: {
           type: String,
           default: ""
       },
       items: {
           type: Array,
           required: true
       },
       hint: {
           type: String,
           default: "Click to show options"
       }
   },
   mounted(){
    this.localValue = this.value
   },
   data() {
       return {
           localValue : undefined,
           id : Math.floor(Math.random() * 1000) + this.name
       }
   },
   computed: {
       showHint: function() {
           return !this.errorMessage && this.hint;
       },
       buttonText: function(){
            let selectedOptionsText = ""
            if(this.localValue){
                selectedOptionsText = this.localValue.join(", ")
            }

            if(!selectedOptionsText && this.hint){
                return this.hint
            }

            return selectedOptionsText;
       }
   },
   watch: {
       localValue: function() {
           this.$emit("input", this.localValue)
       },
       value: function() {
           this.localValue = this.value
       }
   }
}
</script>