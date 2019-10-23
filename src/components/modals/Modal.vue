<template>
    <div class="modal" aria-hidden="true" :class="{ opened: value }">
        <div class="modal-dialog">
            <div class="modal-header">
                <h2>{{ title }}</h2>
                <a href="#" class="btn-close" aria-hidden="true" @click.prevent="toggle(false)">&times;</a>
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
                <button type="button" class="btn btn-secondary" @click.prevent="toggle(false)">Отменить</button>
                <button type="button" class="btn btn-primary" @click.prevent="onAddClick">Добавить</button>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    props: {
      value: Boolean,
      title: String
    },
    name: "Modal",
    data() {
      return {
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
    computed: {
      subdivisions() {
        return this.$store.getters.subdivisions
      },
      posts() {
        return this.$store.getters.posts
      }
    },

    methods: {
      toggle (value) {
        if (!value) {
          this.clearForm()
        }

        this.$emit('input', value);
      },

      clearForm() {
        this.newEmployeeForm.birthday = ''
        this.newEmployeeForm.fullName = ''
        this.newEmployeeForm.photo = ''
        this.newEmployeeForm.salary = ''
        this.newEmployeeForm.rate = ''
        this.newEmployeeForm.subdivision = ''
        this.newEmployeeForm.post = ''
        this.newEmployeeForm.file = null
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
        this.toggle(false)
      }
    }
  }
</script>

<style scoped>


</style>
