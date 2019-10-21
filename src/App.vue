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
                <button class="btn btn-pill btn-success my-2 my-sm-0" @click="isOpened = !isOpened">Добавить сотрудника</button>
              </li>
            </ul>



        </nav>

      </header>
      <modal-component v-model="isOpened"></modal-component>
      <router-view/>
    </div>
</template>

<script>
  import ModalComponent from "./components/ModalComponent";
  export default {
    name: "App",
    components: {ModalComponent},
    data() {
      return {
        isOpened: false
      }
    }
  }
</script>

<style lang="less">

</style>
