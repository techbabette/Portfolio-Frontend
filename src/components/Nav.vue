<template>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Portfolio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li v-for="NavigationLink,index in NavigationLinks" :key="index" class="nav-item">
           <router-link class="nav-link" :to="NavigationLink.Route" >{{ NavigationLink.Title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
export default {
    name : "NavigationBar",
    data() {
        return {
            NavigationLinks : [
            {
                "Title" : "Home",
                "Route" : "/"
            },
            {
                "Title" : "Projects",
                "Route" : "/projects"
            }
        ]
        }
    }
}
</script>