<template>
  <div id="app" class="main">
      <Navbar/>
      <router-view/>
    </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  export default {
    name: "App",
    components: { Navbar }
  }
</script>

<style lang="less">

</style>
