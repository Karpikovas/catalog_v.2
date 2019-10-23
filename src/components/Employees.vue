<template>
    <div class="container-fluid main">

        <!--------------------- Спиннер ------------------------>

        <template v-if="isLoading">
            <div class="spinner">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </template>

        <template v-else>
            <div class="row">

                <!--------------------- Колонка с подразделениями  -------------------->

                <div class="col-2 position-fixed sidebar">
                    <ul class="nav flex-column mt-2 text-center">

                        <li class="nav-item">
                            <span class="navbar-text mb-3">Подразделения</span>
                        </li>

                        <li class="nav-item" @click="changeFilter('')">
                            <span class="nav-link mb-3">Все</span>
                        </li>

                        <li v-for="subdivision in subdivisions" class="nav-item"
                            @click="changeFilter(subdivision.name)">
                            <span class="nav-link" href="#">{{ subdivision.name }}</span>
                        </li>
                        <li class="nav-item">
                            <a href="/subdivisions">
                                <button class="btn btn-outline-primary">Подробнее о подразделениях</button>
                            </a>

                        </li>
                    </ul>
                </div>

                <!----------------------- Компонент таблицы ----------------------------->

                <div class="col offset-md-2">

                    <table-component
                            :fields="fields"
                            :items="employees"
                            :perPage="10"
                    >
                        <template v-slot:fullName="row">
                            {{ fullName(row.data.surname, row.data.name, row.data.patronymic) }}
                        </template>

                        <template v-slot:show_details="row">
                            <button class="btn-sm mr-2 btn btn-info" v-on:click="row.toggleDetails(row.data)">
                                {{ row.data.detailIsShowing ? 'Скрыть' : 'Показать'}} детали
                            </button>
                        </template>

                        <template v-slot:actions="row">
                            <div class="btn-group btn-group-sm" role="group">
                                <button type="button" class="btn btn-warning" @click="modalEditShow(row.data)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="btn btn-danger" v-on:click="modalDeleteShow(row.data)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </template>

                        <template v-slot:details="row">
                            <div class="card flex-row">
                                <img :src="'http://musiclibrary/employees/' + row.data.id +'/photo?date=' + date"
                                     width='168' class="card-img-left">

                                <div class="card-body">
                                    <div class="row mb-2">
                                        <div class="property">
                                            <b>ФИО:</b>
                                        </div>
                                        <div class="col">
                                            {{ row.data.surname }} {{ row.data.name }} {{ row.data.patronymic }}
                                        </div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="property">
                                            <b>Дата рождения:</b>
                                        </div>
                                        <div class="col">{{ row.data.birthday }}</div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="property">
                                            <b>Оклад:</b>
                                        </div>
                                        <div class="col">{{ row.data.salary }}</div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="property">
                                            <b>Ставка:</b>
                                        </div>
                                        <div class="col">{{ row.data.rate }}</div>
                                    </div>

                                </div>
                            </div>
                        </template>

                    </table-component>


                    <!------------------- Модальное окно редактирования ----------------------->

                    <div class="modal" aria-hidden="true" :class="{ opened: isOpenedEdit }">
                        <div class="modal-dialog">
                            <div class="modal-header">
                                <h2>Редактировать</h2>
                                <a href="#" class="btn-close" aria-hidden="true" @click.prevent="isOpenedEdit= false">&times;</a>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row mb-3">
                                        <div class="col-3">Фото:</div>
                                        <div class="col" v-if="editEmployeeForm.photo != ''">
                                            <img width="168" height="168" alt="photo" :src="editEmployeeForm.photo">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3"></div>
                                        <div class="col">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="file"
                                                       @change.prevent="onFileChange($event, editEmployeeForm)">
                                                <label data-browse="Открыть" class="custom-file-label" for="file">Добавить
                                                    фотографию...</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">ФИО:</div>
                                        <div class="col">
                                            <input type="text" placeholder="Введите полное имя сотрудника"
                                                   class="form-control" v-model="editEmployeeForm.fullName">
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
                                                <option v-for="subdivision in subdivisions" :value="subdivision.name">{{
                                                    subdivision.name }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <select v-model="editEmployeeForm.post">
                                                <option v-for="post in posts" :value="post.name">{{ post.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">Оклад / Ставка:</div>
                                        <div class="col">
                                            <input type="number" placeholder="Оклад" min="0.00"
                                                   v-model="editEmployeeForm.salary">
                                        </div>
                                        <div class="col">
                                            <input type="number" placeholder="Ставка" min="0.00"
                                                   v-model="editEmployeeForm.rate">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click.prevent="isOpenedEdit = false">
                                    Отменить
                                </button>
                                <button type="button" class="btn btn-primary" @click.prevent="onEditClick">Применить
                                </button>
                            </div>
                        </div>
                    </div>


                    <!--------------- Модальное окно удаления ------------------->

                    <div class="modal" aria-hidden="true" :class="{ opened: isOpenedDelete }">
                        <div class="modal-dialog">
                            <div class="modal-header">
                                <h2>Удалить</h2>
                                <a href="#" class="btn-close" aria-hidden="true"
                                   @click.prevent="isOpenedDelete = false">&times;</a>
                            </div>
                            <div class="modal-body text-center">
                                Удалить информацию о сотруднике?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click.prevent="isOpenedDelete = false">
                                    Отменить
                                </button>
                                <button type="button" class="btn btn-danger" @click.prevent="onDeleteClick">Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </template>

    </div>
</template>

<script>
    import TableComponent from "./TableComponent";
    import { mapState} from 'vuex'

    export default {
        name: "Employees",
        components: {TableComponent},
        data() {
            return {
                date: new Date(),
                inProgress: false,
                currentFilter: '',
                isOpenedEdit: false,
                isOpenedDelete: false,
                currentEmployee: null,
                fields: [
                    {
                        key: 'fullName',
                        label: 'Сотрудник'
                    },
                    {
                        key: 'subdivision',
                        label: 'Подразделение'
                    },
                    {
                        key: 'post',
                        label: 'Должность'
                    },
                    {
                        key: 'show_details',
                        label: ''
                    },
                    {
                        key: 'actions',
                        label: 'Действия'
                    }
                ],
                items: [],
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

            employees: function () {

                this.date = new Date()
                let newItems = this.$store.getters.employees.slice().sort(function (a, b) {
                    return (a.surname > b.surname) ? 1 : ((b.surname > a.surname) ? -1 : 0)
                })

                if (this.currentFilter) {
                    return newItems.filter((item) => {
                        return item.subdivision === this.currentFilter
                    })
                } else {
                    return newItems

                }
            },

            subdivisions: function () {
                return this.$store.getters.subdivisions
            },

            posts() {
                return this.$store.getters.posts
            },

            isLoading() {
                return this.$store.getters.isLoadingEmployees
            }


        },
        methods: {

            changeFilter: function (name) {
                this.currentFilter = name
            },

            fullName: function (surname, name, patronymic) {
                let fullName = surname + ' ' + name[0] + '.'
                if (patronymic) {
                    fullName += patronymic[0] + '.'
                }
                return fullName
            },

            modalEditShow(employee) {
                this.editEmployeeForm = Object.assign({}, employee)
                this.editEmployeeForm.fullName = employee.surname + ' ' + employee.name + ' ' + employee.patronymic
                this.editEmployeeForm.photo = `http://musiclibrary/employees/${employee.id}/photo`
                this.isOpenedEdit = true
            },

            modalDeleteShow(employee) {
                this.currentEmployee = employee
                this.isOpenedDelete = true
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
                this.isOpenedEdit = false
            },

            onDeleteClick() {
                this.$store.dispatch('deleteEmployee', this.currentEmployee.id)
                this.isOpenedDelete = false
            }

        },

        mounted() {
            this.$store.dispatch('getEmployees')
        }
    }
</script>

<style scoped lang="less">
</style>
