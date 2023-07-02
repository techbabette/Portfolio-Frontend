<template>
<div class="ViewHeight" id="landingBody">
    <div data-aos="zoom-in-down" class="text-center landing-cover row justify-content-center" style="text-align: center;">
        <div class="col-12">
            <h1 id="AuthorName" class="my-4">Ilija Krstić</h1>
            <p>PHP Developer currently enrolled at the ICT College of Applied Studies in Belgrade, Serbia.</p>
            <p>Proficient in database design, PHP, NodeJS, VueJS and basic front-end technologies</p>
           <router-link to="/projects" class="btn PrimaryButton my-4">View my projects</router-link>
        </div>
    </div>
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
    background-color: #292929;

}
.landing-cover{
    background-color: #FFF;
    border: 2px solid #8fb4ff;
    border-radius: 20px;
    color: #292929;
}
#AuthorName{
    color: #8fb4ff;
}
</style>