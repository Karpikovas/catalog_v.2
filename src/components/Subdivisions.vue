<template>
    <div class="container">

        <!--------------------- Спиннер ------------------------>

        <template v-if="isLoading">
            <div class="spinner">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </template>


        <template v-else>

            <div class="row mb-3">
                <button class="btn btn-pill btn-success ml-auto mr-auto" @click="modalAddShow">
                    Добавить подразделение
                </button>
            </div>

            <!--------------- Карточки с информацией о подразделениях -------------------->

            <div v-for="item in subdivisions" class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="btn-group btn-group-sm ml-auto" role="group">
                            <button type="button" class="btn btn-warning" @click="modalEditShow(item)">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-danger" @click="modalDeleteShow(item)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <h4 class="mb-2">{{ item.name }}</h4>
                    <p>{{ item.description }}</p>
                </div>
            </div>

        </template>



        <!--------------- Модальное окно добавления подразделения --------------->

        <div class="modal" aria-hidden="true" :class="{ opened: isOpenedAdd }">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2>Добавить</h2>
                    <a href="#" class="btn-close" aria-hidden="true" @click.prevent="isOpenedAdd = false">&times;</a>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">

                        <div class="row mb-3">
                            <div class="col-3">Название:</div>
                            <div class="col">
                                <input
                                    type="text"
                                    placeholder="Введите название подразделения"
                                    class="form-control"
                                    v-model="newSubdivisionForm.name"
                                >
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3">Описание:</div>
                            <div class="col-2">
                                <textarea v-model="newSubdivisionForm.description"></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="isOpenedAdd = false">Отменить</button>
                    <button type="button" class="btn btn-primary" @click.prevent="onAddClick">Добавить</button>
                </div>
            </div>
        </div>

        <!--------------- Модальное окно редактирования подразделения --------------->

        <div class="modal" aria-hidden="true" :class="{ opened: isOpenedEdit }">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2>Редактировать</h2>
                    <a href="#" class="btn-close" aria-hidden="true" @click.prevent="isOpenedEdit = false">&times;</a>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">

                        <div class="row mb-3">
                            <div class="col-3">Название:</div>
                            <div class="col">
                                <input
                                    type="text"
                                    placeholder="Введите название подразделения"
                                    class="form-control"
                                    v-model="editSubdivisionForm.name"
                                >
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-3">Описание:</div>
                            <div class="col-2">
                                <textarea v-model="editSubdivisionForm.description"></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="isOpenedEdit = false">Отменить</button>
                    <button type="button" class="btn btn-primary" @click.prevent="onEditClick">Применить</button>
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
                    Удалить информацию о подразделении?
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

<script>
    export default {
        name: "Subdivisions",
        data() {
            return {
                isOpenedAdd: false,
                isOpenedEdit: false,
                isOpenedDelete: false,
                currentSubdivision: null,
                newSubdivisionForm: {
                    name: '',
                    description: ''
                },
                editSubdivisionForm: {
                    name: '',
                    description: '',
                    id: ''
                },
            }
        },
        computed: {

            subdivisions: function () {
                return this.$store.getters.subdivisions
            },

            isLoading() {
                return this.$store.getters.isLoadingSubdivisions
            }

        },
        methods: {
            modalAddShow: function () {
                this.newSubdivisionForm.description = ''
                this.newSubdivisionForm.name = ''

                this.isOpenedAdd = true
            },
            modalDeleteShow: function (subdivision) {
                this.currentSubdivision = subdivision;
                this.isOpenedDelete = true
            },
            modalEditShow: function (subdivision) {
                this.editSubdivisionForm = Object.assign({}, subdivision)
                this.isOpenedEdit = true
            },
            onAddClick: function () {
                this.$store.dispatch('addNewSubdivision', this.newSubdivisionForm)
                this.isOpenedAdd = false
            },
            onEditClick: function () {
                this.$store.dispatch('updateSubdivision', this.editSubdivisionForm)
                this.isOpenedEdit = false
            },
            onDeleteClick: function () {
                this.$store.dispatch('deleteSubdivision', this.currentSubdivision.id)
                this.isOpenedDelete = false
            }

        }
    }
</script>

<style scoped>

</style>
