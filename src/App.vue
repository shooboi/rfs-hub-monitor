<template>
  <div class="h-full">
    <div class="fixed h-full">
      <SideBar></SideBar>
    </div>
    <NavBarComponent></NavBarComponent>


    <div class="relative pl-10">
      <RouterView>
      </RouterView>
    </div>
  </div>
</template>

<script>
import NavBarComponent from "./components/nav/Navbar.vue"
import SideBar from "./components/nav/SideBar.vue"

export default {
  name: 'App',
  components: {
    NavBarComponent,
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
