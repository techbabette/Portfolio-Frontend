<template>
    <div>
        <h2>This is the project with id {{ id }}</h2>
    </div>
</template>
<script>
export default {
    name : "SingleProjectPage",
    data() {
        return {
            id : this.$route.params.id
        }
    }
}
</script>