<template>
  <div class="min-vh-100" id="app">
    <Navbar class="NavHeight px-5"/>
    <router-view class="ViewHeight px-5"></router-view>
    <Footer class="FooterHeight px-5"/>
  </div>
</template>

<script>
import Navbar from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components : {
    Navbar,
    Footer
  }
}
</script>

<style>
:root{
  --Primary: #000000
  --secondary: #ffffff 
  --Primary Button: #8fb4ff 
  --Secondary Button: #ebf1ff 
  --Accent: #ff8f94 
}
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  color: #292929 !important;
  overflow-x: hidden;
}
.NavHeight{
  min-height: 8vh;
}
.ViewHeight{
  min-height: 84vh;
}
.FooterHeight{
  min-height: 8vh;
}
.BlackTextColor{
  color: #000000 !important;
}
.PrimaryTextColor{
  color: #8fb4ff !important;
}
.SecondaryTextColor{
  color: #ff8f94 !important;
}
.PrimaryButton{
  background-color: #8fb4ff;
  color: white !important;
}
.PrimaryButton:hover{
  background-color: #528af9 !important;
  color: white !important;
}
.PrimaryButtonActive{
  background-color: #528af9 !important;
  color: white !important;
}
.SecondaryButton{
  background-color: #ebf1ff;
}
.SecondaryButton:hover{
  background-color: #bccef8 !important;
}
.AccentButton{
  background-color: #ff8f94;
}
.AccentButton:hover{
  background-color: #ff787f;
}
</style>
