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
                    <ul class="nav flex-column mt-2 justify-content-center text-center">

                        <span class="navbar-text mb-3">Подразделения</span>

                        <li v-for="subdivision in subdivisions" class="nav-item">
                            <a class="nav-link" href="#">{{ subdivision.name }}</a>
                        </li>
                        <li class="nav-item mt-5">
                            <button class="btn btn-outline-primary">Подробнее о подразделениях</button>
                        </li>
                    </ul>
                </div>

        <!----------------------- Компонент таблицы ----------------------------->

                <div class="col offset-md-2">

                    <table-component
                        :fields="fields"
                        :items="employees"
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
                                <button type="button" class="btn btn-warning" v-on:click="modalEditShow(row.item)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="btn btn-danger" v-on:click="modalDeleteShow(row.item.id)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </template>

                        <template v-slot:details="row">
                            <div class="card flex-row">
                                <img src="https://i1.wp.com/pbs.twimg.com/profile_images/1027496003023319040/wc74uThS_200x200.jpg" class="card-img-left">

                                <div class="card-body">
                                    <div class="row mb-2">
                                        <div class="text-sm-right col-sm-3">
                                            <b>ФИО:</b>
                                        </div>
                                        <div class="col">
                                            {{ row.data.surname }} {{ row.data.name }} {{ row.data.patronymic }}
                                        </div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="text-sm-right col-sm-3">
                                            <b>Дата рождения:</b>
                                        </div>
                                        <div class="col">{{ row.data.birthday }}</div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="text-sm-right col-sm-3">
                                            <b>Оклад:</b>
                                        </div>
                                        <div class="col">{{ row.data.salary }}</div>
                                    </div>

                                    <div class="row mb-2">
                                        <div class="text-sm-right col-sm-3">
                                            <b>Ставка:</b>
                                        </div>
                                        <div class="col">{{ row.data.rate }}</div>
                                    </div>

                                </div>
                            </div>
                        </template>
                    </table-component>
                </div>

            </div>
        </template>
    </div>
</template>

<script>
    import TableComponent from "./TableComponent";
    export default {
        name: "Employees",
      components: {TableComponent},
      data() {
            return {
                inProgress: false,
                testFi: [{label: 'Фамилия', key: 'surname'},  {label: 'Имя', key: 'name'} ],
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
                employees: [ { name: 'Ivanov', surname: 'Ivan', patronymic: 'Ivanovich', id: 1, subdivision: 'Северное', post: 'Директор' }, { name: 'Ivanov', surname: 'Ivan', patronymic: 'Ivanovich', id: 2, subdivision: 'Северное', post: 'Директор' } ]
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
          }
    }
</script>

<style scoped lang="less">
    .container-fluid {
        padding-top: 70px;


        .nav {
            font-weight: bold;

            li.nav-item a {
                color: green;

                &.disabled {
                    color: dimgrey;
                }
            }

            span {
                border-bottom: 2px solid #dee2e6;
                border-radius: 1px;
            }

        }
    }

    .divider {
        border-right: 1px solid #dee2e6;
        border-radius: 1px;
        height: 100%;
    }

    .spinner-border {
        position: absolute;
        top: 40%;
        width: 5rem;
        height: 5rem;
    }
</style>
