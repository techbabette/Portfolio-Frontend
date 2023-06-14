<template>
<div class="ViewHeight" id="landingBody">
    <div data-aos="zoom-in-down" style="text-align: center;">
        <h1>Name Lastname</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus delectus quam deserunt natus suscipit iusto amet voluptate cum, vitae nisi!</p>
    </div>
    <router-link to="/projects" class="btn PrimaryButton">View my projects</router-link>
</div>
</template>
<script>
export default {
    name : "LandingPage"
}
</script>
<style scoped>
#landingBody{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>