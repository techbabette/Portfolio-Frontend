<template>
<div class="ViewHeight" id="landingBody">
    <div data-aos="zoom-in-down" class="text-center row justify-content-center" style="text-align: center;">
        <div class="col-8" style="border: 1px solid #292929; border-radius: 5%;">
            <h1 id="AuthorName" class="my-4">Name Lastname</h1>
            <p>PHP Developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, iste quos! Quis aperiam perspiciatis quam in fugit atque voluptates delectus?</p>
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
}
#AuthorName{
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: #8fb4ff !important;
}
</style>