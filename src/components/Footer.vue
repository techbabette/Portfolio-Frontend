<template>
<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <span>©2023 Name Lastname</span>
    </div>
    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li v-for="FooterIconLink,index in FooterIconLinks" :key="index" class="ms-3">
        <a class="BlackTextColor" :href="FooterIconLink.url">
            <span class="iconify" :data-icon="FooterIconLink.icon"></span>
        </a>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
    name: "FooterBar",
    data() {
        return {
            FooterIconLinks : [
            {
                "url" : "https://www.facebook.com/",
                "name" : "facebook",
                "icon" : "icomoon-free:facebook"
            },
            {
                "url" : "https://www.twitter.com/",
                "name" : "twitter",
                "icon" : "la:twitter"
            },
            {
                "url" : "documentation.pdf",
                "name" : "fa-light",
                "icon" : "fa-file"
            }
            ]
        }
    }
}
</script>