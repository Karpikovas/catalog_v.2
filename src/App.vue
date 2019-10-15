<template>
  <div id="app">
    <div class="main">
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a class="navbar-brand" href="/">
            <i class="fas fa-bookmark"></i>
            Справочник
          </a>

          <div class="collapse navbar-collapse">

            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <button class="btn btn-pill btn-success my-2 my-sm-0" type="submit">Добавить сотрудника</button>
              </li>
            </ul>

          </div>

        </nav>
      </header>
      <router-view/>
    </div>
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
* {
  margin: 0;
  padding: 0;
}

html, body {
  margin: 0;
  padding: 0;

  min-width: 100%;
  width: 100%;
  max-width: 100%;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

  background-color: #f5f5f5;
}

.fa-bookmark {
  color: #42b983;
}

.main {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.navbar-brand {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
}
button.btn-pill {
  border-radius: 20px;
}
</style>
