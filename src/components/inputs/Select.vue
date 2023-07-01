<template>
    <div class="mb-3">
       <label v-if="label" :for="id" class="form-label">{{ label }}</label>
       <select v-model="localValue" :id="id" class="form-select">
           <option v-for="item in items" :value="item[valueProperty]" :key="item[valueProperty]">{{ makeUpperCase(item[textProperty]) }}</option>
       </select>
       <p v-if="showHint">{{ hint }}</p>
       <p v-if="errorMessage" class="alert alert-danger py-2 my-1">{{ errorMessage }}</p>
    </div>
</template>
<script>
export default {
   name: "SelectInput",
   mounted() {
       this.localValue = this.value
   },
   props: {
       errorMessage: {
           type: String
       },
       value: {
           type: [String, Number]
       },
       name : {
            Type : String,
            default : "select"
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
           default: ""
       }
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
       }
   },
   methods: {
        makeUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
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