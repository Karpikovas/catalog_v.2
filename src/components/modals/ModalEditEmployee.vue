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
                        <div class="col" v-if="editEmployeeForm.photo != ''">
                            <img  width="168" height="168" alt="photo" :src="editEmployeeForm.photo"  >
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3"></div>
                        <div class="col">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="file" @change.prevent="onFileChange($event, editEmployeeForm)">
                                <label data-browse="Открыть" class="custom-file-label" for="file">Добавить фотографию...</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">ФИО:</div>
                        <div class="col">
                            <input type="text" placeholder="Введите полное имя сотрудника" class="form-control" v-model="editEmployeeForm.fullName">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">Дата рождения:</div>
                        <div class="col">
                            <input type="text" class="form-control" v-model="editEmployeeForm.birthday">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">Подразделение / Должность:</div>
                        <div class="col">
                            <select v-model="editEmployeeForm.subdivision">
                                <option v-for="subdivision in subdivisions" :value="subdivision.name">{{ subdivision.name }}</option>
                            </select>
                        </div>
                        <div class="col">
                            <select v-model="editEmployeeForm.post">
                                <option v-for="post in posts" :value="post.name">{{ post.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">Оклад / Ставка:</div>
                        <div class="col">
                            <input type="number" placeholder="Оклад" min="0.00" v-model="editEmployeeForm.salary">
                        </div>
                        <div class="col">
                            <input type="number" placeholder="Ставка" min="0.00" v-model="editEmployeeForm.rate">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="toggle(false)">Отменить</button>
                <button type="button" class="btn btn-primary" @click.prevent="onEditClick">Применить</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            value: Boolean,
            title: String,
            employee: Object
        },
        name: "ModalEditEmployee",
        data() {
            return {
                editEmployeeForm: {
                    id: '',
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
        watch: {
            value(newVal, oldVal) {
                if (newVal) {
                    this.initForm()
                }
            }
        },
        methods: {
            toggle (value) {
                this.$emit('input', value);
            },

            initForm() {
                this.editEmployeeForm = Object.assign({}, this.employee)
                this.editEmployeeForm.fullName = this.employee.surname + ' ' + this.employee.name + ' ' + this.employee.patronymic
                this.editEmployeeForm.photo = `http://musiclibrary/employees/${this.employee.id}/photo`
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
            onEditClick: function () {
                this.$store.dispatch('updateEmployee', this.editEmployeeForm)
                this.toggle(false)
            }
        }
    }
</script>

<style scoped>


</style>