<template>
<nav class="navbar navbar-expand-lg border-bottom">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">
      Ilija Krstić
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li v-for="NavigationLink,index in NavigationLinks" :key="index" class="nav-item">
           <router-link class="nav-link" :to="NavigationLink.Route" :class="{active : CurrentlyActiveLink === NavigationLink.RouteName}">{{ NavigationLink.Title }}</router-link>
        </li>
        <li class="nav-item">
          <a href="#" v-accessLevel="1" @click="SignUserOut" class="nav-link">Log out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
export default {
    name : "NavigationBar",
    computed: {
      NavigationLinks : function(){
        return this.$store.getters.getNavbarLinksForActiveUser
      },
      CurrentlyActiveLink : function(){
        return this.$store.getters.getCurrentlyActiveLink;
      }
    },
    methods: {
      async SignUserOut (){
        let successfulLogout = await this.$store.dispatch("signUserOut");

        if(successfulLogout && this.$router.history.current.path != "/"){
          this.$router.push("/");
        }
      }
    }
}
</script>