<template>
    <div class="container-fluid main">

        <!--------------------- Спиннер ------------------------>

        <template v-if="inProgress">
            <div class="d-flex justify-content-center mb-3">
                <div class="spinner-border text-success"></div>
            </div>
        </template>

        <template v-else>
            <div class="row">

        <!--------------------- Колонка с подразделениями  -------------------->

                <div class="col-2 position-fixed divider">
                    <ul class="nav flex-column mt-2 text-center">

                        <li class="nav-item" >
                            <span class="navbar-text mb-3">Подразделения</span>
                        </li>

                        <li class="nav-item" @click="changeFilter('')" >
                            <span class="nav-link mb-3" >Все</span>
                        </li>

                        <li v-for="subdivision in subdivisions" class="nav-item" @click="changeFilter(subdivision.name)">
                            <span class="nav-link" href="#" >{{ subdivision.name }}</span>
                        </li>
                        <li class="nav-item mt-5">
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
                                <img :src="'http://musiclibrary/employees/' + row.data.id +'/photo?date=' + date" class="card-img-left">

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

                    <modal-edit v-model="isOpened" :employee="currentEmployee" title="Редактировать"></modal-edit>
                    <modal-delete v-model="isOpenedDelete" :employee="currentEmployee"></modal-delete>
                </div>

            </div>

        </template>

    </div>
</template>

<script>
    import TableComponent from "./TableComponent";
    import ModalEdit from "./modals/ModalEditEmployee";
    import ModalDelete from "./modals/ModalDeleteEmployee";

    export default {
        name: "Employees",
      components: { ModalEdit, ModalDelete, TableComponent },
      data() {
            return {
                date: new Date(),
                inProgress: false,
                currentFilter: '',
                isOpened: false,
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
                subdivisions: [ { name: 'Южное' }, { name: 'Северное' }, { name: 'Западное' }, { name: 'Восточное' }, ],
                items: [],
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
                    return  newItems

                }
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
                    this.currentEmployee = employee
                    this.isOpened = true
                },
              modalDeleteShow(employee) {
                  this.isOpenedDelete = true
              }

                // toggleDetail: function (employee) {
                //
                //     if (employee.hasOwnProperty('detailIsShowing')) {
                //         employee.detailIsShowing = !employee.detailIsShowing
                //     } else {
                //         employee.detailIsShowing = true
                //     }
                //
                //     let targetIndex = this.employees.findIndex(item => item.id === employee.id)
                //     this.employees.splice(targetIndex, 1, employee);
                // }
          },
        mounted() {
            this.$store.dispatch('getEmployees')
        }
    }
</script>

<style scoped lang="less">
</style>
