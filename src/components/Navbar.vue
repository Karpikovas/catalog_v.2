<template>
    <div>
        <!---------------------- Навигация -------------------------->
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a class="navbar-brand" href="/">
                    <i class="fas fa-bookmark"></i>
                    Справочник
                </a>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <button class="btn btn-pill btn-success my-2 my-sm-0" @click="modalAddShow"></button>
                    </li>
                </ul>
            </nav>

        </header>

        <!--------------- Модальное окно добавления нового сотрудника ------------>

        <div class="modal" aria-hidden="true" :class="{ opened: isOpened }">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2>Добавить</h2>
                    <a href="#" class="btn-close" aria-hidden="true" @click.prevent="isOpened = false">&times;</a>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row mb-3">
                            <div class="col-3">Фото:</div>
                            <div class="col" v-if="newEmployeeForm.photo != ''">
                                <img  alt="photo" :src="newEmployeeForm.photo"  >
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3"></div>
                            <div class="col">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file" @change.prevent="onFileChange($event, newEmployeeForm)">
                                    <label data-browse="Открыть" class="custom-file-label" for="file">Добавить фотографию...</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3">ФИО:</div>
                            <div class="col">
                                <input type="text" placeholder="Введите полное имя сотрудника" class="form-control" v-model="newEmployeeForm.fullName">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3">Дата рождения:</div>
                            <div class="col">
                                <input type="text" class="form-control" v-model="newEmployeeForm.birthday">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3">Подразделение / Должность:</div>
                            <div class="col">
                                <select v-model="newEmployeeForm.subdivision">
                                    <option v-for="subdivision in subdivisions" :value="subdivision.name">{{ subdivision.name }}</option>
                                </select>
                            </div>
                            <div class="col">
                                <select v-model="newEmployeeForm.post">
                                    <option v-for="post in posts" :value="post.name">{{ post.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">Оклад / Ставка:</div>
                            <div class="col">
                                <input type="number" placeholder="Оклад" min="0.00" v-model="newEmployeeForm.salary">
                            </div>
                            <div class="col">
                                <input type="number" placeholder="Ставка" min="0.00" v-model="newEmployeeForm.rate">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="isOpened = false">Отменить</button>
                    <button type="button" class="btn btn-primary" @click.prevent="onAddClick">Добавить</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        isOpened: false,
        newEmployeeForm: {
          birthday: '',
          fullName: '',
          photo: '',
          salary: '',
          rate: '',
          subdivision: '',
          post: '',
          file: null
        },
      }
    },
    mounted() {
      this.$store.dispatch('getSubdivisions')
    },
    computed: {

      subdivisions() {
        return this.$store.getters.subdivisions
      },

      posts() {
        return this.$store.getters.posts
      }

    },
    methods: {

      modalAddShow() {
        this.newEmployeeForm.birthday = ''
        this.newEmployeeForm.fullName = ''
        this.newEmployeeForm.photo = ''
        this.newEmployeeForm.salary = ''
        this.newEmployeeForm.rate = ''
        this.newEmployeeForm.subdivision = ''
        this.newEmployeeForm.post = ''
        this.newEmployeeForm.file = null

        this.isOpened = true
      },

      selectImage: function (form) {
        let reader = new FileReader()
        reader.form = form
        reader.onload = this.onImageLoad
        reader.readAsDataURL(form.file)
      },

      onFileChange: function (event, form) {
        form.file = event.target.files[0]
        this.selectImage(form)
      },

      onImageLoad: function (event) {
        event.target.form.photo = event.target.result
      },

      onAddClick: function () {
        this.$store.dispatch('addNewEmployee', this.newEmployeeForm)
        this.isOpened = false
      }
    }
  }
</script>

<style scoped>

</style>
