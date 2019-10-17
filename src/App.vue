<template>
  <div id="app" class="main">
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a class="navbar-brand" href="/">
            <i class="fas fa-bookmark"></i>
            Справочник
          </a>


            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <button class="btn btn-pill btn-success my-2 my-sm-0" type="submit">Добавить сотрудника</button>
              </li>
            </ul>



        </nav>
      </header>
      <router-view/>
    </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {
      console.log(this.$children)
    }
  }
</script>

<style lang="less">

</style>
